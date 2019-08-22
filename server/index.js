var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  }
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("-------------------------------------");
  console.log(`Server listening ( ͡° ͜ʖ ͡°)on port ${PORT}`);
  console.log("-------------------------------------");
});
