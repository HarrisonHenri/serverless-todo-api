import { document } from "src/utils/dynamodbClient";
import {v4} from "uuid"

interface IEventPathParameters {
  user_id: string;
}

export const handle = async (event) => {
  const { user_id } = event.pathParameters as IEventPathParameters;

  const todo = await document.scan({
    TableName: "todoList",
    IndexName: "TodoByUserId",
    FilterExpression: 'user_id = :user_id',
    ExpressionAttributeValues: { ':user_id': user_id},
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(todo.Items),
    headers: {
      "Content-type": "application/json"
    }
  }
}