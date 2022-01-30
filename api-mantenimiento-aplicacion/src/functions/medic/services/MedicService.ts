import * as AWS from "aws-sdk";
const LAMBDA = new AWS.Lambda();

export class MedicService {
  async list(event) {
    const results = await LAMBDA.invoke({
      InvocationType: "RequestResponse",
      FunctionName: process.env.LAMBDA_LIST_MEDIC,
    }).promise();

    const payload = results.Payload.toString();
    const jsonPayload = JSON.parse(payload);
    const body = JSON.parse(jsonPayload.body);

    return {
      statusCode: 200,
      message: "Response from Service",
      data: body.data,
    };
  }
}
