import { handlerPath } from "@libs/handlerResolver";

const mailNewMedic = {
  handler: `${handlerPath(__dirname)}/controller/MailsController.mailNewMedic`,
  events: [
    {
      /* sns: {
        arn: "${cf:api-mantenimiento-infraestructura-dev.SNSCursoTopicoArn}",
        topicName:
          "${cf:api-mantenimiento-infraestructura-dev.SNSCursoTopicoName}",
      }, */
      sqs: {
        arn: "${cf:api-mantenimiento-infraestructura-dev.SQSColaCursoArn}",
      },
    },
  ],
};

export { mailNewMedic };
