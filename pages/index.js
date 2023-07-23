import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";

const config = require("../config.json");
const metaData = config["html-meta-data"];
const oEmbed = "oembed.json";

export default function Home() {
    const [check, setCheck] = useState("-");

    useEffect(() => {
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
    }, []);
    return (
        <>
            <Head>
                <title>Key Generator</title>
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
                <h1>Infaketed</h1>
                <p>Choose a virus screen</p>
            </div>
        </>
    );
}
