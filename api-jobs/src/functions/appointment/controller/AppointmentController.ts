import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

export class AppointmentController {
  static async cancell() {
    const data = {
      message: "Cita cancelada",
      status: "success",
      dateCancell: new Date(),
    };
    console.log(data);
    return formatJSONResponse({
      data,
    });
  }
}

export const cancell = middyfy(AppointmentController.cancell);
