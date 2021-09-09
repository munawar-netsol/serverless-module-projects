const Dynamo = require('../../common/Dynamo');

describe('Test Dynamo UnitTest', () => {
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