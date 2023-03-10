// ==UserScript==
// @name         Wikipedia Discord RPC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Observe your Wikipedia activity so it can be displayed on Discord
// @author       adrian154
// @match        https://en.wikipedia.org/wiki/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const title = document.querySelector("h1").textContent;

    const updateStatus = () => {
        if(!document.hidden) {
            fetch(`http://localhost:19347/status?page=${encodeURIComponent(title)}&url=${encodeURIComponent(location.href)}`, {method: "POST"});
        }
    };

    updateStatus();
    document.addEventListener("visibilitychange", updateStatus);  

})();