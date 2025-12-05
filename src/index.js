// index.js

const express = require("express");
const getReplyMessage = require("./replyMessages");
const initWhatsapp = require("./waClient");
const isUserRecentlyActive = require("./waClient")

const app = express();
app.use(express.json());

let isUserActive = false; // TRUE = kamu aktif, bot jangan auto-reply

// Status handler
function statusHandler(state) {
    console.log("[WA STATE]", state);
    isUserActive = isUserRecentlyActive();
}

// Message handler
function messageHandler(msg) {
    if (isUserActive) {
        console.log("User aktif, bot tidak membalas.");
        return;
    }

    const reply = getReplyMessage();
    msg.reply(reply);

    console.log("Auto-reply terkirim:", reply);
}

initWhatsapp(statusHandler, messageHandler);

// simple health check
app.get("/", (req, res) => {
    res.json({ status: "running", userActive: isUserActive });
});

app.listen(3113, () => {
    console.log("Server running on port 3113");
});
