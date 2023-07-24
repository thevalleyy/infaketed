import React, { useEffect, useState } from "react";
import Head from "next/head";
import wait from "../js/wait.js";
import rgbhex from "../js/rgbhex.js";
import flickerFunc from "../js/flicker.js";

const config = require("../config.json");
const metaData = config["html-meta-data"];
const oEmbed = "oembed.json";
const colorArr = config["flicker-colors"];

export default function Home() {
    const [check, setCheck] = useState("-");

    useEffect(() => {
        // settings menu
        let string = "";
        document.addEventListener("keydown", function (event) {
            string += event.key.toLowerCase();
            if (string.length > 8) string = string.substring(1, 9);

            console.log(string);

            if (string == "settings") {
                console.log("SETTINGS");
                // TODO: trigger settings
            }
        });

        // random time interval
        async function flickerLoop() {
            const flicker = document.getElementById("flicker");
            await wait(Math.floor(Math.random() * 875000) + 25000);

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
                <h2 className="subheading no-select">Choose a ransomware lock screen</h2>
                <ul>
                    <li>
                        <a href="./1337-locker">1337 Locker</a>
                    </li>
                    <li>
                        <a href="./bluescreen">Windows Bluescreen</a>
                    </li>
                    <li>
                        <a href="./cryptolocker">Crypto Locker</a>
                    </li>
                    <li>
                        <a href="./derialock">Derialock</a>
                    </li>
                    <li>
                        <a href="./dmalocker">DMA Locker</a>
                    </li>
                    <li>
                        <a href="./goldeneye">Golden Eye</a>
                    </li>
                    <li>
                        <a href="./karmaransomware">Karma Ransomware</a>
                    </li>
                    <li>
                        <a href="./locky">Locky</a>
                    </li>
                    <li>
                        <a href="./ransom32">Ransom32</a>
                    </li>
                </ul>
            </div>
        </>
    );
}
