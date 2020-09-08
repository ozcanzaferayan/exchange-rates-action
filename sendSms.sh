BASE_URL='https://api.twilio.com'
curl -X POST ${BASE_URL}/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json \
    --data-urlencode "Body=$(cat sms.txt)" \
    --data-urlencode "From=$MSISDN_SENDER" \
    --data-urlencode "To=$MSISDN_RECEIVER" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN