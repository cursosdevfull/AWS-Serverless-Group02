import { CoreConnection } from "../db/connections/coreConnection";
import { MedicDB } from "../db/connections/medicDb";
import * as aws from "aws-sdk";

const sqs = new aws.SQS();

export class MedicService {
  private dbQuery;
  private async connectToDatabase() {
    const coreConnection = new CoreConnection();
    const connection = await coreConnection.getConnection();
    this.dbQuery = new MedicDB(connection);
  }

  async listMedics() {
    await this.connectToDatabase();
    const result = await this.dbQuery.listMedics();
    return result[0];
  }

  async listMedicOne(id: number) {
    await this.connectToDatabase();
    const result = await this.dbQuery.listMedicOne(id);
    return result[0];
  }

  async insert(body: object) {
    await this.connectToDatabase();
    await this.dbQuery.insert(body);
    await this.sendMail();
    return body;
  }

  async sendMail() {
    const body = {
      name: "Juan",
      lastname: "Pérez",
      email: "juan.perez@correo.com",
    };
    const queueUrl = process.env.SQS_QUEUE_URL;

    const params = {
      MessageBody: JSON.stringify(body),
      QueueUrl: queueUrl,
    };

    await sqs.sendMessage(params).promise();
  }
}
