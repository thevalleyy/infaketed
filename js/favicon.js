const wait = require("./wait.js");
let state = "black"; // means white background, black text

async function favicon(document, skipwait = false) {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }

    if (skipwait) return trigger();

    await wait(Math.floor(Math.random() * 875000) + 25000);
    trigger();
    favicon(document);

    async function trigger() {
        if (!document.hasFocus()) return;
        if (state == "white") {
            console.log("transition from white to black background");
            await WtoB1();
            await wait(200);
            await flicker();
            await WtoB2();
            await wait(200);
            link.href = "./favicon-black.png"; // black background
            state = "black";
        } else {
            await BtoW1();
            await wait(200);
            await flicker();
            await BtoW2();
            await wait(200);
            link.href = "./favicon1-32x32.png"; // white background
            state = "white";
        }
    }

    // flicker with white favicon
    async function flicker() {
        for (let i = 0; i <= 5; i++) {
            link.href = "./fav/fav" + (33 + (i % 2)) + ".png";
            await wait(50 + Math.floor(Math.random() * 35));
        }
    }

    // first animation
    async function WtoB1() {
        for (let i = 0; i <= 34; i++) {
            link.href = "./fav/fav" + i + ".png";
            await wait(50);
        }
    }

    // 2nd animation phase
    async function WtoB2() {
        for (let i = 34; i <= 67; i++) {
            link.href = "./fav/fav" + i + ".png";
            await wait(50);
        }
    }

    async function BtoW1() {
        for (let i = 67; i >= 34; i--) {
            link.href = "./fav/fav" + i + ".png";
            await wait(50);
        }
    }

    async function BtoW2() {
        for (let i = 34; i >= 0; i--) {
            link.href = "./fav/fav" + i + ".png";
            await wait(50);
        }
    }
}

module.exports = favicon;
