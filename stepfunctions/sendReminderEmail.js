//const AWS = require('AWS-SDK');
import * as AWS from 'aws-sdk';
const SES = new AWS.SES();

exports.handler = async event => {
    console.log('event: ', event);
    const email = event.Input.email;
    const message = `
    Hi, we save you signed up but haven't played yet
    We hope you play soon!
    `;
    
    var params = {
        Destination: { /* required */            
            ToAddresses: [
                'munawersheikh@gmail.com'
            ]
        },
        Message: { /* required */
            Body: { /* required */            
                Text: {
                Charset: 'UTF-8',
                Data: message
                }
            },
            Subject: {
            Charset: 'UTF-8',
            Data: 'Warning of Game not played'
            }
            },
        Source: 'munawersheikh@gmail.com'
    };
    try {
        await SES.sendEmail(params).promise();
        return;
    }
    catch(error) {
        console.log('error sending email: '+ error);        
        throw error;
    }
};

