const { EMALIFY_PROJECT_ID } = require("./constants");

const END_POINT_SEND_SMS = 'https://api.emalify.com/v1/projects/{0}/sms/bulk'.replace('{0}',EMALIFY_PROJECT_ID);
const END_POINT_TOKEN = 'https://api.emalify.com/v1/oauth/token';

module.exports = {
    END_POINT_TOKEN,
    END_POINT_SEND_SMS
};