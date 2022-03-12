import { client } from "@functions/client/handlers";
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "api-auth-cognito",
  frameworkVersion: "2",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    region: "us-east-1",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { client },
  resources: {
    Resources: {
      CognitoUserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          UserPoolName: "api-authorizer-cognito-user-pool",
          AutoVerifiedAttributes: ["email"],
          EmailVerificationSubject: "Verifique su correo",
          EmailVerificationMessage: "Su código de verificación es {####}",
        },
      },
      CognitoUserPoolClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          ClientName: "api-authorizer-cognito-client",
          GenerateSecret: false,
          UserPoolId: {
            Ref: "CognitoUserPool",
          },
          ExplicitAuthFlows: [
            "ALLOW_USER_PASSWORD_AUTH",
            "ALLOW_REFRESH_TOKEN_AUTH",
          ],
        },
      },
      CognitoIdentityPool: {
        Type: "AWS::Cognito::IdentityPool",
        Properties: {
          IdentityPoolName: "api-authorizer-cognito-identity-pool",
          AllowUnauthenticatedIdentities: false,
          CognitoIdentityProviders: [
            {
              ProviderName: {
                "Fn::GetAtt": ["CognitoUserPool", "ProviderName"],
              },
              ClientId: {
                Ref: "CognitoUserPoolClient",
              },
            },
          ],
        },
      },
      CognitoIdentityPoolRoles: {
        Type: "AWS::Cognito::IdentityPoolRoleAttachment",
        Properties: {
          IdentityPoolId: {
            Ref: "CognitoIdentityPool",
          },
          Roles: {
            authenticated: { "Fn::GetAtt": ["CognitoAuthRole", "Arn"] },
            unauthenticated: { "Fn::GetAtt": ["CognitoUnauthRole", "Arn"] },
          },
        },
      },
      CognitoAuthRole: {
        Type: "AWS::IAM::Role",
        Properties: {
          RoleName: "cognito-auth-cursoaws",
          Path: "/",
          AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  Federated: "cognito-identity.amazonaws.com",
                },
                Action: ["sts:AssumeRoleWithWebIdentity"],
                Condition: {
                  StringEquals: {
                    "cognito-identity.amazonaws.com:aud": {
                      Ref: "CognitoIdentityPool",
                    },
                  },
                  "ForAnyValue:StringLike": {
                    "cognito-identity.amazonaws.com:amr": "authenticated",
                  },
                },
              },
            ],
          },
          Policies: [
            {
              PolicyName: "cognito-authorized-policy",
              PolicyDocument: {
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Allow",
                    Action: [
                      "mobileanalytics:PutEvents",
                      "cognito-sync:*",
                      "cognito-identity:*",
                    ],
                    Resource: "*",
                  },
                  {
                    Effect: "Allow",
                    Action: ["execute-api:Invoke"],
                    Resource: "*",
                  },
                ],
              },
            },
          ],
        },
      },
      CognitoUnauthRole: {
        Type: "AWS::IAM::Role",
        Properties: {
          RoleName: "cognito-auth-curso-aws02",
          Path: "/",
          AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  Federated: "cognito-identity.amazonaws.com",
                },
                Action: ["sts:AssumeRoleWithWebIdentity"],
                Condition: {
                  StringEquals: {
                    "cognito-identity.amazonaws.com:aud": {
                      Ref: "CognitoIdentityPool",
                    },
                  },
                  "ForAnyValue:StringLike": {
                    "cognito-identity.amazonaws.com:amr": "unauthenticated",
                  },
                },
              },
            ],
          },
          Policies: [
            {
              PolicyName: "cognito-unauthorized-policy",
              PolicyDocument: {
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Allow",
                    Action: [
                      "mobileanalytics:PutEvents",
                      "cognito-sync:*",
                      "cognito-identity:*",
                    ],
                    Resource: "*",
                  },
                ],
              },
            },
          ],
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
