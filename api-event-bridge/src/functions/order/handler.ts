// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

const addOrder = {
  handler: `${handlerPath(__dirname)}/controller/OrderController.addOrder`,
  events: [
    {
      http: {
        method: "post",
        path: "order",
        integration: "lambda",
      },
    },
  ],
};

export { addOrder };
