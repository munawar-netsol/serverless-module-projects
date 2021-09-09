const createPlayerScore = require('../../restapis/createPlayerScore');
const getPlayerScore = require('../../restapis/getPlayerScore');
const APIGatewayRequest = require('../../common/getApiGateway');
const Dynamo = require('../../common/Dynamo');

describe('Test GetPlayerScore Integration Test', () => {
    test('If GetPlayerScore is an API', async () => {
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

        const event2 = APIGatewayRequest({            
            pathParameters: {
                    ID : '12'
            },
            method: 'get'
        });
        const res2 = await getPlayerScore.handler(event2);  
        const resBody = JSON.parse(res2.body);
        expect(resBody.name).toBe("Sam"); 
    });

    test('Dynamo Write Test', async() => {
        try {
            const validTableName = 'player-point-aws';
            const data = { ID: '1234', score: 25, name: 'Chirs', game: "1234",gameIndex:"1234"};
            const res = await Dynamo.put(data, validTableName);        
            expect(res.name).toEqual(data.name);
        }
        catch(exp) {
            console.log('Logged Exception : '+ exp);
        }
    })
});