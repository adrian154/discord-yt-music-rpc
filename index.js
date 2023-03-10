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

app.post("/status", (req, res) => {
    if(rpcReady) {
        clearTimeout(clearActivityTimeout);
        rpc.setActivity({
            details: req.query.page,
            created_at: Date.now(),
            largeImageKey: "wordmark"
        }).then(() => {
            res.sendStatus(200); 
            console.log("now reading: " + req.query.page);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(500);
    }
});

// wait 3 seconds to clear activity
// if we switch to another Wiki tab this lets us avoid an unnecesary clear
let clearActivityTimeout = null;
app.post("/clear", (req, res) => {
    if(rpcReady) {
        clearActivityTimeout = setTimeout(() => rpc.clearActivity(), 3000);
    }
}); 