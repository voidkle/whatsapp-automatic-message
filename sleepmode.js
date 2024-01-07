const qrcode = require('qrcode-terminal');
const { MessageMedia } = require('whatsapp-web.js');
const { Client } = require('whatsapp-web.js');
const client = new Client();

function SleepTime() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    return currentHour >= 0 && currentHour < 6;
}
function Busy() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    return currentHour >= 6 && currentHour < 15;
}
function Night(){
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    return currentHour >= 15 && currentHour < 23;
}

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message',async (msg) =>{
    const text = msg.body.toLowerCase() || '';
    const chat = await msg.getChat();
    const contact = await msg.getContact();

    if(SleepTime()){
        if (chat.isGroup) {
            console.log('Message is from a group chat. Ignoring.');
        } 
        else if(!contact.isMyContact){
            console.log('Message is not from your contact, Ignoring.')
        }
        else {
            let text = "Selamat Pagi!\nHai, ini adalah Pesan Otomatis \nJika anda sedang mencoba mengontak Hayqal\ndia sedang tertidur saat ini.\nAlarmnya Aktif di pukul 6.00AM WIB\nhubungi kembali di jam itu"
            console.log('Message is not from a group. Replying');
            client.sendMessage(msg.from, text);
        }
    }
    else if(Busy()){
        if (chat.isGroup) {
            console.log('Message is from a group chat. Ignoring.');
        } 
        else if(!contact.isMyContact){
            console.log('Message is not from your contact, Ignoring.')
        }
        else {
            let text = "Selamat Pagi dan Siang!\nHai, ini adalah Pesan Otomatis \nJika anda sedang mencoba mengontak Hayqal, dia sedang sibuk untuk saat ini.\nCobalah hubungi dia beberapa saat lagi"
            console.log('Message is not from a group. Replying');
            client.sendMessage(msg.from, text);
        }
    }
    else if(Night()){
        if (chat.isGroup) {
            console.log('Message is from a group chat. Ignoring.');
        } 
        else if(!contact.isMyContact){
            console.log('Message is not from your contact, Ignoring.')
        }
        else {
            let text = "Selamat Malam!\nHai, ini adalah Pesan Otomatis \nJika anda sedang mencoba mengontak Hayqal, dia sedang diluar jangakauan untuk saat ini.\nCobalah hubungi dia beberapa saat lagi"
            console.log('Message is not from a group. Replying');
            client.sendMessage(msg.from, text);
        }
    }
})
client.on('message', async (msg) => {
    const mentions = await msg.getMentions();
    for(let contact of mentions) {
        console.log(`${contact.pushname} was mentioned`);
        client.sendMessage(msg.from, "Hai, ini adalah pesan otomatis, jika anda sedang mencoba tag Hayqal, Beliau saat ini sedang tidak Dalam Jangkauan")
    }
});
client.initialize();
 