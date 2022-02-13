import type { AWS } from "@serverless/typescript";

import {
  listMedic,
  listMedicOne,
  insertMedic,
} from "@functions/medic/handlers";

const serverlessConfiguration: AWS = {
  service: "api-mantenimiento-infraestructura",
  frameworkVersion: "2",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "us-east-1",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      SQS_QUEUE_URL:
        "${cf:api-mantenimiento-infraestructura-dev.SQSColaCursoUrl}",
      SECRET_DATABASE: "/aws02/dev/database",
      DATABASE_NAME: "/curso02/dev/database_name",
      SNS_TOPIC_ARN:
        "${cf:api-mantenimiento-infraestructura-dev.SNSCursoTopicoArn}",
    },
    deploymentBucket: {
      name: "api-mantenimiento-infraestructura-deploy",
      serverSideEncryption: "AES256",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "sqs:SendMessage",
            Resource: [
              "${cf:api-mantenimiento-infraestructura-dev.SQSColaCursoArn}",
            ],
          },
          {
            Effect: "Allow",
            Action: "SNS:Publish",
            Resource:
              "${cf:api-mantenimiento-infraestructura-dev.SNSCursoTopicoArn}",
          },
        ],
      },
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { listMedic, listMedicOne, insertMedic },
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
  resources: {
    Resources: {
      SQSColaCurso: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSColaCurso",
        },
      },
      SNSCursoTopico: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "SNSCursoTopico",
        },
      },
    },
    Outputs: {
      SQSColaCursoArn: {
        Value: { "Fn::GetAtt": ["SQSColaCurso", "Arn"] },
      },
      SQSColaCursoUrl: {
        Value: { Ref: "SQSColaCurso" },
      },
      SNSCursoTopicoArn: {
        Value: { Ref: "SNSCursoTopico" },
      },
      SNSCursoTopicoName: {
        Value: { "Fn::GetAtt": ["SNSCursoTopico", "TopicName"] },
      },
    },
  },
};

module.exports = serverlessConfiguration;
