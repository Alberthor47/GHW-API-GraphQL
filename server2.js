var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")
var { ruruHTML } = require("ruru/server")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    notHello: String
    me: Human
  }

  type Human {
    name: String
    age: Int
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return "Hello world!"
  },
  notHello() {
    return "Not hello world!"
  },
  me() {
    return {
      name: "Alberto Camarena",
      age: 25
    }
  }
}

var app = express()

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")