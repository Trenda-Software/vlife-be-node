const Models = require('../db/models');

let client = null;
let models = null;

module.exports = (_client: any) => {
    const models = Models(_client);
    const client = _client;

    return {};
};
