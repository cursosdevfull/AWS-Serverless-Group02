import { MedicService } from "../services/MedicService";

const service = new MedicService();

class MedicController {
  static async list(event) {
    return service.list(event);
  }

  static async listOne(event) {
    return {
      statusCode: 200,
      message: "List One",
      data: { id: 1, name: "Medic1" },
    };
  }
}

export const list = MedicController.list;
export const listOne = MedicController.listOne;
