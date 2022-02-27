// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

const receiveTailandesaOrder = {
  handler: `${handlerPath(
    __dirname
  )}/controller/TailandesaController.receiveTailandesaOrder`,
  events: [
    {
      eventBridge: {
        pattern: {
          source: ["com.ecommerce.order"],
          "detail-type": ["OrderCreated"],
          detail: {
            kindOfFood: ["tailandesa"],
          },
        },
      },
    },
  ],
};

export { receiveTailandesaOrder };
