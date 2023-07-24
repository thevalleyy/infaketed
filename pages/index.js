import React, { useEffect, useState } from "react";
import Head from "next/head";
import wait from "../js/wait.js";
import rgbhex from "../js/rgbhex.js";
import flickerFunc from "../js/flicker.js";

const config = require("../config.json");
const metaData = config["html-meta-data"];
const oEmbed = "oembed.json";
const colorArr = config["flicker-colors"];
const senArr = config["subheading-sentences"];

export default function Home() {
    useEffect(() => {
        // settings menu
        let string = "";
        document.addEventListener("keydown", function (event) {
            string += event.key.toLowerCase();
            if (string.length > 8) string = string.substring(1, 9);
            if (string == "settings") {
                console.log("SETTINGS");
                // TODO: trigger settings
            }
        });

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
        flickerLoop();

        // given time interval
        async function underscoreLoop() {
            document.getElementById("underscore").style.visibility = "hidden";
            await wait(500);
            document.getElementById("underscore").style.visibility = "visible";
            await wait(500);
            underscoreLoop();
        }

        underscoreLoop();

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
            subheadingLoop();
        });
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
                    <span id="flicker" className="no-select" style={{ fontStyle: "italic" }}>
                        fake
                    </span>
                    <span className="no-select"> ted</span>
                </h1>
                <h2 className="subheading no-select">
                    <span id="subheading"></span>
                    <span id="underscore">_</span>
                </h2>

                <div className="grid-container">
                    <a href="./1337-locker">
                        <div className="grid-item no-select">1337 Locker</div>
                    </a>
                    <a href="./bluescreen">
                        <div className="grid-item no-select">Windows Bluescreen</div>
                    </a>
                    <a href="./cryptolocker">
                        <div className="grid-item no-select">Crypto Locker</div>
                    </a>

                    <a href="./derialock">
                        <div className="grid-item no-select">Derialock</div>
                    </a>

                    <a href="./dmalocker">
                        <div className="grid-item no-select">DMA Locker</div>
                    </a>

                    <a href="./goldeneye">
                        <div className="grid-item no-select">Golden Eye</div>
                    </a>

                    <a href="./karmaransomware">
                        <div className="grid-item no-select">Karma Ransomware</div>
                    </a>

                    <a href="./locky">
                        <div className="grid-item no-select">Locky</div>
                    </a>

                    <a href="./ransom32">
                        <div className="grid-item no-select">Ransom32</div>
                    </a>
                </div>
            </div>
        </>
    );
}
