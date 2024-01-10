const qrcode = require('qrcode-terminal')
const { MessageMedia } = require('whatsapp-web.js')
const { Client } = require('whatsapp-web.js')
const client = new Client()
const axios = require('axios')

function SleepTime() {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    return currentHour >= 23 && currentHour < 6
}
function Busy() {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    return currentHour >= 6 && currentHour < 18
}
function Night(){
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    return currentHour >= 18 && currentHour < 23
}

client.on('qr', qr => {
    qrcode.generate(qr, {small: true})
})

client.on('ready', () => {
    console.log('Client is ready!')
})

client.on('message',async (msg) =>{
    const text = msg.body.toLowerCase() || ''
    const chat = await msg.getChat()
    const contact = await msg.getContact()

    if(text === "-info"){
        console.log("using -info")
        let text = "Hi, ini adalah balasan otomatis\nAutomatic response ini masih dalam tahap pengembangan dan project ini menggunakan library npm bernama WhatsappWebJS\nhttps://wwebjs.dev/ \n\nGitHub saya: \nhttps://github.com/voidkle"
        const media = MessageMedia.fromFilePath('./img/wifestelle.jpg')
        chat.sendMessage(media, {caption: text})
    }

    if(SleepTime()){
        if (chat.isGroup) {
            console.info('Message is from a group chat. Ignoring.')
        } 
        else if(!contact.isMyContact){
            console.error('Message is not from your contact, Ignoring.')
        }
        else {
            let text = "Selamat Pagi!\nHai, ini adalah Pesan Otomatis \nJika anda sedang mencoba mengontak Hayqal\ndia sedang tertidur saat ini.\nAlarmnya Aktif di pukul 6.00AM WIB\nhubungi kembali di jam itu"
            console.warn('Message is not from a group. Replying')
            client.sendMessage(msg.from, text)
        }
    }
    else if(Busy()){
        if (chat.isGroup) {
            console.info('Message is from a group chat. Ignoring.')
        } 
        else if(!contact.isMyContact){
            console.error('Message is not from your contact, Ignoring.')
        }
        else {
            let text = "Selamat Pagi dan Siang!\nHai, ini adalah Pesan Otomatis \nJika anda sedang mencoba mengontak Hayqal, dia sedang sibuk untuk saat ini.\nCobalah hubungi dia beberapa saat lagi"
            console.warn('Message is not from a group. Replying')
            client.sendMessage(msg.from, text)
        }
    }
    else if(Night()){
        if (chat.isGroup) {
            console.info('Message is from a group chat. Ignoring.')
        } 
        else if(!contact.isMyContact){
            console.error('Message is not from your contact, Ignoring.')
        }
        else {
            let text = "Selamat Malam!\nHai, ini adalah Pesan Otomatis \nJika anda sedang mencoba mengontak Hayqal, dia sedang diluar jangkauan untuk saat ini.\nCobalah hubungi dia beberapa saat lagi"
            console.warn('Message is not from a group. Replying')
            client.sendMessage(msg.from, text)
        }
    }
})
client.on('message', async (msg) => {
    const mentions = await msg.getMentions()
    const isMentioned = mentions.some(contact => contact.isMe)
    if(isMentioned){
        console.log("you get mentioned")
        client.sendMessage(msg.from, "Hai, ini adalah pesan otomatis, jika anda sedang mencoba menghubunginya, saat ini ia sedang diluar jangkauan")
    }
    else if(mentions){
        console.log("someone get mentioned")
    }
});
client.initialize();
 