const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
const banner = document.getElementById('banner');
const container = document.querySelector('.buttons');

let no_index = 0;    // index for NO messages
let clicks = 0;      // number of NO clicks
let yesScale = 1;    // scale for YES button
const maxYesScale = 4; // max scale so it doesn't fill the screen

// Extended NO messages
const answers_no = [
  "No",
  "Sure jud?",
  "Sureness jud??",
  "sure na sure na jud???",
  "huna hunaa sa ba",
  "basin napay second chances?",
  "nganong cold ka?",
  "basin pwede pa nato ma estoryaan?",
  "di na nako balikon!",
  "sakit na akong feelings!",
  "nangaway naman imoha!",
  "ngano ingana ka nako?",
  "Please give me a chance!",
  "nag pakilouy nako, hunong na!",
  "Ok, ako nalng e balik sa sauno.."
];

// YES button text
const answers_yes = "Yes";

// Banner GIFs for NO clicks
const no_gifs = [
  "public/images/sad.gif",  // first NO click
  "public/images/sad2.gif", // second NO click
  "public/images/sad3.gif"  // etc
];

/* ---------- MOVE NO BUTTON SAFELY ---------- */
function moveNoButton() {
  const containerRect = container.getBoundingClientRect();
  const yesRect = yes_button.getBoundingClientRect();

  const yesBox = {
    left: yesRect.left - containerRect.left,
    right: yesRect.right - containerRect.left,
    top: yesRect.top - containerRect.top,
    bottom: yesRect.bottom - containerRect.top
  };

  const padding = 30;
  let x, y, overlap, attempts = 0;

  do {
    x = Math.random() * (container.clientWidth - no_button.offsetWidth);
    y = Math.random() * (container.clientHeight - no_button.offsetHeight);

    const noBox = {
      left: x,
      right: x + no_button.offsetWidth,
      top: y,
      bottom: y + no_button.offsetHeight
    };

    overlap = !(
      noBox.right < yesBox.left - padding ||
      noBox.left > yesBox.right + padding ||
      noBox.bottom < yesBox.top - padding ||
      noBox.top > yesBox.bottom + padding
    );

    attempts++;
    if (attempts > 100) break;

  } while (overlap);

  no_button.style.position = "absolute";
  no_button.style.left = x + "px";
  no_button.style.top = y + "px";
}

/* ---------- REFRESH GIF ---------- */
function refreshBanner() {
  const src = banner.src;
  banner.src = '';
  banner.src = src;
}

/* ---------- NO BUTTON CLICK ---------- */
no_button.addEventListener('click', () => {
  clicks++;

  // Change banner GIF based on NO clicks
  if (clicks <= no_gifs.length) {
    banner.src = no_gifs[clicks - 1];
    refreshBanner();
  }

  // Move NO button
  moveNoButton();

  // Grow YES button gradually using scale
  yesScale += 0.25;
  if (yesScale > maxYesScale) yesScale = maxYesScale;
  yes_button.style.transform = `translateX(-50%) scale(${yesScale})`;

  // Change NO button text
  if (no_index < answers_no.length - 1) {
    no_index++;
    no_button.innerHTML = answers_no[no_index];
  } else {
    // After last NO message, reset everything
    alert(answers_no[answers_no.length - 1]);
    no_index = 0;
    no_button.innerHTML = answers_no[0];
    yes_button.innerHTML = answers_yes;
    yesScale = 1;
    yes_button.style.transform = `translateX(-50%) scale(${yesScale})`;
    clicks = 0;
    banner.src = "public/images/iloveyou.gif"; // reset banner
    refreshBanner();
  }
});

/* ---------- YES BUTTON CLICK ---------- */
yes_button.addEventListener("click", () => {
  window.location.href = "yes.html"; // Redirect to celebration page
});
