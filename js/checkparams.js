const underscoreLoop = require("./underscore.js");
const runTypewriter = require("./typewriter.js");
const portraitwarning = require("./portraitwarning.js");
const flickerloop = require("./flickerloop.js");

function checkparams(params, document, window) {
    if (params.noSubheading) {
        document.getElementById("subheading").style.visibility = "hidden";
        document.getElementById("underscore").style.visibility = "hidden";
    }
    if (!params.noUnderscore && !params.noSubheading) underscoreLoop();
    if (!params.noFlicker) flickerloop(document);
    if (params.noTyping) runTypewriter(document, false);
    else runTypewriter(document, true);
    if (!params.noWarning) portraitwarning(document, window);
}

module.exports = checkparams;