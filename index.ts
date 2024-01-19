import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const REGION = "us-east-2";
const sesClient = new SESv2Client({ region: REGION });

const SES_IDENTITY_ARN = process.env.SES_IDENTITY_ARN as string
const EMAIL_FROM = process.env.EMAIL_FROM as string
const EMAIL_TO = process.env.EMAIL_FROM as string

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
          Data: "EMAIL_SUBJECT",
        },
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: "TEXT_FORMAT_BODY",
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