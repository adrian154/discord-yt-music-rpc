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
        url.searchParams.set("iconUrl", meta.artwork[meta.artwork.length - 1].src)
        url.searchParams.set("songUrl", window.location.href);
        fetch(url, {
            method: "POST"
        });
    };

    let currentSong = null;
    setInterval(() => {
        const meta = navigator.mediaSession.metadata;
        const song = meta.artist + meta.title;
        if (song != currentSong) {
            currentMeta = song;
            updateActivity(meta);
        }
    }, 1000);


})();