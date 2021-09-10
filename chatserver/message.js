const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const websocketSend = require('./websocketSend');
const tableName = process.env.chatAppTableName;

exports.handler = async event => {
    const { connectionId } = event.requestContext;
    const { message } = JSON.parse(event.body);
    const res = await Dynamo.get({
        ConnectionId : connectionId
    }, tableName);
    if (res)   {
    res.Messages.push(message);
    const res1 = await Dynamo.put(res, tableName);
    delete res1.Messages;
    if (res1) {
            const res2 = await websocketSend({
                ...res1,
                message
            })
            return Responses._200({
                message: res2
            });
        }          
    }
    return Responses._400({
        message: 'Error in Message Delivery!'
    });
}
