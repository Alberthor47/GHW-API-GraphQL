# Built an API with GraphQL

## Part 1

### Install Node

You can find install instructions [here](https://nodejs.org/en)

### Check instalation

Run ``` node -v ``` in your terminal to check if node is installed

### Create a new project

Run ``` npm init -y ``` to create a new project

### Check your project

Look for the package.json file in your project folder

### Install GraphQL as a node package

Run ``` npm install graphql --save ``` and check package.json dependencies

### Create a new server.js file

Create a new file called server.js in your project folder

### Import GraphQL and create a schema that defines the queries with QueryType

```javascript
const { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)
 
// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello() {
    return "Hello world!"
  }
}
 
// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ hello }",
  rootValue
}).then(response => {
  console.log(response)
})
```

### Run your server

Run ``` node server.js ``` in your terminal.
This will print the response of the query to the console.
This is the 'Hello world!' query in GraphQL.

## Part 2: Adding Express

### Install Express and other dependencies

Run ``` npm install express graphql-http ruru --save ```

### Modify server.js to use Express

```javascript
var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")
var { ruruHTML } = require("ruru/server")
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)
 
// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return "Hello world!"
  },
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
```

### Run your server with express

Run ``` node server.js ``` in your terminal.
This will start the server and print the message 'Running a GraphQL API server at <http://localhost:4000/graphql>'
