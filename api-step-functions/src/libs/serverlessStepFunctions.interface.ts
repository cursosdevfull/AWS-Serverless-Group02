import type { AWS } from "@serverless/typescript";

type ErrorName =
  | "States.ALL"
  | "States.DataLimitExceeded"
  | "States.Runtime"
  | "States.Timeout"
  | "States.TaskFailed"
  | "States.Permissions"
  | string;

type Catcher = {
  ErrorEquals: ErrorName[];
  Next: string;
  ResultPath?: string;
};

type Definition = {
  Comment?: string;
  StartAt: string;
  States: {
    [state: string]: {
      Catch?: Catcher[];
      Type:
        | "Task"
        | "Wait"
        | "Parallel"
        | "Choice"
        | "Pass"
        | "Fail"
        | "Succeed"
        | "Map";
      Choices?: any[];
      Branches?: any[];
      Parameters?: any;
      End?: boolean;
      Next?: string;
      ResultPath?: string;
      ItemsPath?: string;
      Resource?: string | { "Fn::GetAtt": string[] };
      Iterator?: Definition;
    };
  };
};

export interface ServerlessStepFunctions extends AWS {
  stepFunctions?: {
    stateMachines: {
      [stateMachine: string]: {
        name: string;
        definition: Definition;
      };
    };
    activities?: string;
    validate?: boolean;
  };
}
