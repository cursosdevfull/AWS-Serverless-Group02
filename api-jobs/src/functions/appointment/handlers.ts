import { handlerPath } from "@libs/handlerResolver";

const cancellAppointment = {
  handler: `${handlerPath(__dirname)}/controller/AppointmentController.cancell`,
  events: [
    {
      schedule: "cron(0/1 * * * ? *)",
    },
  ],
};

export { cancellAppointment };
