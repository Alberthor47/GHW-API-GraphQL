const { graphql, buildSchema } = require('graphql');

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

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
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

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ hello, notHello, me { name, age } }",
  rootValue
}).then(response => {
  console.log(response)
})