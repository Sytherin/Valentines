const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const confetti = Array.from({ length: 160 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 6 + 4,
  d: Math.random() * 10 + 5,
  color: `hsl(${Math.random() * 360},100%,50%)`
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.d;
    if (c.y > canvas.height) c.y = -10;
  });
  requestAnimationFrame(draw);
}
draw();
