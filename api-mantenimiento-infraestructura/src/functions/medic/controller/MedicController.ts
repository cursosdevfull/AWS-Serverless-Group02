import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { MedicService } from "../services/MedicService";
import { NotificationService } from "../services/NotificationService";

const notification: NotificationService = new NotificationService();
const service: MedicService = new MedicService(notification);
export class MedicController {
  static async list() {
    const data = await service.listMedics();
    return formatJSONResponse({
      data,
    });
  }

  static async listOne(request) {
    const data = await service.listMedicOne(+request.id);
    return formatJSONResponse({
      data,
    });
  }

  static async insert(request) {
    const data = await service.insert(request);
    return formatJSONResponse({
      data,
    });
  }
}

export const list = middyfy(MedicController.list);
export const listOne = middyfy(MedicController.listOne);
export const insert = middyfy(MedicController.insert);
