const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('./schema');
const app = express();


app.use('/graphql', graphQLHTTP({
    schema,
    graphiql: true,
}));

const PORT = 3000;
app.listen(PORT, ()=>{console.log(`Now listening (/◕ヮ◕)/ @ ${PORT}`)})


