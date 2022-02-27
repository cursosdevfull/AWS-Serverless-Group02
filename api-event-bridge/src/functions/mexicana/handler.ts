// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

const receiveMexicanaOrder = {
  handler: `${handlerPath(
    __dirname
  )}/controller/MexicanaController.receiveMexicanaOrder`,
  events: [
    {
      eventBridge: {
        pattern: {
          source: ["com.ecommerce.order"],
          "detail-type": ["OrderCreated"],
          detail: {
            kindOfFood: ["mexicana"],
          },
        },
        deadLetterQueueArn: "",
      },
    },
  ],
};

export { receiveMexicanaOrder };
