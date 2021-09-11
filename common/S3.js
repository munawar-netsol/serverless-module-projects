const AWS = require('aws-sdk');
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

if (process.env.IS_OFFLINE) {
    s3 = new AWS.S3({
        s3ForcePathStyle: true,
        accessKeyId: 'S3RVER', // This specific key is required when working offline
        secretAccessKey: 'S3RVER',
        endpoint: new AWS.Endpoint('http://localhost:4569'),
    });
}

const S3 = {
    async getObject(bucketName, fileName) {
        const params = {
            Bucket: bucketName, 
            Key: fileName
        };
        const data = await s3.getObject(params).promise()
        .catch(ex => {
            console.log("S3 get object error: "+ ex);
        });
        return data;
    },
    async uploadObject(bucketName, fileName, content) {
        var params = {
            Body: content, 
            Bucket: bucketName, 
            Key: fileName
           };
        const data = await s3.putObject(params).promise()
        .catch(ex => {
            console.log("S3 get object error: "+ ex);
        });
        return data;
    },
    async uploadImageObject(bucketName, fileName, content, mime, acl) {
        var params = {
            Body: content, 
            Bucket: bucketName, 
            Key: fileName,
            ContentType: mime,
            ACL: acl
           };
        const data = await s3.putObject(params).promise()
        .catch(ex => {
            console.log("S3 get object error: "+ ex);
        });        
        return data;
    }
}
module.exports = S3
