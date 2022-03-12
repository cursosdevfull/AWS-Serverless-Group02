// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

const register = {
  handler: `${handlerPath(__dirname)}/controller/RegisterController.register`,
  events: [
    {
      http: {
        method: "post",
        path: "register",
        integration: "lambda",
        private: true,
      },
    },
  ],
};

export { register };
