import wait from "./wait.js";

async function flicker(flicker, color, newColor) {
    // long flicker
    for (let i = 0; i < 2; i++) {
        flicker.style.color = newColor;
        await wait(Math.floor(Math.random() * 500) + 100);
        flicker.style.color = color;
        await wait(Math.floor(Math.random() * 500) + 100);
    }

    // short flicker
    for (let i = 0; i < 5; i++) {
        flicker.style.color = newColor;
        await wait(Math.floor(Math.random() * 150) + 50);
        flicker.style.color = color;
        await wait(Math.floor(Math.random() * 150) + 50);
    }

    flicker.style.color = newColor;
}

module.exports = flicker;
