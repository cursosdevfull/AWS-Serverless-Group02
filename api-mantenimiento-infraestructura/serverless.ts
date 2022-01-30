import type { AWS } from "@serverless/typescript";

import { listMedic } from "@functions/medic/handlers";

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
    },
    deploymentBucket: {
      name: "api-mantenimiento-infraestructura-deploy",
      serverSideEncryption: "AES256",
    },
    iam: {
      role: "arn:aws:iam::282865065290:role/ROLE_LAMBDA_INVOKE_MANTENIMIENTO",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { listMedic },
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
