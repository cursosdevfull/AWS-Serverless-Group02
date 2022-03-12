// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

const client = {
  handler: `${handlerPath(__dirname)}/controller/ClientController.client`,
  events: [
    {
      http: {
        method: "get",
        path: "client",
        authorizer: "aws_iam",
        cors: true,
      },
    },
  ],
};

export { client };
