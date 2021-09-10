const Dynamo = require('../../common/Dynamo');

describe('Test Dynamo UnitTest', () => {
    test('Dynamo methods Unit Testing', async() => {
        try {
            const validTableName = 'player-point-aws';
            const data = { ID: '1234', score: 25, name: 'Chirs', game: "1234",gameIndex:"1234"};
            const res = await Dynamo.put(data, validTableName);        
            expect(res).not.toBe(undefined);
            expect(res.name).toEqual(data.name);
            
            //const validTableName = 'player-point-aws';
            const key = { ID: '1234' };
            const res2 = await Dynamo.get(key, validTableName);      
            expect(res2).not.toBe(undefined);  
            expect(res2.name).toBe("Chirs"); 
            
            const res3 = await Dynamo.delete(key, validTableName);    
            expect(res3).not.toBe(undefined);    
            expect(res3.ID).toEqual(key.ID);
        }
        catch(exp) {
            const err = 'Logged Exception in Dynamo methods Unit Testing: '+ exp;
            expect(err).toBe('No Error');
        }
    })
});