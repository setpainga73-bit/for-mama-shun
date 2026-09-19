const form = document.getElementById("answer-form");
const resultArea = document.getElementById("result-area");
const submitButton = document.getElementById("submit-btn");
const downloadButton = document.getElementById("download-btn");
const sliderIds = ["s1", "s2", "s3", "s4"];
let submitted = false;

const sliderTiers = {
  s1: ["မစိတ်ဝင်စားသေးဘူး", "နည်းနည်း စိတ်ဝင်စားတယ်", "အတော် စိတ်ဝင်စားတယ်", "အရမ်း စိတ်ဝင်စားတယ် ❤️"],
  s2: ["မယုံသေးဘူး", "နည်းနည်း ယုံတယ်", "အတော် ယုံတယ်", "အပြည့် ယုံတယ် ❤️"],
  s3: ["မချစ်သေးဘူး", "နည်းနည်း ချစ်တယ်", "အတော် ချစ်တယ်", "အရမ်း ချစ်တယ် ❤️"],
  s4: ["မရွေးသေးဘူး", "နည်းနည်း ရွေးထားတယ်", "အတော် ရွေးထားတယ်", "အပြည့် ရွေးထားတယ် ❤️"],
};

const getTier = (value) => (value < 25 ? 0 : value < 50 ? 1 : value < 75 ? 2 : 3);

const updateSlider = (id) => {
  const input = document.getElementById(id);
  const value = Number(input.value);
  input.style.setProperty("--value", `${value}%`);
  input.closest(".slider-card").querySelector(".slider-value").textContent = `${value}%`;
  document.getElementById(`mood-${id}`).textContent = sliderTiers[id][getTier(value)];
};

sliderIds.forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => updateSlider(id));
  updateSlider(id);
});

const resultMessage = (average) => {
  if (average <= 30) return "မောင် စောင့်နေမယ် 🥺";
  if (average <= 60) return "ကျေးဇူးတင်ပါတယ် မမ 🥰";
  if (average <= 90) return "မောင် ရင်ခုန်နေတယ် 💓";
  return "မောင် ပျော်လိုက်တာ 🥹❤️";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submitted) return;
  submitted = true;
  submitButton.disabled = true;
  const values = sliderIds.map((id) => Number(document.getElementById(id).value));
  const average = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);

  values.forEach((value, index) => {
    const id = sliderIds[index];
    document.getElementById(`bar-${id}`).style.width = `${value}%`;
    document.getElementById(`result-${id}`).textContent = `${value}%`;
  });
  document.getElementById("bar-average").style.width = `${average}%`;
  document.getElementById("result-average").textContent = `${average}%`;
  document.getElementById("result-message").textContent = resultMessage(average);
  resultArea.hidden = false;
  form.classList.add("is-submitted");
  window.setTimeout(() => resultArea.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
});

downloadButton.addEventListener("click", () => {
  downloadButton.disabled = true;
  downloadButton.textContent = "Saving...";
  document.fonts.ready.then(() => html2canvas(document.getElementById("resultCard"), {
    backgroundColor: "#0a0e27",
    scale: 2,
    useCORS: true,
  })).then((canvas) => {
    const link = document.createElement("a");
    link.download = "mama-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }).finally(() => {
    downloadButton.disabled = false;
    downloadButton.textContent = "Download လုပ်မယ်";
  });
});
