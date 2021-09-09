const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
exports.handler = async event => {
    if (!event.pathParameters && !event.pathParameters.ID) {
        const err = 'Event pathParameters.ID cannot be empty!';
        console.log(err);
        return Responses._400({ message: err });
    }
    const id = event.pathParameters.ID;
    const tableName = process.env.tableName;
    const res = await Dynamo.get(id, tableName).catch (err => {
            const er = err.message;
            console.log(er);
            return Responses._400({ message: er });            
        });
    if (res)
        return Responses._200(res);
    return Responses._200(null);
}
