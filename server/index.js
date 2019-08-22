const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('./schema');
//const massive = require('massive');


/*massive({
    host: 'localhost',
    port: 5432,
    database: 'handraiser',
    user: 'postgres',
    password: 'handraiser',
}).then(db => { */

    const app = express();
 //   app.set('db', db);
    app.use(express.json());
    app.use('/graphql', graphQLHTTP({
        schema,
        graphiql: true,
    }));

    const PORT = 3000;
    app.listen(PORT, ()=>{
        console.log(`
        +++++++++++++++++++++++++++++++
        Now listening (/◕ヮ◕)/ @ ${PORT}
        +++++++++++++++++++++++++++++++
        `)
    })

//})



