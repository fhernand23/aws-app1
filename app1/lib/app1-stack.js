"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App1Stack = void 0;
// import * as cdk from "@aws-cdk/core";
const aws_cdk_lib_1 = require("aws-cdk-lib");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
const appsync = require("@aws-cdk/aws-appsync");
const lambda = require("@aws-cdk/aws-lambda");
const ddb = require("@aws-cdk/aws-dynamodb");
class App1Stack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // example resource
        // const queue = new sqs.Queue(this, 'App1Queue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });
        const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
            name: "todo-api",
            schema: appsync.Schema.fromAsset("graphQL/schema.gql"),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.API_KEY,
                },
            },
        });
        const todoLambda = new lambda.Function(this, "TodoFunction", {
            functionName: "todoHandler",
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset("functions"),
            handler: "main.handler",
        });
        ////Set lambda as a datasource
        const lambda_data_source = api.addLambdaDataSource("lamdaDataSource", todoLambda);
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
exports.App1Stack = App1Stack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwMS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcDEtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQXdDO0FBQ3hDLDZDQUFnRDtBQUVoRCw4Q0FBOEM7QUFDOUMsZ0RBQWdEO0FBQ2hELDhDQUE4QztBQUM5Qyw2Q0FBNkM7QUFNN0MsTUFBYSxTQUFVLFNBQVEsbUJBQUs7SUFDbEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qiw2Q0FBNkM7UUFFN0MsbUJBQW1CO1FBQ25CLG1EQUFtRDtRQUNuRCxpREFBaUQ7UUFDakQsTUFBTTtRQUNOLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3RELElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQztZQUN0RCxtQkFBbUIsRUFBRTtnQkFDbkIsb0JBQW9CLEVBQUU7b0JBQ3BCLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO2lCQUNyRDthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDM0QsWUFBWSxFQUFFLGFBQWE7WUFDM0IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQ3hDLE9BQU8sRUFBRSxjQUFjO1NBQ3hCLENBQUMsQ0FBQztRQUVILDhCQUE4QjtRQUM5QixNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxtQkFBbUIsQ0FDaEQsaUJBQWlCLEVBQ2pCLFVBQVUsQ0FDWCxDQUFDO1FBQ0YscUNBQXFDO1FBRXJDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUM7UUFFSCxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7WUFDaEMsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFNBQVM7U0FDckIsQ0FBQyxDQUFDO1FBRUgsa0JBQWtCLENBQUMsY0FBYyxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLGNBQWMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsWUFBWTtTQUN4QixDQUFDLENBQUM7UUFFSCxNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN0RCxTQUFTLEVBQUUsY0FBYztZQUN6QixZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTTthQUMvQjtTQUNGLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9ELElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3RDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFuRUQsOEJBbUVDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbi8vIGltcG9ydCAqIGFzIHNxcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSBcIkBhd3MtY2RrL2F3cy1hcHBzeW5jXCI7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIGRkYiBmcm9tIFwiQGF3cy1jZGsvYXdzLWR5bmFtb2RiXCI7XG5pbXBvcnQgKiBhcyBjbG91ZGZyb250IGZyb20gXCJAYXdzLWNkay9hd3MtY2xvdWRmcm9udFwiO1xuaW1wb3J0ICogYXMgb3JpZ2lucyBmcm9tIFwiQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnQtb3JpZ2luc1wiO1xuaW1wb3J0ICogYXMgczMgZnJvbSBcIkBhd3MtY2RrL2F3cy1zM1wiO1xuaW1wb3J0ICogYXMgczNkZXBsb3kgZnJvbSBcIkBhd3MtY2RrL2F3cy1zMy1kZXBsb3ltZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBBcHAxU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gVGhlIGNvZGUgdGhhdCBkZWZpbmVzIHlvdXIgc3RhY2sgZ29lcyBoZXJlXG5cbiAgICAvLyBleGFtcGxlIHJlc291cmNlXG4gICAgLy8gY29uc3QgcXVldWUgPSBuZXcgc3FzLlF1ZXVlKHRoaXMsICdBcHAxUXVldWUnLCB7XG4gICAgLy8gICB2aXNpYmlsaXR5VGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzAwKVxuICAgIC8vIH0pO1xuICAgIGNvbnN0IGFwaSA9IG5ldyBhcHBzeW5jLkdyYXBocWxBcGkodGhpcywgXCJHUkFQSFFMX0FQSVwiLCB7XG4gICAgICBuYW1lOiBcInRvZG8tYXBpXCIsXG4gICAgICBzY2hlbWE6IGFwcHN5bmMuU2NoZW1hLmZyb21Bc3NldChcImdyYXBoUUwvc2NoZW1hLmdxbFwiKSwgLy8vUGF0aCBzcGVjaWZpZWQgZm9yIGxhbWJkYVxuICAgICAgYXV0aG9yaXphdGlvbkNvbmZpZzoge1xuICAgICAgICBkZWZhdWx0QXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBhcHBzeW5jLkF1dGhvcml6YXRpb25UeXBlLkFQSV9LRVksIC8vL0RlZmluaW5nIEF1dGhvcml6YXRpb24gVHlwZVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZG9MYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiVG9kb0Z1bmN0aW9uXCIsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogXCJ0b2RvSGFuZGxlclwiLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsIC8vL3NldCBub2RlanMgcnVudGltZSBlbnZpcm9ubWVudFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KFwiZnVuY3Rpb25zXCIpLCAvLy9wYXRoIGZvciBsYW1iZGEgZnVuY3Rpb24gZGlyZWN0b3J5XG4gICAgICBoYW5kbGVyOiBcIm1haW4uaGFuZGxlclwiLCAvLy9zcGVjZmljIGZ1Y250aW9uIGluIHNwZWNpZmljIGZpbGVcbiAgICB9KTtcblxuICAgIC8vLy9TZXQgbGFtYmRhIGFzIGEgZGF0YXNvdXJjZVxuICAgIGNvbnN0IGxhbWJkYV9kYXRhX3NvdXJjZSA9IGFwaS5hZGRMYW1iZGFEYXRhU291cmNlKFxuICAgICAgXCJsYW1kYURhdGFTb3VyY2VcIixcbiAgICAgIHRvZG9MYW1iZGFcbiAgICApO1xuICAgIC8vL0Rlc2NyaWJpbmcgcmVzb2x2ZXIgZm9yIGRhdGFzb3VyY2VcblxuICAgIGxhbWJkYV9kYXRhX3NvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxuICAgICAgZmllbGROYW1lOiBcImdldFRvZG9zXCIsXG4gICAgfSk7XG5cbiAgICBsYW1iZGFfZGF0YV9zb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJhZGRUb2RvXCIsXG4gICAgfSk7XG5cbiAgICBsYW1iZGFfZGF0YV9zb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJkZWxldGVUb2RvXCIsXG4gICAgfSk7XG5cbiAgICBsYW1iZGFfZGF0YV9zb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJ1cGRhdGVUb2RvXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2Rvc1RhYmxlID0gbmV3IGRkYi5UYWJsZSh0aGlzLCBcIkNES1RvZG9zVGFibGVcIiwge1xuICAgICAgdGFibGVOYW1lOiBcIjEzQVRvZG90YWJsZVwiLFxuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6IFwiaWRcIixcbiAgICAgICAgdHlwZTogZGRiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0b2Rvc1RhYmxlLmdyYW50RnVsbEFjY2Vzcyh0b2RvTGFtYmRhKTtcbiAgICB0b2RvTGFtYmRhLmFkZEVudmlyb25tZW50KFwiVE9ET1NfVEFCTEVcIiwgdG9kb3NUYWJsZS50YWJsZU5hbWUpO1xuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiU3RhY2sgUmVnaW9uXCIsIHtcbiAgICAgIHZhbHVlOiB0aGlzLnJlZ2lvbixcbiAgICB9KTtcbiAgfVxufVxuIl19