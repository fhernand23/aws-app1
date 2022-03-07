// import * as cdk from "@aws-cdk/core";
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import * as ddb from "@aws-cdk/aws-dynamodb";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";

export class App1Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'App1Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: "todo-api",
      schema: appsync.Schema.fromAsset("graphQL/schema.gql"), ///Path specified for lambda
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY, ///Defining Authorization Type
        },
      },
    });

    const todoLambda = new lambda.Function(this, "TodoFunction", {
      functionName: "todoHandler",
      runtime: lambda.Runtime.NODEJS_12_X, ///set nodejs runtime environment
      code: lambda.Code.fromAsset("functions"), ///path for lambda function directory
      handler: "main.handler", ///specfic fucntion in specific file
    });

    ////Set lambda as a datasource
    const lambda_data_source = api.addLambdaDataSource(
      "lamdaDataSource",
      todoLambda
    );
    ///Describing resolver for datasource

    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "getTodos",
    });

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
    });

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo",
    });

    const todosTable = new ddb.Table(this, "CDKTodosTable", {
      tableName: "13ATodotable",
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });
    todosTable.grantFullAccess(todoLambda);
    todoLambda.addEnvironment("TODOS_TABLE", todosTable.tableName);
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });
  }
}
