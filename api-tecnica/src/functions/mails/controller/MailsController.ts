import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { MailsService, OptionsEmail } from "../services/MailsService";

export class MailsController {
  static async mailNewMedic(request) {
    console.log("request: " + JSON.stringify(request));
    const body = JSON.parse(request.Records[0].body);
    const optionsEmail: OptionsEmail = JSON.parse(
      // request.Records[0].Sns.Message
      body.Message
    );

    const service: MailsService = new MailsService();
    await service.sentMail(optionsEmail);
    return formatJSONResponse({
      data: "Mails New Medic send",
    });
  }
}

export const mailNewMedic = middyfy(MailsController.mailNewMedic);
