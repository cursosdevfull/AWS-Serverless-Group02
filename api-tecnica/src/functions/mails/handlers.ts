import { handlerPath } from "@libs/handlerResolver";

const mailNewMedic = {
  handler: `${handlerPath(__dirname)}/controller/MailsController.mailNewMedic`,
  events: [
    {
      sqs: {
        arn: "${cf:api-mantenimiento-infraestructura-dev.SQSColaCursoArn}",
      },
    },
  ],
};

export { mailNewMedic };
