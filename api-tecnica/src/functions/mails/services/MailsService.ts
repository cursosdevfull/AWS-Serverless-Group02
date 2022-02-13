import * as AWS from "aws-sdk";
import * as velocityjs from "velocityjs";
import { S3Service } from "./S3Service";

const SES = new AWS.SES({ region: "us-east-1" });

export interface OptionsEmail {
  source: string;
  addresses: string[];
  subject: string;
  template: {
    nameBucket: string;
    key: string;
  };
  data: { [s: string]: string | number }[];
}

export class MailsService {
  async sentMail(options: OptionsEmail) {
    let bodyEmail = await S3Service.read(
      options.template.nameBucket,
      options.template.key
    );
    bodyEmail = velocityjs.render(
      bodyEmail,
      options.data.reduce(this.joinAttributes, {})
    );

    const params: AWS.SES.SendEmailRequest = {
      Source: options.source,
      Destination: {
        ToAddresses: options.addresses,
      },
      Message: {
        Body: {
          Html: {
            Data: bodyEmail,
          },
        },
        Subject: {
          Data: options.subject,
        },
      },
    };

    await SES.sendEmail(params).promise();
  }

  joinAttributes(accum: object, el: { [s: string]: string | number }) {
    return { ...accum, ...el };
  }
}
