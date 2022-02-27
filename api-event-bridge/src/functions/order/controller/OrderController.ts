import * as AWS from "aws-sdk";

const eventBridge = new AWS.EventBridge();

class OrderController {
  static async addOrder(event) {
    const { body } = event;

    const params = {
      Entries: [
        {
          Source: "com.ecommerce.order",
          DetailType: "OrderCreated",
          Detail: JSON.stringify(body),
        },
      ],
    };

    const result = await eventBridge.putEvents(params).promise();
    console.log(result);
    return { statusCode: 200, body: "todo ok" };
  }
}

export const addOrder = OrderController.addOrder;
