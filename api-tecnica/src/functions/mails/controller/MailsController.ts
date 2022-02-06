import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { MailsService } from "../services/MailsService";

export class MailsController {
  static async mailNewMedic(request) {
    const service: MailsService = new MailsService();
    await service.mailNewMedic(request);
    return formatJSONResponse({
      data: "Mails New Medic send",
    });
  }
}

export const list = middyfy(MailsController.mailNewMedic);
