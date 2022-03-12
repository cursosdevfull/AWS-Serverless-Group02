import { ClientService } from "../services/ClientService";

const service = new ClientService();

class ClientController {
  static async client(event) {
    return service.client(event);
  }
}

export const client = ClientController.client;
