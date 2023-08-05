import wait from "./wait.js";
import rgbhex from "./rgbhex.js";
const colorArr = require("../config.json")["flicker-colors"];

async function flicker(flicker, color, newColor) {
    // long flicker
    for (let i = 0; i < 2; i++) {
        flicker.style.color = newColor;
        await wait(Math.floor(Math.random() * 500) + 100);
        flicker.style.color = color;
        await wait(Math.floor(Math.random() * 500) + 100);
    }

    // short flicker
    for (let i = 0; i < 3; i++) {
        flicker.style.color = newColor;
        await wait(Math.floor(Math.random() * 150) + 50);
        flicker.style.color = color;
        await wait(Math.floor(Math.random() * 150) + 50);
    }

    flicker.style.color = newColor;
}

async function flickerloop(document, skipwait = false) {
    const flickerElement = document.getElementById("flicker");
    if (!skipwait) await wait(Math.floor(Math.random() * 875000) + 25000);
    // await wait(Math.floor(Math.random() * 5000) + 2000);

    // determine new color, make sure it's not the same as the current color
    const rgb = window
        .getComputedStyle(flickerElement)
        .getPropertyValue("color")
        .replace(/[^0-9,]/g, "")
        .split(",");

    const color = rgbhex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
    let newColor = color;
    while (newColor == color) newColor = colorArr[Math.floor(Math.random() * colorArr.length)].toLowerCase();

    await flicker(flickerElement, color, newColor);
    flickerloop(document);
}

module.exports = flickerloop;
