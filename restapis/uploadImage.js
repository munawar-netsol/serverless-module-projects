const Responses = require('../common/API_Responses');
const S3 = require('../common/S3');
const bucketName = process.env.imageBucketName;
const fileType = require('file-type');
const { v4 : uuidv4 } = require('uuid');
const name = uuidv4();

const putObject = async (event) => {    
    const buffer = Buffer.from(JSON.parse(event.body).photo, 'base64');
    const fileInfo =await fileType.fromBuffer(buffer);    
    const fileName = name + "." + fileInfo.ext;
    await S3.uploadImageObject(bucketName, fileName, buffer, fileInfo.mime, 'public-read');
    const url = `https://${bucketName}.s3.amazonaws.com/${fileName}`;    
    return Responses._200({
        imageUrl: url
    });
}
exports.handler = putObject;