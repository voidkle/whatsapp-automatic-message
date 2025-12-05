// waClient.js

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
let lastActivity = 0;

function markUserActivity() {
    lastActivity = Date.now();
}

function isUserRecentlyActive() {
    return Date.now() - lastActivity < 50; // 5 menit
}

function initWhatsapp(statusCallback, messageHandler) {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  });
  client.on("qr", (qr) => {
    console.log("[QR RECEIVED]");
    qrcode.generate(qr, { small: true });
  });
  client.on("ready", () => statusCallback("CONNECTED"));
  client.on("change_state", (state) => statusCallback(state));
  client.on("disconnected", (reason) =>
    statusCallback("DISCONNECTED:" + reason)
  );
  client.on("message_create", (msg) => {
    if (msg.fromMe) markUserActivity();
  });

  client.on("message", (msg) => {
    if (!msg.from.endsWith("@c.us")) return; // only direct chats
    messageHandler(msg);
  });

  client.initialize();
  return client;
}

module.exports = initWhatsapp, isUserRecentlyActive;
