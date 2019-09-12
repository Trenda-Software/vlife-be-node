const server = require('../server');

describe('server app', function() {
    it('should be truthy', function() {
        console.log('server: ', server);
        expect(server).toBeTruthy();
    });
});
