const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");
const banner = document.getElementById("banner");
const container = document.querySelector(".buttons");
const originalNoPosition = {
  left: "50%",
  top: "120px",
  transform: "translateX(-50%)"
};


let no_index = 0;
let clicks = 0;
let yesScale = 1;
const maxYesScale = 4;

/* ---------- NO MESSAGES ---------- */
const answers_no = [
  "No",
  "Sure jud?",
  "Sureness jud??",
  "sure na sure na jud???",
  "huna hunaa sa ba",
  "basin napay second chances?",
  "laina nganong cold ka?",
  "basin pwede pa nato ma estoryaan?",
  "e yes na ba...",
  "sakit na akong feelings...",
  "pangaway naman imoha...",
  "ngano ingana ka nako?",
  "Please give me a chance...",
  "nag pakilouy nako, stop na",
  "Ok, ako nalng e balik sa uno..."
];

/* ---------- NO GIFS ---------- */
const no_gifs = [
  "public/images/sad.gif",
  "public/images/sad2.gif",
  "public/images/sad3.gif"
];

/* ---------- MOVE NO BUTTON (ANTI-OVERLAP) ---------- */
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
  let x, y, overlap, tries = 0;

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

    tries++;
    if (tries > 100) break;
  } while (overlap);

  no_button.style.left = `${x}px`;
  no_button.style.top = `${y}px`;
}

/* ---------- FORCE GIF RELOAD ---------- */
function refreshBanner() {
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

/* ---------- NO CLICK ---------- */
no_button.addEventListener("click", () => {
  clicks++;

  // change banner GIF
  if (clicks <= no_gifs.length) {
    banner.src = no_gifs[clicks - 1];
    refreshBanner();
  }

  // move NO
  moveNoButton();

  // grow YES (scale only)
  yesScale = Math.min(yesScale + 0.25, maxYesScale);
  yes_button.style.transform = `translateX(-50%) scale(${yesScale})`;

  // change NO text
  if (no_index < answers_no.length - 1) {
    no_index++;
    no_button.textContent = answers_no[no_index];
  } else {
    alert(answers_no[answers_no.length - 1]);
    resetAll();
  }
});

/* ---------- RESET ---------- */
function resetAll() {
  no_index = 0;
  clicks = 0;
  yesScale = 1;

  no_button.textContent = answers_no[0];

  // ✅ RESET NO BUTTON POSITION
  no_button.style.left = originalNoPosition.left;
  no_button.style.top = originalNoPosition.top;
  no_button.style.transform = originalNoPosition.transform;

  // reset YES
  yes_button.style.transform = "translateX(-50%) scale(1)";

  // reset banner
  banner.src = "public/images/iloveyou.gif";
  refreshBanner();
}


/* ---------- YES CLICK ---------- */
yes_button.addEventListener("click", () => {
  window.location.href = "yes.html";
});
