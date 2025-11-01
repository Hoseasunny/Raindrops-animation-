const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const raindrops = [];

for (let i = 0; i < 100; i++) {
  raindrops.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radiusX: Math.random() * 2 + 2,     // horizontal radius
    radiusY: Math.random() * 8 + 8,     // vertical radius (taller)
    speed: Math.random() * 4 + 4        // falling speed
  });
}

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < raindrops.length; i++) {
    const drop = raindrops[i];

    // Create a vertical gradient from top to bottom of the drop
    const gradient = ctx.createLinearGradient(
      drop.x, drop.y,
      drop.x, drop.y + drop.radiusY * 2
    );
    gradient.addColorStop(0, 'rgba(255,255,255,0.3)'); // soft white highlight
    gradient.addColorStop(0.3, 'rgba(0,0,255,0.8)');   // rich blue starts early
    gradient.addColorStop(1, 'blue');                 // solid blue at bottom

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(drop.x, drop.y, drop.radiusX, drop.radiusY, 0, 0, Math.PI * 2);
    ctx.fill();

    // Move the drop down
    drop.y += drop.speed;

    // Reset drop to top if it goes off screen
    if (drop.y > canvas.height) {
      drop.y = -drop.radiusY;
      drop.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(drawRain);
}

drawRain();