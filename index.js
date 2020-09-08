const cheerio = require('cheerio');
const fetch = require('node-fetch');
const twilio = require('twilio');
const { environment } = require('./env/env.js');
const core = require('@actions/core');

const MSISDN_RECEIVER = core.getInput('MSISDN_RECEIVER');
const MSISDN_SENDER = core.getInput('MSISDN_SENDER');
const TWILIO_ACCOUNT_SID = core.getInput('TWILIO_ACCOUNT_SID');
const TWILIO_AUTH_TOKEN = core.getInput('TWILIO_AUTH_TOKEN');

const emptyChar = '⠀';
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


fetch("https://www.doviz.com/")
    .then(res => res.text())
    .then(res => evalRes(res));

let evalRes = (res) => {
    const $ = cheerio.load(res);
    $item = $('.market-data .item a').slice(0, 3); // Get first 3 items
    let smsTextArray = [];
    $item.each((index, item) => {
        smsTextArray.push(evalEachExchangeItem($, item));
    });
    client.messages.create({
        to: process.env.MSISDN_RECEIVER,
        from: process.env.MSISDN_SENDER,
        body: `${emptyChar}\n${emptyChar}\n${smsTextArray.join('\n')}\n${emptyChar}\n${emptyChar}`
    });
}

let evalEachExchangeItem = ($, exchangeItem) => {
    let name = $(exchangeItem).children(".name").text();
    if (name === 'GRAM ALTIN') {
        name = 'ALTIN';
    }
    let value = $(exchangeItem).children(".value").text();
    let change = $(exchangeItem).children(".change").text().trim();
    let isChangedPositively = !change.includes("-");
    let changeEmoji = isChangedPositively ? "✅" : "🔻";
    return `${changeEmoji} ${change} ${value} ${name}`;
}