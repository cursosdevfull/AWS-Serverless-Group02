import type { AWS } from "@serverless/typescript";

import { mailNewMedic } from "@functions/mails/handlers";

const serverlessConfiguration: AWS = {
  service: "api-tecnica",
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
      name: "api-tecnica-deploy",
      serverSideEncryption: "AES256",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { mailNewMedic },
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
