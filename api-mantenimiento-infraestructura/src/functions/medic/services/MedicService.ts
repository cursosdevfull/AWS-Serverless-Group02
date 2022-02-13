import { OptionsEmail } from "@libs/options-email.interface";
import { CoreConnection } from "../db/connections/coreConnection";
import { MedicDB } from "../db/connections/medicDb";
import { NotificationService } from "./NotificationService";

export class MedicService {
  private dbQuery;

  constructor(private notificationService: NotificationService) {}

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

  async insert(body: any) {
    await this.connectToDatabase();
    await this.dbQuery.insert(body);

    const optionsEmail: OptionsEmail = {
      source: "sergiohidalgocaceres@gmail.com",
      addresses: [body.email],
      subject: "Bienvenido a la plataforma de medicos",
      template: {
        nameBucket: "cursoaws02",
        key: "index.html",
      },
      data: [{ name: body.name }, { lastname: body.lastname }],
    };

    await this.notificationService.sentEmail(optionsEmail);
    await this.notificationService.sentMessageSNS(optionsEmail);
    return body;
  }
}
