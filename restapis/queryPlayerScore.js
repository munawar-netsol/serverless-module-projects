const Responses = require('../common/API_Responses');
const tableName = process.env.tableName;
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
    console.log('event', event);    
    if (!event.pathParameters || !event.pathParameters.ID) {
        console.log('Missing the ID from Path!');
        return Responses._400({message: 'Missing the ID from Path!'});
    }
    let ID = event.pathParameters.ID;

    const newUser = 
        await Dynamo.getQuery('game-index', 'game', ID, tableName)
            .catch (err => {
                console.log('Error in dynamo get: '+ err);
                return null;
            });
    if (!newUser) {
        console.log('Error in dynamo get!');
        return Responses._400({ message: 'Failed to get User by ID'});
    }
    
    return Responses._200(newUser);
    
}
