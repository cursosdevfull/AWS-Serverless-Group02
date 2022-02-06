import * as mysql from "mysql2/promise";
import {
  QUERY_INSERT,
  QUERY_MEDIC_LIST,
  QUERY_MEDIC_LIST_ONE,
} from "../queries/medic.query";
import { CoreConnection } from "./coreConnection";

export class MedicDB {
  private coreConnection: CoreConnection;
  constructor(private connection: mysql.Connection) {
    this.coreConnection = new CoreConnection();
  }

  async listMedics() {
    const query = QUERY_MEDIC_LIST;
    return await this.coreConnection.executeSQLStatement(
      this.connection,
      query
    );
  }

  async listMedicOne(id: number) {
    const query = QUERY_MEDIC_LIST_ONE;
    const bindParams = { id };
    return await this.coreConnection.executeSQLStatement(
      this.connection,
      query,
      bindParams
    );
  }

  async insert(body: object) {
    const query = QUERY_INSERT;
    const bindParams = body;
    return await this.coreConnection.executeSQLStatement(
      this.connection,
      query,
      bindParams
    );
  }
}
