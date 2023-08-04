const favicon = require("./favicon.js");

function keyevent(document) {
    let string = "";
    document.addEventListener("keydown", function (event) {
        if (event.key == "Escape") {
            if (document.getElementById("button").checked) {
                document.getElementById("buttonlabel").classList.remove("visible");
                document.getElementById("content").classList.remove("visible");
                document.getElementById("button").click();
            }
        }

        string += event.key.toLowerCase();
        if (string.length > 8) string = string.substring(1, 9);
        if (string == "settings") {
            if (document.getElementById("button").checked) {
                // close
                document.getElementById("buttonlabel").classList.remove("visible");
                document.getElementById("content").classList.remove("visible");
            } else {
                // open
                document.getElementById("buttonlabel").classList.add("visible");
                document.getElementById("content").classList.add("visible");
            }
            document.getElementById("button").click();
        }

        if (string.endsWith("kill")) window.location.replace("https://google.com");
        if (string.endsWith("rick")) window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        if (string.endsWith("pizza")) {
            const pizzaImage = document.getElementById("pizzaImage");
            pizzaImage.style.visibility = "visible";
            pizzaImage.addEventListener("mouseenter", () => {
                pizzaImage.classList.add("roll-animation");
            });

            pizzaImage.addEventListener("animationend", () => {
                pizzaImage.classList.remove("roll-animation");
                pizzaImage.style.visibility = "hidden";
            });
        }
        if (string.endsWith("favicon")) favicon(document, true); // ote (one time execution)
    }); // powered by spaghetti code
}

module.exports = keyevent;
