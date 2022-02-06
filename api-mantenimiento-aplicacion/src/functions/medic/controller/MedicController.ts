import { MedicService } from "../services/MedicService";

const service = new MedicService();

class MedicController {
  static async list(event) {
    return service.list(event);
  }

  static async listOne(event) {
    return service.listOne(event);
  }

  static async insert(event) {
    return service.insert(event);
  }
}

export const list = MedicController.list;
export const listOne = MedicController.listOne;
export const insert = MedicController.insert;
