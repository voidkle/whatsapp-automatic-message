// replyMessages.js

module.exports = function getReplyMessage() {
    const hour = new Date().getHours();

    if (hour >= 21 || hour < 5) {
        return "[Automatic reply] Kemungkinan Saya sedang tidur, will contact you soon!";
    }

    if (hour >= 9 && hour < 17) {
        return "[Automatic reply] Kemungkinan Saya sedang bekerja, will contact you soon!";
    }

    return "[Automatic reply] Kemungkinan Saya sedang beraktivitas di luar, will contact you soon!";
};
