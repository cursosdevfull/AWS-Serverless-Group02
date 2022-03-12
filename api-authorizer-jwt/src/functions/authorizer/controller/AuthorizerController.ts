import { AuthorizerService } from "../services/AuthorizerService";

const service = new AuthorizerService();

class AuthorizerController {
  static async authorizer(event) {
    return service.authorizer(event);
  }
}

export const authorizer = AuthorizerController.authorizer;
