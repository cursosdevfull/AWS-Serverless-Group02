import * as jwt from "jsonwebtoken";

export class RegisterService {
  async register(event) {
    const payload = event.body;

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  }
}
