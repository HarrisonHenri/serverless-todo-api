export const handle = async (event)=>({
  statusCode:200,
  body: JSON.stringify({
    message: "Hello world"
  }),
  headers: {
    "Content-Type": "application/json"
  }
})