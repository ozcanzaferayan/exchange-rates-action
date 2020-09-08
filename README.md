# Exchange rates SMS service

Exchange rates is Github Action that sends SMS about exchange rates daily.

## Screenshot

![Sent from twilio account screenshot](./art/screenshot.png)

## Requirements

1. Twilio trial or upgraded account.
2. Public or private Github repo.

## Usage

1. Fork this repo.
2. Go to your forked repo's "Settings" tab and navigate to "Secrets" from left sidebar.
3. Create secrets according to your [twilio account](https://www.twilio.com/console) information:

```bash
MSISDN_RECEIVERS_DELIMITED_WITH_SEMICOLON="+905311234567;+905531234567"
MSISDN_SENDER="+10987654321"
TWILIO_ACCOUNT_SID="AC123456ytfd3123456ytre12345612345"
TWILIO_AUTH_TOKEN="7f123456ab56331cd245412312312356"
# for debugging purposes
ACTIONS_STEP_DEBUG=true
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)