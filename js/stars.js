(() => {
  const starField = document.getElementById("stars");
  if (!starField) return;

  const stars = [];
  const count = 100;
  for (let index = 0; index < count; index += 1) {
    const element = document.createElement("span");
    element.className = "star";
    const size = Math.random() < 0.85 ? 1 + Math.random() * 2 : 3;
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    starField.appendChild(element);
    stars.push({
      element,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0005 + Math.random() * 0.0012,
      amplitude: 0.25 + Math.random() * 0.55,
    });
  }

  let frame = 0;
  const animate = (time) => {
    stars.forEach((star) => {
      const opacity =
        0.28 +
        (Math.sin(time * star.speed + star.phase) + 1) * 0.5 * star.amplitude;
      const scale = 0.8 + opacity * 0.45;
      star.element.style.opacity = opacity.toFixed(2);
      star.element.style.transform = `scale(${scale.toFixed(2)})`;
    });
    frame = requestAnimationFrame(animate);
  };
  frame = requestAnimationFrame(animate);
  window.addEventListener("pagehide", () => cancelAnimationFrame(frame), {
    once: true,
  });
})();
