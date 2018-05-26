// aws-sdk handles the req cycle between my server and aws SES server.
// Just like passport sends req to Google OAuth Servers
import aws from 'aws-sdk';

export default function sendEmail(options) {
  aws.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.Amazon_accessKeyId,
    secretAccessKey: process.env.Amazon_secretAccessKey,
  });

  // SES Init w/ latest version
  const ses = new aws.SES({ apiVersion: 'latest' });

  aws.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.Amazon_accessKeyId,
    secretAccessKey: process.env.Amazon_secretAccessKey,
  });

  // Types of params for sendEmail()
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property
  return new Promise((resolve, reject) => {
    ses.sendEmail(
      {
        Source: options.from,
        Destination: {
          CcAddresses: options.cc,
          ToAddresses: options.to,
        },
        Message: {
          Subject: {
            Data: options.subject,
          },
          Body: {
            Html: {
              Data: options.body,
            },
          },
        },
        ReplyToAddresses: options.replyTo,
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      },
    );
  });
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html
