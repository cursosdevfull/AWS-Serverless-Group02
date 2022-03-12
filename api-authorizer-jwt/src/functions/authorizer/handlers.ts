// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

const authorizer = {
  handler: `${handlerPath(
    __dirname
  )}/controller/AuthorizerController.authorizer`,
};

export { authorizer };
