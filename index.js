const cheerio = require('cheerio');
const fetch = require('node-fetch');
const twilio = require('twilio');
const fs = require('fs');

const emptyChar = '⠀';
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


fetch("https://www.doviz.com/")
    .then(res => res.text())
    .then(res => evalRes(res));

let evalRes = (res) => {
    const $ = cheerio.load(res);
    item = getExchanges($);
    const smsText = createSmsText($, item);
    writeSmsToFile(smsText);
    sendSmsToRecievers(smsText);
}

let getExchanges = ($) => {
    // Get first 3 exchanges (altın, dolar, euro)
    return $('.market-data .item a').slice(0, 3);
}

let createSmsText = ($, item) => {
    let smsTextArray = [];
    item.each((index, item) => {
        smsTextArray.push(createSmsLineForExchangeItem($, item));
    });
    return `${emptyChar}\n${emptyChar}\n${smsTextArray.join('\n')}\n${emptyChar}\n${emptyChar}`;
}

let createSmsLineForExchangeItem = ($, exchangeItem) => {
    let name = $(exchangeItem).children(".name").text();
    name = name === 'GRAM ALTIN' ? 'ALTIN' : name;
    let value = $(exchangeItem).children(".value").text();
    let change = $(exchangeItem).children(".change").text().trim();
    let isChangedPositively = !change.includes("-");
    let changeEmoji = isChangedPositively ? "✅" : "🔻";
    return `${changeEmoji} ${change} ${value} ${name}`;
}

let writeSmsToFile = (sms) => {
    fs.writeFile('sms.txt', sms, function(err) {
        if (err) return console.log(err);
        console.log('Written sms.txt');
    });
}

let sendSmsToRecievers = (smsText) => {
    const receivers = process.env.MSISDN_RECEIVERS_DELIMITED_WITH_SEMICOLON;
    receivers.split(';').forEach(receiver => {
        client.messages.create({
                to: receiver,
                from: process.env.MSISDN_SENDER,
                body: smsText
            })
            .then(message => console.log('Sent', 'SID', message.sid))
            .catch(error => console.log('Sending error', error));
    });

}