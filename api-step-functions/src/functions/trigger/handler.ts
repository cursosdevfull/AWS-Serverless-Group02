// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

const trigger = {
  handler: `${handlerPath(__dirname)}/controller/TriggerController.trigger`,
  events: [
    {
      http: {
        method: "post",
        path: "trigger",
        integration: "lambda",
      },
    },
  ],
};

export { trigger };
