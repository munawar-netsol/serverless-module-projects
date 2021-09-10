const APIGatewayRequest = require('../../common/getApiGateway');
const connect = require('../../chatserver/connect');
const disconnect = require('../../chatserver/disconnect');
const messages = require('../../chatserver/messages');

jest.setTimeout(30000);
describe('Test ChatServer APIs Integration Test', () => {
    test('Test ChatServer APIs Integration Test', async () => {
        const event = APIGatewayRequest({
            requestContext: {
                "connectionId": "123",
                "domainName": "MyCompany",
                "stage":"DEV"
            },
            method: 'get'
        })
        const res = await connect.handler(event); 
        expect(res.statusCode).toBe(200);

        const event2 = APIGatewayRequest({
            requestContext: {
                "connectionId": "123"
            },
            body: {
                message: 'Hi! First!'
            },
            method: 'get'
        })
        try {
            await messages.handler(event2);         
        }
        catch (ex) {
            //console.log('Error in sending message in ChatServer:' + ex);
        }

        const event3 = APIGatewayRequest({
            requestContext: {
                "connectionId": "123"
            },
            method: 'delete'
        })
        const res3 = await disconnect.handler(event3); 
        expect(res3.statusCode).toBe(200);
    });
});