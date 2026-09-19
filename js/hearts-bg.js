// Create a lightweight, responsive field of floating hearts.
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("hearts-bg");
  if (!container) return;

  const width = window.innerWidth;
  const count = width < 480 ? 20 : width < 1024 ? 30 : 40;

  for (let index = 0; index < count; index += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.setAttribute("aria-hidden", "true");
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--heart-size", `${10 + Math.random() * 20}px`);
    heart.style.setProperty(
      "--heart-opacity",
      (0.3 + Math.random() * 0.3).toFixed(2),
    );
    heart.style.setProperty("--heart-duration", `${8 + Math.random() * 10}s`);
    heart.style.setProperty("--heart-delay", `${Math.random() * 10}s`);
    container.appendChild(heart);
  }
});
