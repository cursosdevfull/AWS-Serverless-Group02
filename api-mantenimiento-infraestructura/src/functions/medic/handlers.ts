import { handlerPath } from "@libs/handlerResolver";

const listMedic = {
  handler: `${handlerPath(__dirname)}/controller/MedicController.list`,
};

const listMedicOne = {
  handler: `${handlerPath(__dirname)}/controller/MedicController.listOne`,
};

const insertMedic = {
  handler: `${handlerPath(__dirname)}/controller/MedicController.insert`,
};

export { listMedic, listMedicOne, insertMedic };
