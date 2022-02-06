import { handlerPath } from "@libs/handlerResolver";

const mailNewMedic = {
  handler: `${handlerPath(__dirname)}/controller/MailsController.mailNewMedic`,
};

export { mailNewMedic };
