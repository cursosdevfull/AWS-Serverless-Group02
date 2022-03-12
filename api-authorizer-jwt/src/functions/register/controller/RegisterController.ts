import { RegisterService } from "../services/RegisterService";

const service = new RegisterService();

class RegisterController {
  static async register(event) {
    return service.register(event);
  }
}

export const register = RegisterController.register;
