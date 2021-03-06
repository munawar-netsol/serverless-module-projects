module.exports = {
    tables: [
        {
            TableName: 'player-point-aws',
            KeySchema: [
                {
                    AttributeName: 'ID',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'ID',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'game',
                    AttributeType: 'S',
                },
            ],
            GlobalSecondaryIndexes:[
                {
                    IndexName: "game-index",
                    Projection: {
                        ProjectionType: "ALL"
                    },
                    KeySchema:[{
                        KeyType:"HASH",
                        AttributeName: "game"
                    }]
                }
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
        {
            TableName: 'chat-app-table',
            KeySchema: [
                {
                    AttributeName: 'ConnectionId',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'ConnectionId',
                    AttributeType: 'S',
                }
            ],
            BillingMode: 'PAY_PER_REQUEST',
        }
    ],
    basePort: 8021,
};
