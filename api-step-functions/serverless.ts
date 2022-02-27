//import type { AWS } from "@serverless/typescript";

import { step01 } from "@functions/step01/handler";
import { step02 } from "@functions/step02/handler";
import { step03 } from "@functions/step03/handler";
import { step04 } from "@functions/step04/handler";
import { trigger } from "@functions/trigger/handler";
import { ServerlessStepFunctions } from "@libs/serverlessStepFunctions.interface";

const serverlessConfiguration: ServerlessStepFunctions = {
  service: "api-step-functions",
  frameworkVersion: "2",
  plugins: ["serverless-esbuild", "serverless-step-functions"],
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
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["states:ListStateMachines", "states:StartExecution"],
            Resource: "arn:aws:states:::*:*",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { step01, step02, step03, step04, trigger },
  stepFunctions: {
    stateMachines: {
      initialStateMachine: {
        name: "initialStateMachine",
        definition: {
          Comment: "Initial state machine",
          StartAt: "Choice",
          States: {
            Choice: {
              Type: "Choice",
              Choices: [
                {
                  Variable: "$.number",
                  NumericGreaterThan: 500,
                  Next: "step02",
                },
              ],
            },
            step02: {
              Type: "Task",
              Resource: { "Fn::GetAtt": ["step02", "Arn"] },
              End: true,
            },
          },
        },
      },
    },
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
