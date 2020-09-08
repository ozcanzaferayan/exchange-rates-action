mkdir env
echo "const environment = { MSISDN_RECEIVER : '$1', MSISDN_SENDER : '$2', TWILIO_ACCOUNT_SID : '$3', TWILIO_AUTH_TOKEN : '$4' }; module.exports.environment = environment;"  > env/env.js