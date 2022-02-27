import { handlerPath } from "@libs/handlerResolver";

const step01 = {
  handler: `${handlerPath(
    __dirname
  )}/controller/Step01Controller.receiveStep01`,
};

export { step01 };
