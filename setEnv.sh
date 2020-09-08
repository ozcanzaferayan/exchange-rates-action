mkdir env
echo "const environment = { MSISDN_SENDER : '$1' }; module.exports.environment = environment;"  > env/env.js