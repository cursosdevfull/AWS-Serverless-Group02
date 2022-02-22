import * as aws from "aws-sdk";
const sqs = new aws.SQS();
const sns = new aws.SNS({ region: "us-east-1" });

export class NotificationService {
  async sentEmail(body: any) {
    const queueUrl = process.env.SQS_QUEUE_URL;

    const params = {
      MessageBody: JSON.stringify(body),
      QueueUrl: queueUrl,
    };

    await sqs.sendMessage(params).promise();
  }

  async sentMessageSNS(body: any) {
    const message: aws.SNS.PublishInput = {
      Message: JSON.stringify(body),
      TopicArn: process.env.SNS_TOPIC_ARN,
    };

    console.log("topic arn", process.env.SNS_TOPIC_ARN);

    const result = await sns.publish(message).promise();
    console.log("result", result);

    return true;
  }
}
