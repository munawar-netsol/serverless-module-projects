const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const tableName = process.env.chatAppTableName;

exports.handler = async (event) => {
    const { connectionId } = event.requestContext;
    const res = await Dynamo.delete({
        ConnectionId : connectionId
    }, tableName);

    if (res)
        return Responses._200({ message: 'Disconnected!' });
}
