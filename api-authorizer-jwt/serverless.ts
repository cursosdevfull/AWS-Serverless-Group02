import type { AWS } from "@serverless/typescript";

import { register } from "@functions/register/handlers";
import { authorizer } from "@functions/authorizer/handlers";
import { client } from "@functions/client/handlers";

const serverlessConfiguration: AWS = {
  service: "api-authorizer-jwt",
  frameworkVersion: "2",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    region: "us-east-1",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ["myAPIKey"],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      JWT_SECRET: "Keyw0rdSuP3rS3cr3t",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { register, authorizer, client },
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
