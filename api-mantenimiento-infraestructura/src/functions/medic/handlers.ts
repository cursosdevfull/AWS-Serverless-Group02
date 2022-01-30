import { handlerPath } from "@libs/handlerResolver";

const listMedic = {
  handler: `${handlerPath(__dirname)}/controller/MedicController.list`,
};

export { listMedic };
