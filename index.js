const DiscordRPC = require("discord-rpc");
const express = require("express");

const rpc = new DiscordRPC.Client({transport: "ipc"});
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

rpc.login({clientId: "1083521529742098552"}).catch(console.error);
app.listen(19347, () => console.log("Webserver started"));

let rpcReady = false;
rpc.on("ready", () => {
    console.log("RPC ready");
    rpcReady = true;
});

let clearActivityTimeout = null;
let page = null;

app.post("/status", (req, res) => {
    if(rpcReady) {
        if(page != req.query.page) {
            page = req.query.page;
            clearTimeout(clearActivityTimeout);
            clearActivityTimeout = setTimeout(() => {
                console.log("clearing status due to inactivity");
                rpc.clearActivity();
            }, 30*60*1000);
            rpc.setActivity({
                details: req.query.page,
                created_at: Date.now(),
                largeImageKey: "wikipedia",
                buttons: [{
                    label: "Read",
                    url: req.query.url
                }]
            }).then(() => {
                res.sendStatus(200); 
                console.log("now reading: " + req.query.page);
            }).catch(err => {
                console.error(err);
                res.sendStatus(500);
            });
        }
    } else {
        res.sendStatus(500);
    }
});