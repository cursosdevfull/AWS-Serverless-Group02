import { handlerPath } from "@libs/handlerResolver";

const step03 = {
  handler: `${handlerPath(
    __dirname
  )}/controller/Step03Controller.receiveStep03`,
};

export { step03 };
