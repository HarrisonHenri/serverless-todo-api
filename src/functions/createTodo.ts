import { document } from "src/utils/dynamodbClient";
import {v4} from "uuid"

interface IEventBody {
  title: string;
  deadline: string;
}

interface IEventPathParameters {
  user_id: string;
}

export const handle = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as IEventBody;
  const { user_id } = event.pathParameters as IEventPathParameters;

  await document.put({
    TableName: "todoList",
    Item: {
      id: v4(),
      title,
      user_id,
      done:false,
      deadline: new Date(deadline).toISOString()
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo successfully added"
    }),
    headers: {
      "Content-type": "application/json"
    }
  }
}