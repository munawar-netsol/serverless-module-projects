const APIGatewayRequest = require('../../common/getApiGateway');
const createPlayerScore = require('../../restapis/createPlayerScore');
const getPlayerScore = require('../../restapis/getPlayerScore');
const deletePlayerScore = require('../../restapis/deletePlayerScore');

jest.setTimeout(30000);
describe('Test PlayerScore Integration APIs Test', () => {
    test('Test All PlayerScore APIs Integration Test', async () => {
        const event = APIGatewayRequest({
            body: {
                "name": "Sam",
                "game": "12",
                "game-index":"12",
                "score": 4555
            },
            pathParameters: {
                    ID : '12'
            },
            method: 'post'
        })
        const res = await createPlayerScore.handler(event); 
        expect(res.statusCode).toBe(200);

        const event2 = APIGatewayRequest({            
            pathParameters: {
                    ID : '12'
            },
            method: 'get'
        });
        const res2 = await getPlayerScore.handler(event2);  
        const resBody = JSON.parse(res2.body);
        expect(resBody.name).toBe("Sam"); 
        expect(res.statusCode).toBe(200);

        const event3 = APIGatewayRequest({            
            pathParameters: {
                    ID : '12'
            },
            method: 'delete'
        });
        const res3 = await deletePlayerScore.handler(event3);          
        expect(res3.statusCode).toBe(200);
    });
});