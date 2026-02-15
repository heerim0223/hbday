const emojis = ["🍰","🧁","🥳","🎈","🎉","🎊","🎁","💐"];
const container = document.querySelector(".emoji-container");

let emojiInterval = null;

function startEmojiRain() {
    if (emojiInterval) return;

    emojiInterval = setInterval(() => {
        createEmoji();
    }, 300);
}

function createEmoji() {
    const emoji = document.createElement("div");
    emoji.classList.add("floating-emoji");
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = (3 + Math.random() * 3) + "s";

    container.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, 6000);
}

function burstEmojis() {
    for (let i = 0; i < 25; i++) {
        setTimeout(createEmoji, i * 150);
    }
}

const cake = document.querySelector(".cake");
const candle = document.querySelector(".candle");
const message = document.querySelector(".hidden-message");
const stage = document.querySelector(".stage");

cake.addEventListener("click", () => {
    const topping = document.createElement("div");
    topping.classList.add("topping");

    const toppings = ["🍓","🍫","🧁","🍒"];
    topping.textContent = toppings[Math.floor(Math.random() * toppings.length)];

    const cakeWidth = cake.offsetWidth;
    topping.style.left = Math.random() * (cakeWidth - 40) + "px";

    cake.appendChild(topping);

    setTimeout(() => topping.remove(), 2000);
});

candle.addEventListener("click", (e) => {
    burstEmojis();

    e.stopPropagation();

    candle.textContent = ""; 
    stage.classList.add("dark");

    burstEmojis();
    startEmojiRain();

    setTimeout(() => {
        message.classList.add("show");
    }, 800);
});

const nameEl = document.querySelector(".name");
const modal = document.getElementById("nameModal");
const nameInput = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveName");
const closeBtn = document.getElementById("closeModal");

nameEl.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.add("show");
    nameInput.value = nameEl.textContent;
    nameInput.focus();
});

saveBtn.addEventListener("click", () => {
    const value = nameInput.value.trim();
    if (value) {
        nameEl.textContent = "🎉 "+value+" 🎉";
    }
    modal.classList.remove("show");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});

nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        saveBtn.click();
    }

    if (e.key === "Escape") {
        modal.classList.remove("show");
    }
});