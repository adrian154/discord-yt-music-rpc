const DiscordRPC = require("discord-rpc");
const express = require("express");

const rpc = new DiscordRPC.Client({transport: "ipc"});
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

//rpc.login({clientId: "1031356587996094475"}).catch(console.error);
rpc.login({clientId: "1057554015694635028"}).catch(console.error);
app.listen(19347, () => console.log("Webserver started"));

let rpcReady = false;
rpc.on("ready", () => {
    console.log("RPC ready");
    rpcReady = true;
});

app.post("/status", (req, res) => {
    if(rpcReady) {
        rpc.setActivity({
            details: req.query.event,
            state: req.query.stats,
            largeImageKey: "cstimer"
        }).then(() => {
            res.sendStatus(200); 
            console.log("activity updated");
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(500);
    }
});
