// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

const client = {
  handler: `${handlerPath(__dirname)}/controller/ClientController.client`,
  events: [
    {
      http: {
        method: "get",
        path: "client",
        integration: "lambda",
        authorizer: "authorizer",
      },
    },
  ],
};

export { client };
