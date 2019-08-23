const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('./schema');
const jwt = require('express-jwt');

const app = express();
app.use(express.json());

const authMiddleware = jwt({
    secret: '53cR3tc0d34AnDr@i53r'
})
app.use(authMiddleware)

app.use('/graphql', graphQLHTTP(req => ({
    schema,
    graphiql: true,
    context: {
        user: req.user
    }
})));

const PORT = 3000;
app.listen(PORT, ()=>{
   console.log(`
    +++++++++++++++++++++++++++++++
    Now listening (/◕ヮ◕)/ @ ${PORT}
    +++++++++++++++++++++++++++++++
    `)
});





