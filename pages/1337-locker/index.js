import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";

const config = require("../../config.json");
const metaData = config["html-meta-data"];
const oEmbed = "oembed.json";

export default function Home() {
    useEffect(() => {}, []);
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
                <h1>
                    <a href="/">Infaketed</a>
                </h1>
                <p>1337-locker</p>
            </div>
        </>
    );
}
