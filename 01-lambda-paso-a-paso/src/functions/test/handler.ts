import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const test: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return formatJSONResponse({
    message: "Hola Mundo",
    event,
  });
};

export const main = middyfy(test);
