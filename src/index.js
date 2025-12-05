// src/index.js - Versi Perbaikan

const express = require("express");
const getReplyMessage = require("./replyMessages");
const { initWhatsapp, isUserRecentlyActive, markUserActivity } = require("./waClient");

const app = express();
app.use(express.json());

// Hapus 'let isUserActive = false;'

// Status handler (hanya untuk logging)
function statusHandler(state) {
    console.log("[WA STATE]", state);
    // Hapus pemanggilan isUserRecentlyActive() di sini
}

// Message handler
function messageHandler(msg) {
    // Panggil fungsi pengecekan aktivitas secara LANGSUNG pada setiap pesan
    if (isUserRecentlyActive()) {
        console.log("User aktif (dalam 2 menit terakhir), bot tidak membalas.");
        return;
    }

    const reply = getReplyMessage();
    msg.reply(reply);

    console.log("Auto-reply terkirim:", reply);
}

initWhatsapp(statusHandler, messageHandler);

// Perbarui health check agar menampilkan status real-time
app.get("/", (req, res) => {
    const userActiveStatus = isUserRecentlyActive(); 
    const timeOut = markUserActivity();
    res.json({ status: "running", userActive: userActiveStatus, interval:  timeOut});
});

app.listen(3113, () => {
    console.log("Server running on port 3113");
});