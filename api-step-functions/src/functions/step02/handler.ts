import { handlerPath } from "@libs/handlerResolver";

const step02 = {
  handler: `${handlerPath(
    __dirname
  )}/controller/Step02Controller.receiveStep02`,
};

export { step02 };
