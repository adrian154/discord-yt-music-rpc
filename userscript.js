// ==UserScript==
// @name         YouTube Music Discord RPC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Observe your YouTube Music activity so it can be displayed on Discord
// @author       adrian154
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const updateActivity = meta => {
        const url = new URL("http://localhost:19347/song");
        url.searchParams.set("artist", meta.artist);
        url.searchParams.set("title", meta.title);
        url.searchParams.set("url", meta.artwork[meta.artwork.length - 1].src)
        fetch(url, {
            method: "POST"
        });
    };

    let currentMeta = null;
    setInterval(() => {
        const meta = navigator.mediaSession.metadata;
        if (meta != currentMeta) {
            currentMeta = meta;
            console.log(meta);
            updateActivity(meta);
        }
    }, 1000);


})();