import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

export class MedicController {
  static list() {
    console.log({
      statusCode: 200,
      message: "Response from Controller Infra",
      data: [
        { id: 1, name: "Medic 1" },
        { id: 2, name: "Medic 2" },
        { id: 3, name: "Medic 3" },
      ],
    });
    return formatJSONResponse({
      data: [
        { id: 1, name: "Medic 1" },
        { id: 2, name: "Medic 2" },
        { id: 3, name: "Medic 3" },
      ],
    });
  }
}

export const list = middyfy(MedicController.list);
