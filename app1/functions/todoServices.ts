const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import Todo from "./model";

type Params = {
  TableName: string | undefined;
  Key: string | {};
  ExpressionAttributeValues: any;
  ExpressionAttributeNames: any;
  UpdateExpression: string;
  ReturnValues: string;
};

export async function getTodos() {
  const params = {
    TableName: process.env.TODOS_TABLE,
  };
  try {
    const data = await docClient.scan(params).promise();
    return data.Items;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}

export async function addTodo(todo: Todo) {
  const params = {
    TableName: process.env.TODOS_TABLE,
    Item: todo,
  };
  try {
    await docClient.put(params).promise();
    return todo;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}

export async function updateTodo(todo: any) {
  let params: Params = {
    TableName: process.env.TODOS_TABLE,
    Key: {
      id: todo.id,
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW",
  };
  let prefix = "set ";
  let attributes = Object.keys(todo);
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    if (attribute !== "id") {
      params["UpdateExpression"] +=
        prefix + "#" + attribute + " = :" + attribute;
      params["ExpressionAttributeValues"][":" + attribute] = todo[attribute];
      params["ExpressionAttributeNames"]["#" + attribute] = attribute;
      prefix = ", ";
    }
  }

  try {
    await docClient.update(params).promise();
    return todo;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}

export async function deleteTodo(todoId: string) {
  const params = {
    TableName: process.env.TODOS_TABLE,
    Key: {
      id: todoId,
    },
  };
  try {
    await docClient.delete(params).promise();
    return todoId;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}
