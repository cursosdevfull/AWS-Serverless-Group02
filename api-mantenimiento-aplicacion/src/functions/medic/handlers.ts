// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

const listMedic = {
  handler: `${handlerPath(__dirname)}/controller/MedicController.list`,
  environment: {
    LAMBDA_LIST_MEDIC: "api-mantenimiento-infraestructura-dev-listMedic",
  },
  events: [
    {
      http: {
        method: "get",
        path: "medic",
        integration: "lambda",
      },
    },
  ],
};

const listOneMedic = {
  handler: `${handlerPath(__dirname)}/controller/MedicController.listOne`,
  environment: {
    LAMBDA_LIST_MEDIC_ONE: "api-mantenimiento-infraestructura-dev-listMedicOne",
  },
  events: [
    {
      http: {
        method: "get",
        path: "medic/{id}",
        integration: "lambda",
      },
    },
  ],
};

const insertMedic = {
  handler: `${handlerPath(__dirname)}/controller/MedicController.insert`,
  environment: {
    LAMBDA_INSERT_MEDIC: "api-mantenimiento-infraestructura-dev-insertMedic",
  },
  events: [
    {
      http: {
        method: "post",
        path: "medic",
        integration: "lambda",
      },
    },
  ],
};

export { listMedic, listOneMedic, insertMedic };
