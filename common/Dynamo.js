const AWS = require('aws-sdk');
let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8014'
    }
}

if (process.env.JEST_WORKER_ID) {
    options = {
        region: 'local-env',
        endpoint: 'http://localhost:8015',
        sslEnabled: false
    }    
}
const documentClient = new AWS.DynamoDB.DocumentClient(options);


const Dynamo = {
    async get(ID, tableName) {
        const params = {
            TableName: tableName,
            Key : {
                ID
            }
        }
        const data = await documentClient.get(params).promise();
        
        if (!data || !data.Item)
            throw Error ('Error fetching the data for ${ID} from ${tableName}');
        
        return data.Item;
    },

    async put(user, tableName) {
        const params = {
            TableName: tableName,
            Item: user
        }
        const res = await documentClient.put(params).promise();
        
        if (!res)
            throw Error ('Error writing the data for ${user.ID} from ${tableName}');
        
        return user;
    }

};

module.exports = Dynamo;