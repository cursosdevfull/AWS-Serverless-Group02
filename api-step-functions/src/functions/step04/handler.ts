import { handlerPath } from "@libs/handlerResolver";

const step04 = {
  handler: `${handlerPath(
    __dirname
  )}/controller/Step04Controller.receiveStep04`,
};

export { step04 };
