const smoothscrolltobottom = require("./smoothscrolltobottom.js");

function portraitwarning(document, window) {
    let scrolled = false;

    function outputsize() {
        if (window.innerWidth < window.innerHeight) {
            document.getElementsByClassName("warning")[0].style.visibility = "visible";
            if (!scrolled) {
                smoothscrolltobottom(document, window, 2000);
                scrolled = true;
            }
        } else document.getElementsByClassName("warning")[0].style.visibility = "hidden";
    }
    outputsize();

    new ResizeObserver(outputsize).observe(window.document.body);
}

module.exports = portraitwarning;
