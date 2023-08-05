const wait = require("./wait");

function glitch(document) {
    const links = document.querySelectorAll(".grid-container a");

    links.forEach((link) => {
        const originalText = link.querySelectorAll("div")[0].innerHTML;
        link.addEventListener("mouseenter", () => {
            link.classList.add("glitch");
            startGlitch(link);
        });

        link.addEventListener("mouseleave", () => {
            link.classList.remove("glitch");
            link.querySelectorAll("div")[0].innerHTML = originalText;
        });
    });
}

function startGlitch(link) {
    if (!link.classList.contains("glitch")) return;
    glitchLink(link);
    wait(150 + 75 * Math.random()).then(() => {
        startGlitch(link);
    });
}

function glitchLink(link) {
    let text = link.querySelectorAll("div")[0].innerHTML;
    const textLength = text.length;
    let newtext = "";
    for (let i = 0; i < textLength; i++) {
        if (Math.random() < 0.5) newtext += text[i].toLowerCase();
        else newtext += text[i].toUpperCase();

        link.querySelectorAll("div")[0].innerHTML = newtext;
    }
}

module.exports = glitch;
