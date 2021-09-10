const AWS = require('aws-sdk');

module.exports = async input => {
    const { DomainName, Stage, ConnectionId, message } = input;
    const endpoint = new AWS.ApiGatewayManagementApi({
        endpoint: `${DomainName}/${Stage}`
    });
    const data = {
        ConnectionId: ConnectionId,
        Data: message
    }
    return await endpoint.postToConnection(data).promise();
}