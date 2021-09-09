const Responses = require('../common/API_Responses');
const tableName = process.env.tableName;
const Dynamo = require('../common/Dynamo');
const yup = require('yup');
const validationHook = require('../common/ValidationHook');

let schemaObject = yup.object().shape({
    name: yup.string().required(),
    game: yup.string().required(),
    createdOn: yup.date().default(function () {
        return new Date();
    }),
});

const main = async event => {
    if (!event.pathParameters || !event.pathParameters.ID) {
        console.log('Missing the ID from Path!');
        return Responses._400({message: 'Missing the ID from Path!'});
    }
    let ID = event.pathParameters.ID;
    const user = event.body;
    user.ID = ID;
    const newUser = 
        await Dynamo.put(user, tableName)
            .catch (err => {
                console.log('Error in dynamo write: '+ err);
                return null;
            });
    if (!newUser) {
        console.log('Error in dynamo write!');
        return Responses._400({ message: 'Failed to write User by ID'});
    }
    
    return Responses._200(user);
    
}
exports.handler = validationHook(main, { schema: schemaObject })