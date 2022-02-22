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
      SQS_QUEUE_URL: "${self:custom.SQSColaCursoUrl.url}",
      //"${cf:api-mantenimiento-infraestructura-dev.SQSColaCursoUrl}",
      SECRET_DATABASE: "/aws02/dev/database",
      DATABASE_NAME: "/curso02/dev/database_name",
      SNS_TOPIC_ARN: "${self:custom.SNSCursoTopicoArn.arn}",
      // "${cf:api-mantenimiento-infraestructura-dev.SNSCursoTopicoArn}",
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
              "arn:aws:sqs:us-east-1:*:*",
              // "${cf:api-mantenimiento-infraestructura-dev.SQSColaCursoArn}",
            ],
          },
          {
            Effect: "Allow",
            Action: "SNS:Publish",
            Resource: "arn:aws:sns:us-east-1:*:*",
            // "${cf:api-mantenimiento-infraestructura-dev.SNSCursoTopicoArn}",
          },
          {
            Effect: "Allow",
            Action: ["secretsmanager:GetSecretValue"],
            Resource: ["arn:aws:secretsmanager:us-east-1:*:secret:*"],
          },
          {
            Effect: "Allow",
            Action: ["ssm:GetParameter"],
            Resource: ["arn:aws:ssm:us-east-1:*:parameter/*"],
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
    SQSColaCursoUrl: { url: { Ref: "SQSColaCurso" } },
    SNSCursoTopicoArn: {
      arn: { Ref: "SNSCursoTopico" },
    },
    SQSColaCursoArn: {
      arn: { "Fn::GetAtt": ["SQSColaCurso", "Arn"] },
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
          Subscription: [
            {
              // Endpoint: { "Fn::GetAtt": ["SQSColaCurso", "Arn"] },
              Endpoint: "arn:aws:sqs:us-east-1:282865065290:SQSColaCurso",
              Protocol: "sqs",
            },
            {
              Endpoint: "sergiohidalgocaceres@gmail.com",
              Protocol: "email",
            },
          ],
        },
      },
      SQSQueuePolicy: {
        Type: "AWS::SQS::QueuePolicy",
        Properties: {
          Queues: [{ Ref: "SQSColaCurso" }],
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Principal: "*",
                Effect: "Allow",
                Action: ["sqs:SendMessage"],
                Resource: "*",
                Condition: {
                  ArnEquals: {
                    "aws:SourceArn": { Ref: "SNSCursoTopico" },
                  },
                },
              },
            ],
          },
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
