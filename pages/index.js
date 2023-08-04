import React, { useEffect } from "react";
import Head from "next/head";
import checkparams from "../js/checkparams.js";
import keyevent from "../js/keyevent.js";

const config = require("../config.json");
const metaData = config["html-meta-data"];
const oEmbed = "oembed.json";

export default function Home() {
    useEffect(() => {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        checkparams(params, document, window); // check for params, disable certain features if needed, start other features etc.
        keyevent(document); // keyevent triggers
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
                        <div className="grid-item no-select">1337 Locker</div>
                    </a>

                    <a href="./bluescreen" draggable="false">
                        <div className="grid-item no-select">Windows Bluescreen</div>
                    </a>

                    <a href="./cryptolocker" draggable="false">
                        <div className="grid-item no-select">Crypto Locker</div>
                    </a>

                    <a href="./derialock" draggable="false">
                        <div className="grid-item no-select">Derialock</div>
                    </a>

                    <a href="./dmalocker" draggable="false">
                        <div className="grid-item no-select">DMA Locker</div>
                    </a>

                    <a href="./goldeneye" draggable="false">
                        <div className="grid-item no-select">Golden Eye</div>
                    </a>

                    <a href="./karmaransomware" draggable="false">
                        <div className="grid-item no-select">Karma Ransomware</div>
                    </a>

                    <a href="./locky" draggable="false">
                        <div className="grid-item no-select">Locky</div>
                    </a>

                    <a href="./ransom32" draggable="false">
                        <div className="grid-item no-select">Ransom32</div>
                    </a>
                </div>
                <input id="button" type="checkbox" draggable="false"></input>
                <label
                    htmlFor="button"
                    id="buttonlabel"
                    draggable="false"
                    onClick={() => {
                        document.getElementById("buttonlabel").classList.remove("visible");
                        document.getElementById("content").classList.remove("visible");
                    }}
                ></label>
                <div className="modal">
                    <div className="content no-select" id="content">
                        Testmodal
                    </div>
                </div>

                <div className="no-select warning">This website might not work correctly in portrait mode.</div>

                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
                    integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
                    crossOrigin="anonymous"
                ></link>

                <ul>
                    <li>
                        <a href="https://github.com/thevalleyy/infaketed" draggable="false" target="_blank">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://discord.com/users/506746108345843713" draggable="false" target="_blank">
                            <i className="fab fa-discord"></i>
                        </a>
                    </li>
                </ul>
                <a href="https://www.youtube.com/watch?v=u2Ndm9Lqijc" draggable="false" target="_blank" style={{ cursor: "default" }}>
                    <img src="/images/pizza.png" className="pizza" draggable="false" id="pizzaImage" />
                </a>
            </div>
        </>
    );
}
