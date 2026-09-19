const messageElement = document.getElementById("game-message");
const loveButton = document.getElementById("love-btn");
const noLoveButton = document.getElementById("no-love-btn");
const actions = document.getElementById("game-actions");

const messages = [
  "မချစ်ဘူးလား မမ … 🥺",
  "အာ … တကယ်လား? မောင့်နှလုံးလေး တုန်နေတယ်",
  "မမ ရေ … အမြဲ ချစ်ပေးနိုင်တဲ့လူလေး ရှိတယ်ဆိုတာ သိထားပါ",
  "မမ ပြောခဲ့တာလေး မှတ်မိလား? 'အမြဲ ချစ်ပေးနိုင်လား' တဲ့ …",
  "မချစ်ဘူးဆိုတာ … မောင် လက်မခံနိုင်ဘူး",
];
let clickCount = 0;

const changeMessage = (text) => {
  messageElement.classList.remove("fade-in");
  void messageElement.offsetWidth;
  messageElement.textContent = text;
  messageElement.classList.add("fade-in");
};

noLoveButton.addEventListener("click", () => {
  clickCount += 1;
  if (clickCount <= messages.length) changeMessage(messages[clickCount - 1]);
  loveButton.style.transform = `scale(${Math.min(1.16, 1 + clickCount * 0.035)})`;

  if (clickCount < messages.length) {
    const maxX = Math.max(
      0,
      actions.clientWidth - noLoveButton.offsetWidth - 8,
    );
    const maxY = Math.max(0, actions.clientHeight - noLoveButton.offsetHeight);
    noLoveButton.style.transform = `translate(${Math.random() * maxX - maxX / 2}px, ${Math.random() * maxY - maxY / 2}px)`;
  } else {
    noLoveButton.classList.add("is-hidden");
  }
});

loveButton.addEventListener("click", () => {
  document.body.classList.add("page-leaving");
  window.setTimeout(() => {
    window.location.href = "envelope.html";
  }, 420);
});
