const createPlayerScore = require('../../restapis/createPlayerScore');
const APIGatewayRequest = require('../../common/getApiGateway');
describe('Test CreatePlayerScore Integration Test', () => {
    test('If CreatePlayerScore is an API', async () => {
        const event = APIGatewayRequest({
            body: {
                name: 'sam',
                score: 145
            },
            pathParameters: {
                    ID : '123'
            },
            method: 'post'
        })
        const res = await createPlayerScore.handler(event);        
        expect(res.body.name).toEqual(event.body.name);
    });
});