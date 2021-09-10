const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const tableName = process.env.chatAppTableName;

exports.handler = async (event) => {
    const { domainName, stage, connectionId } = event.requestContext;
    const res = await Dynamo.put({
        ConnectionId : connectionId,
        Stage: stage,
        DomainName: domainName,
        CreatedAt: Date.now(),
        Messages: []
    }, tableName);

    if (res)
        return Responses._200({ message: 'Connected with ChatServer.' });
}
