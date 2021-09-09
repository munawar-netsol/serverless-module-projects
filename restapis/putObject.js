const Responses = require('../common/API_Responses');
const S3 = require('../common/S3');
const bucketName = process.env.bucketName;
const putObject = async (event) => {
    if (!event.pathParameters && !event.pathParameters.fileName)
    {
        console.log('Profile File name in path!');
        return Responses._400({ "message": 'Profile File name in path!' });
    }
    const fileName = event.pathParameters.fileName;
    const content = event.body;
    const res = await S3.uploadObject(bucketName, fileName, content);
    return Responses._200(res);
}
exports.handler = putObject;