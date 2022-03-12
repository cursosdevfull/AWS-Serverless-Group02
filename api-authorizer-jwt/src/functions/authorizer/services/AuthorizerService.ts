import * as jwt from "jsonwebtoken";

export class AuthorizerService {
  async authorizer(event) {
    const authorizationToken = event.authorizationToken;
    const methodArn = event.methodArn;

    try {
      await this.validateToken(authorizationToken);
      return this.generatePolicy("user", "Allow", methodArn);
    } catch (error) {
      console.log(error);
      return this.generatePolicy("user", "Deny", methodArn);
    }
  }

  async validateToken(token: string) {
    console.log("validateToken", token);
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  generatePolicy(principalId: string, effect: string, resource: string) {
    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Action: "execute-api:Invoke",
          Resource: resource,
        },
      ],
    };

    return {
      principalId,
      policyDocument,
    };
  }
}
