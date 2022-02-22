import * as mysql from "mysql2/promise";
import * as AWS from "aws-sdk";

export class MySQLConnection {
  /* config = {
    user: "admin",
    password: "3lMUnd0esANcho2020#",
    host: "database-1.cmuv7any6zxa.us-east-1.rds.amazonaws.com",
    database: "awsgroup02",
  }; */

  async getParamatersConnection() {
    const client = new AWS.SecretsManager({ region: "us-east-1" });

    const data = await client
      .getSecretValue({ SecretId: process.env.SECRET_DATABASE })
      .promise();

    return JSON.parse(data.SecretString);
  }

  async getDatabaseName() {
    const ssm = new AWS.SSM({ region: "us-east-1" });
    const params = { Name: process.env.DATABASE_NAME, WithDecryption: true };

    const request = await ssm.getParameter(params).promise();

    return request.Parameter.Value;
  }

  async getConnection() {
    const { username, password, host } = await this.getParamatersConnection();

    const databaseName = await this.getDatabaseName();

    console.log("MySQL - Obtaining connection ...", new Date().toISOString());
    const connection = await mysql.createConnection({
      user: username,
      password,
      host,
      database: databaseName,
    });
    console.log("MySQL - Connected ...", new Date().toISOString());

    return connection;
  }

  async executeSQLStatement(connection, statement, bindParams = {}) {
    const queryBindingParams = this.bindingParams(
      connection,
      statement,
      bindParams
    );
    return await this.execute(connection, queryBindingParams);
  }

  private async execute(connection: mysql.Connection, statement: string) {
    console.log(
      "MySQL - Executing SQL Statement time",
      new Date().toISOString()
    );
    const result = await connection.query(statement);
    console.log(
      "MySQL - SQL Statement executed time",
      new Date().toISOString()
    );
    return result;
  }

  private bindingParams(
    connection: mysql.Connection,
    statement: string,
    bindParams: object
  ): string {
    let statementBinding = `${statement}`;
    for (const key in bindParams) {
      const value = connection.escape(bindParams[key]);
      statementBinding = statementBinding.replace(`:${key}`, value);
    }

    return statementBinding;
  }
}
