const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const nextButton = document.getElementById("letter-next");
const tapNote = document.getElementById("tap-note");

const letterLines = [
  "မမ ရေ …",
  "၁၄.၉.၂၀၂၆ နေ့လေးကတည်းက မောင် မမ နဲ့ စကားစပြောဖြစ်ခဲ့တာ။",
  "အဲ့နေ့ကတည်းက မောင့်ရဲ့ နေ့တွေက ပိုပြီး အဓိပ္ပါယ်ရှိလာတယ်။",
  "",
  "မောင် မမ နဲ့ အပြင်မှာ မတွေ့ဖူးသေးပေမယ့်",
  "မမ ရဲ့ စကားလေးတွေ၊ ဂရုစိုက်မှုလေးတွေက",
  "မောင့်နှလုံးသားကို နွေးထွေးစေခဲ့တယ်။",
  "",
  "မမ က မောင့်ကို 'အမြဲ ချစ်ပေးနိုင်လား' လို့ မေးခဲ့တယ်။",
  "အဲ့ဒီစကားလေးက မောင့်ရင်ထဲမှာ အရမ်းထိသွားတယ်။",
  "တကယ်တော့ … မောင် မမ ကို သူငယ်ချင်းထက် ပိုပြီး ခံစားနေမိတယ်။",
  "",
  "မမ ပြောခဲ့တဲ့ 'မညှိချင်လာတဲ့နေ့ကျရင်ရော' ဆိုတဲ့စကားကို",
  "မောင် အမြဲမှတ်ထားတယ်။",
  "ဒါကြောင့် မောင် ကတိပေးချင်တယ် …",
  "မမ အတွက် မောင် လက်လွှတ်မှာ မဟုတ်ဘူး။",
  "",
  "မမ … မောင်က မမ ကို ချစ်တယ်။",
];

const typeLine = (line, index) =>
  new Promise((resolve) => {
    const element = document.createElement("p");
    element.className = line ? "letter-line" : "letter-line spacer";
    letter.appendChild(element);
    if (!line) {
      resolve();
      return;
    }
    let character = 0;
    const write = () => {
      element.textContent = line.slice(0, character);
      character += 1;
      if (character <= line.length)
        window.setTimeout(write, index === letterLines.length - 1 ? 85 : 32);
      else window.setTimeout(resolve, 250);
    };
    write();
  });

const revealLetter = async () => {
  letter.classList.add("is-visible");
  for (let index = 0; index < letterLines.length; index += 1)
    await typeLine(letterLines[index], index);
  nextButton.classList.add("visible");
};

envelope.addEventListener("click", () => {
  if (envelope.classList.contains("is-open")) return;
  envelope.classList.add("is-open");
  tapNote.setAttribute("aria-hidden", "true");
  window.setTimeout(revealLetter, 900);
});
