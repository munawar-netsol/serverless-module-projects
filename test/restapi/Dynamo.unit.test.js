const Dynamo = require('../../common/Dynamo');

const validTableName = 'player-point-aws';
const data = { ID: '123', score: 25, name: 'Chirs'};
test('Dynamo Write Test', async() => {
    try {
        const res = await Dynamo.put(data, validTableName);        
        expect(res.name).toEqual(data.name);
        
    }
    catch(exp) {
        console.log('Logged Exception : '+ exp);
    }
})