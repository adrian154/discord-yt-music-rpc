const DiscordRPC = require("discord-rpc");
const express = require("express");

const rpc = new DiscordRPC.Client({transport: "ipc"});
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

rpc.login({clientId: "1031356587996094475"}).catch(console.error);
app.listen(19347, () => console.log("Webserver started"));

let rpcReady = false;
rpc.on("ready", () => {
    console.log("RPC ready");
    rpcReady = true;
});

app.post("/song", (req, res) => {
    if(rpcReady) {
        console.log("Now playing: " + req.query.title + " by " + req.query.artist);
        rpc.setActivity({
            details: req.query.title,
            state: "by " + req.query.artist,
            largeImageKey: req.query.url,
            startTimestamp: Date.now()
        }).then(() => {
            res.sendStatus(200); 
            console.log("Activity updated");
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(500);
    }
});
