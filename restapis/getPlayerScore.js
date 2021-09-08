const Responses = require('../common/API_Responses');
const tableName = process.env.tableName;
const Dynamo = require('../common/Dynamo');
const aws = require('aws-sdk');
exports.handler = async event => {
    console.log('event', event);    
    if (!event.pathParameters || !event.pathParameters.ID) {
        console.log('Missing the ID from Path!');
        return Responses._400({message: 'Missing the ID from Path!'});
    }
    let ID = event.pathParameters.ID;
    
    const newUser = 
        await Dynamo.get(ID, tableName)
            .catch (err => {
                console.log('Error in dynamo read: '+ err);
                return null;
            });
    if (!newUser) {
        console.log('Error in dynamo read!');
        return Responses._400({ message: 'Failed to write User by ID'});
    }
    
    return Responses._200(newUser);
    
}
