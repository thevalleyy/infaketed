const underscoreLoop = require("./underscore.js");
const runTypewriter = require("./typewriter.js");
const portraitwarning = require("./portraitwarning.js");
const flickerloop = require("./flickerloop.js");
const favicon = require("./favicon.js");
const glitch = require("./glitch-effekt.js");
const { settings } = require("../config.json");

function checkparams(params, document, window) {
    if (params.noSubheading || !settings.subheading) {
        document.getElementById("subheading").style.visibility = "hidden";
        document.getElementById("underscore").style.visibility = "hidden";
    }
    if (!params.noUnderscore && !params.noSubheading && settings.subheading && settings.underscore) underscoreLoop();
    if (params.noFlicker || !settings.flicker) {
    } else flickerloop(document);
    if (params.noTyping || params.noSubheading || !settings.typing || !settings.subheading) runTypewriter(document, false);
    else runTypewriter(document, true);
    if (params.noWarning || !settings.warning) {
    } else portraitwarning(document, window);
    if (params.noFavicon || !settings.favicon) {
    } else favicon(document);
    if (params.noGlitch || !settings.glitch) {
    } else glitch(document);
}

module.exports = checkparams;
