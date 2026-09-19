const slideFrame = document.getElementById("slide-frame");
const slideImage = document.getElementById("slide-image");
const slideCaption = document.getElementById("slide-caption");
const slideDots = document.getElementById("slide-dots");
const futureSection = document.querySelector(".dream-section");
const dreamCopy = document.getElementById("dream-copy");
const requestCopy = document.getElementById("request-copy");
const futureNext = document.getElementById("future-next");
const musicToggle = document.getElementById("music-toggle");
const audio = document.getElementById("romance-audio");
audio.volume = 0.5;

musicToggle.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicToggle.textContent = "⏸";
      musicToggle.setAttribute("aria-label", "သီချင်း ရပ်ရန်");
      musicToggle.setAttribute("aria-pressed", "true");
    } catch (error) {
      musicToggle.setAttribute("aria-label", "သီချင်းဖိုင်ကို ထည့်ပြီး ပြန်ဖွင့်ပါ");
    }
    return;
  }

  audio.pause();
  musicToggle.textContent = "🎵";
  musicToggle.setAttribute("aria-label", "သီချင်း ဖွင့်ရန်");
  musicToggle.setAttribute("aria-pressed", "false");
});
const dreamText =
  "မမ … မောင် မမ နဲ့အတူ ဖြတ်သန်းချင်တာ တစ်ခုရှိတယ်။\nအပြင်မှာ အတူတူ လမ်းလျှောက်ရတာ\nမမ ဝမ်းနည်းတဲ့အခါ ဖေးမပေးရတာ\nမမ ပြုံးတဲ့အခါ အတူပြုံးရတာ …\nဒါလေးတွေက မောင့်အတွက် အိပ်မက်လိုပဲ။";
const requestText =
  "မမ ရဲ့ အတိတ်က နာကျင်မှုတွေကို မောင် သိတယ်။\nဒါပေမယ့် အရင်ဆုံး …\nမောင့်ကို အခွင့်အရေးတစ်ခုပေးပါ။\nမမ ရဲ့ အဖြေကို မောင် စောင့်နေမယ်။";

const slides = [
  {
    source: "assets/images/photo_2026-09-19_01-46-49.jpg",
    caption: "မောင် မမ ကို ပထမဆုံး သတိထားမိတဲ့photoလေး",
  },
  {
    source: "assets/images/photo_2026-09-18_00-20-57.jpg",
    caption: "မမ ရဲ့ စကားလေးတွေ မောင့်ကို ပြုံးစေခဲ့တယ်",
  },
  {
    source: "assets/images/photo_2026-09-18_00-21-00.jpg",
    caption: "မောင် မမ နဲ့ အပြင်မှာ တွေ့ချင်တယ်",
  },
  {
    source: "assets/images/photo_2026-09-19_01-46-48.jpg",
    caption: "ဒီဓာတ်ပုံလေးတွေက မောင့်ရဲ့ မမ အမှတ်တရ",
    fit: "cover",
  },
];
let activeSlide = 0;
let slideshowLooped = false;

const renderSlide = (index) => {
  const slide = slides[index];
  slideFrame.classList.remove("is-changing");
  slideImage.classList.remove("is-missing");
  slideImage.classList.toggle("is-contained", slide.fit === "contain");
  slideImage.classList.toggle("is-full", slide.fit === "cover");
  void slideFrame.offsetWidth;
  slideImage.src = slide.source;
  slideImage.alt = slide.caption;
  slideCaption.textContent = slide.caption;
  slideFrame.classList.add("is-changing");
  [...slideDots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
    dot.setAttribute("aria-selected", dotIndex === index ? "true" : "false");
  });
};

const unlockFuture = () => {
  if (slideshowLooped) return;
  slideshowLooped = true;
  futureSection.classList.remove("slideshow-locked");
  futureSection.classList.add("is-visible");
  writeCopy(dreamCopy, dreamText);
};

slides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.className = "slide-dot";
  dot.type = "button";
  dot.setAttribute("role", "tab");
  dot.setAttribute("aria-label", `ဓာတ်ပုံ ${index + 1}`);
  dot.addEventListener("click", () => {
    activeSlide = index;
    renderSlide(activeSlide);
  });
  slideDots.appendChild(dot);
});

slideImage.addEventListener("error", () =>
  slideImage.classList.add("is-missing"),
);
renderSlide(activeSlide);
window.setInterval(() => {
  activeSlide = (activeSlide + 1) % slides.length;
  renderSlide(activeSlide);
  if (activeSlide === 0) unlockFuture();
}, 4000);

const writeCopy = (element, text) => {
  element.textContent = "";
  text.split("\n").forEach((line, index) => {
    const lineElement = document.createElement("span");
    lineElement.className = "copy-line";
    lineElement.textContent = line;
    lineElement.style.animationDelay = `${index * 0.5}s`;
    element.appendChild(lineElement);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (
        entry.target.classList.contains("dream-section") &&
        entry.target.classList.contains("slideshow-locked")
      )
        return;
      entry.target.classList.add("is-visible");
      if (entry.target.classList.contains("dream-section"))
        writeCopy(dreamCopy, dreamText);
      if (entry.target.classList.contains("request-section")) {
        writeCopy(requestCopy, requestText);
        window.setTimeout(() => futureNext.classList.add("visible"), 500);
      }
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll(".reveal")
  .forEach((section) => observer.observe(section));
