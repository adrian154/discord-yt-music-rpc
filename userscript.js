// ==UserScript==
// @name         csTimer RPC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Observe your csTimer activity so it can be displayed on Discord
// @author       adrian154
// @match        https://cstimer.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const observer = new MutationObserver((mutlist) => {
        const avgstr = document.getElementById("avgstr");
        if(avgstr.style.display === "block") {
            const stats = [...avgstr.querySelectorAll("span")].map(span => span.textContent).join(" // ");

            const nobr = document.querySelector("nobr");
            const event = nobr.childNodes[0].selectedOptions[0].textContent + " " + nobr.childNodes[2].selectedOptions[0].textContent;;

            const url = new URL("http://localhost:19347/status");
            url.searchParams.set("event", event);
            url.searchParams.set("stats", stats);
            fetch(url, {method: "POST"});
        }
    });

    observer.observe(lcd, {attributes: true});

})();