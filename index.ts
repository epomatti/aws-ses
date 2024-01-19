import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import 'dotenv/config'

const REGION = process.env.AWS_REGION as string;
const sesClient = new SESv2Client({ region: REGION });

const SES_IDENTITY_ARN = process.env.SES_IDENTITY_ARN as string;
const EMAIL_FROM = process.env.EMAIL_FROM as string;
const EMAIL_TO = process.env.EMAIL_TO as string;

const createSendEmailCommand = () => {
  return new SendEmailCommand({
    FromEmailAddress: EMAIL_FROM,
    FromEmailAddressIdentityArn: SES_IDENTITY_ARN,
    Destination: {
      ToAddresses: [
        EMAIL_TO
      ]
    },
    Content: {
      Simple: {
        Subject: {
          Charset: "UTF-8",
          Data: "Test",
        },
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: "Some data",
          },
        }
      },
    },
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand();

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (e) {
    console.error("Failed to send email.");
    console.error(e);
    return e;
  }
};


(async () => {
  await run();
})();