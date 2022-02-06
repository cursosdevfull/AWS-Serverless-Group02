import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { MedicService } from "../services/MedicService";

export class MedicController {
  static async list() {
    const service: MedicService = new MedicService();
    const data = await service.listMedics();
    return formatJSONResponse({
      data,
    });
  }

  static async listOne(request) {
    const service: MedicService = new MedicService();
    const data = await service.listMedicOne(+request.id);
    return formatJSONResponse({
      data,
    });
  }

  static async insert(request) {
    const service: MedicService = new MedicService();
    const data = await service.insert(request);
    return formatJSONResponse({
      data,
    });
  }
}

export const list = middyfy(MedicController.list);
export const listOne = middyfy(MedicController.listOne);
export const insert = middyfy(MedicController.insert);
