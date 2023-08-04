const wait = require("./wait.js");

async function underscoreLoop() {
    document.getElementById("underscore").style.visibility = "visible";
    await wait(500);
    document.getElementById("underscore").style.visibility = "hidden";
    await wait(500);
    underscoreLoop();
}

module.exports = underscoreLoop;
