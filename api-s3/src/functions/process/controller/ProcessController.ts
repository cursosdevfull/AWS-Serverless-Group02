import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const S3 = new AWS.S3();

export class ProcessController {
  static async getRecords(event) {
    const s3 = event.Records[0].s3;
    const bucketName = s3.bucket.name;
    const key = s3.object.key;

    const params = { Bucket: bucketName, Key: key };

    const data: any = await S3.getObject(params).promise();
    const content = Buffer.from(data.Body).toString();
    console.log(content);
    return formatJSONResponse({
      data,
    });
  }
}

export const getRecords = middyfy(ProcessController.getRecords);
