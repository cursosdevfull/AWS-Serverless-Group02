import type { AWS } from "@serverless/typescript";

import { addOrder } from "@functions/order/handler";
import { receiveMexicanaOrder } from "@functions/mexicana/handler";
import { receivePeruanaOrder } from "@functions/peruana/handler";
import { receiveTailandesaOrder } from "@functions/tailandesa/handler";

const serverlessConfiguration: AWS = {
  service: "api-event-bridge",
  frameworkVersion: "2",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
    eventBridge: {
      useCloudFormation: true,
    },
    iam: {
      role: {
        name: "eventBridgeRole",
        statements: [
          {
            Effect: "Allow",
            Action: ["events:PutEvents"],
            Resource: "*",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    addOrder,
    receiveMexicanaOrder,
    receivePeruanaOrder,
    receiveTailandesaOrder,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
