const wait = require("./wait");
const config = require("../config.json");
const senArr = config["subheading-sentences"];

function runTypewriter(document, loop) {
    if (!loop) return (document.getElementById("subheading").innerText = senArr[Math.floor(Math.random() * senArr.length)]);
    wait(5000).then(() => {
        typewriter(document);
    });
}

async function typewriter(document) {
    const subheading = document.getElementById("subheading");
    let previousSentence = ""; // Track the previously picked sentence
    let sentence = "";
    const text = subheading.innerText;

    while (sentence === previousSentence || sentence === text) {
        sentence = senArr[Math.floor(Math.random() * senArr.length)];
    }
    previousSentence = sentence; // Update the previous sentence

    for (let i = 0; i < sentence.length; i++) {
        subheading.innerText += sentence[i];
        await wait(Math.floor(Math.random() * 75) + 25);
    }

    await wait(3000);
    for (let i = 0; i < sentence.length; i++) {
        subheading.innerText = subheading.innerText.substring(0, subheading.innerText.length - 1);
        await wait(Math.floor(Math.random() * 75) + 15);
    }

    await wait(2500);
    typewriter(document);
}

module.exports = runTypewriter;
