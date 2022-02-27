import * as AWS from "aws-sdk";

class TriggerController {
  static async trigger(event) {
    const { body } = event;

    return { statusCode: 200, body: "todo ok" };
  }
}

export const trigger = TriggerController.trigger;
