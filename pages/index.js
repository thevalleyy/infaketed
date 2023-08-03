import React, { useEffect, useState } from "react";
import Head from "next/head";
import wait from "../js/wait.js";
import rgbhex from "../js/rgbhex.js";
import flickerFunc from "../js/flicker.js";
import smoothscrolltobottom from "../js/smoothscrolltobottom.js";

const config = require("../config.json");
const metaData = config["html-meta-data"];
const oEmbed = "oembed.json";
const colorArr = config["flicker-colors"];
const senArr = config["subheading-sentences"];

export default function Home() {
    useEffect(() => {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        if (params.noSubheading) {
            document.getElementById("subheading").style.visibility = "hidden";
            document.getElementById("underscore").style.visibility = "hidden";
        }

        let scrolled = false;

        // settings menu
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
        }); // powered by spaghetti code

        // random time interval
        async function flickerLoop() {
            const flicker = document.getElementById("flicker");
            await wait(Math.floor(Math.random() * 875000) + 25000);
            // await wait(Math.floor(Math.random() * 5000) + 2000);

            // determine new color, make sure it's not the same as the current color
            const rgb = window
                .getComputedStyle(flicker)
                .getPropertyValue("color")
                .replace(/[^0-9,]/g, "")
                .split(",");

            const color = rgbhex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
            let newColor = color;
            while (newColor == color) newColor = colorArr[Math.floor(Math.random() * colorArr.length)].toLowerCase();

            await flickerFunc(flicker, color, newColor);
            flickerLoop();
        }
        if (!params.noFlicker) flickerLoop();

        // given time interval
        async function underscoreLoop() {
            document.getElementById("underscore").style.visibility = "visible";
            await wait(500);
            document.getElementById("underscore").style.visibility = "hidden";
            await wait(500);
            underscoreLoop();
        }

        if (!params.noUnderscore && !params.noSubheading) underscoreLoop();

        // selfwritten subheading
        async function subheadingLoop() {
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
            subheadingLoop();
        }
        wait(5000).then(() => {
            if (params.noSubheading) return;
            if (params.noTyping) {
                document.getElementById("subheading").innerText = senArr[Math.floor(Math.random() * senArr.length)];
                return;
            }
            subheadingLoop();
        });

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
    }, []);
    return (
        <>
            <Head>
                <title>Infaketed</title>
                <link rel="icon" href="/favicon.ico" />
                <meta content={metaData.title} property="og:title" />
                <meta content="website" property="og:type" />
                <meta content={metaData.description} property="og:description" />
                <meta content={metaData.url} property="og:url" />
                <meta content={metaData.image} property="og:image" />
                <meta content={metaData.color} name="theme-color" />
                {metaData.large_image ? <meta content="summary_large_image" name="twitter:card" /> : ""}
                <link type="application/json+oembed" href={`${config.url}/${oEmbed}`} id="oembed" />
            </Head>
            <div>
                <h1 className="heading">
                    <span className="no-select">In</span>
                    <span id="flicker" className="no-select" style={{ fontStyle: "italic", textShadow: "0px 0px 10px" }}>
                        fake
                    </span>
                    <span className="no-select"> ted</span>
                </h1>
                <h2 className="subheading no-select">
                    <span id="subheading"></span>
                    <span id="underscore" style={{ visibility: "hidden" }}>
                        _
                    </span>
                </h2>

                <div className="grid-container">
                    <a href="./1337-locker" draggable="false">
                        <div class="grid-item no-select">1337 Locker</div>
                    </a>

                    <a href="./bluescreen" draggable="false">
                        <div class="grid-item no-select">Windows Bluescreen</div>
                    </a>

                    <a href="./cryptolocker" draggable="false">
                        <div class="grid-item no-select">Crypto Locker</div>
                    </a>

                    <a href="./derialock" draggable="false">
                        <div class="grid-item no-select">Derialock</div>
                    </a>

                    <a href="./dmalocker" draggable="false">
                        <div class="grid-item no-select">DMA Locker</div>
                    </a>

                    <a href="./goldeneye" draggable="false">
                        <div className="grid-item no-select">Golden Eye</div>
                    </a>

                    <a href="./karmaransomware" draggable="false">
                        <div class="grid-item no-select">Karma Ransomware</div>
                    </a>

                    <a href="./locky" draggable="false">
                        <div class="grid-item no-select">Locky</div>
                    </a>

                    <a href="./ransom32" draggable="false">
                        <div class="grid-item no-select">Ransom32</div>
                    </a>
                </div>
                <input id="button" type="checkbox" draggable="false"></input>
                <label
                    for="button"
                    id="buttonlabel"
                    draggable="false"
                    onClick={() => {
                        document.getElementById("buttonlabel").classList.remove("visible");
                        document.getElementById("content").classList.remove("visible");
                    }}
                ></label>
                <div class="modal">
                    <div class="content no-select" id="content">
                        Testmodal
                    </div>
                </div>

                <div class="no-select warning">This website might not work correctly in portrait mode.</div>

                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
                    integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
                    crossorigin="anonymous"
                ></link>

                <ul>
                    <li>
                        <a href="https://github.com/thevalleyy/infaketed" draggable="false" target="_blank">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="https://discord.com/users/506746108345843713" draggable="false" target="_blank">
                            <i class="fab fa-discord"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
