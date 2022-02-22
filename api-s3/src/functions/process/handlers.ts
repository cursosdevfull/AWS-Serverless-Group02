import { handlerPath } from "@libs/handlerResolver";

const getRecords = {
  handler: `${handlerPath(__dirname)}/controller/ProcessController.getRecords`,
  events: [
    {
      s3: {
        bucket: "cursoawsgroup02",
        event: "s3:ObjectCreated:*",
        existing: true,
        rules: [
          {
            prefix: "brokers/",
            suffix: ".txt",
          },
        ],
      },
    },
  ],
};

export { getRecords };
