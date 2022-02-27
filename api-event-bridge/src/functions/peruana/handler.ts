// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

const receivePeruanaOrder = {
  handler: `${handlerPath(
    __dirname
  )}/controller/PeruanaController.receivePeruanaOrder`,
  events: [
    {
      eventBridge: {
        pattern: {
          source: ["com.ecommerce.order"],
          "detail-type": ["OrderCreated"],
          detail: {
            kindOfFood: ["peruana"],
          },
        },
      },
    },
  ],
};

export { receivePeruanaOrder };
