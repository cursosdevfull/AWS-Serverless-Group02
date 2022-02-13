import * as AWS from "aws-sdk";
const S3 = new AWS.S3();

export class S3Service {
  static async read(nameBucket: string, key: string): Promise<string> {
    const parameters = { Bucket: nameBucket, Key: key }; // empresa-a/doc.txt
    const dataS3 = await S3.getObject(parameters).promise();
    return dataS3.Body.toString("utf-8");
  }
}
