//?const axios = require('axios');
//?const _= require('lodash');

//! Unfinished Scheme for using GraphQL

/**
 * *FORMAT FOR DATABASE URL
 * 
 * @param connectionString = "postgres://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]"
 */
 
const connectionString = "postgres://postgres:handraiser@localhost:5432/handraiser"
const pgp = require('pg-promise')();
const db = {}
db.conn = pgp(connectionString);
const {
    GraphQLObjectType, 
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        uid: {type: GraphQLID},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        image: {type: GraphQLString},
        email: {type: GraphQLString}
    })
});

const ClassesType = new GraphQLObjectType({
    name: 'Classes',
    fields: () => ({
        classes_id: {type: GraphQLID},
        user_id: {type: GraphQLInt},
        class_id: {type: GraphQLInt},
        role_type: {type: GraphQLString},
        date_joined: {type: GraphQLString}
    })
});

const ClassType = new GraphQLObjectType({
    name: 'Class',
    fields: () => ({
        class_id: {type: GraphQLID},
        class_name: {type: GraphQLString},
        date_create: {type: GraphQLString}
    })
})

const QueueType = new  GraphQLObjectType({
    name: 'Queues',
    fields: () => ({
        qid: {type: GraphQLID},
        class_id: {type: GraphQLID},
        student_id: {type: GraphQLID},
        mentor_id: {type: GraphQLID},
        status: {type: GraphQLString}
    })
})

//? Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent,args){
                const query = `SELECT * FROM "users"`;
                return db.conn.many(query)
                .then(data=>{
                    return data;
                })
                .catch(err=>{
                    return 'error is', err
                })
            }
        },
        classes: {
            type: new GraphQLList(ClassesType),
            resolve(parent,args){
                const query = `SELECT * FROM "classes"`;
                return db.conn.many(query)
                .then(data=>{
                    return data
                })
                .catch(err=>{
                    return 'error is', err
                })
            }
        },
        class: {
            type: new GraphQLList(ClassType),
            resolve(parent,args){
                const query = `SELECT * FROM "class"`;
                return db.conn.many(query)
                .then(data=>{
                    return data
                })
                .catch(err=>{
                    return 'error is ', err;
                })
            }
        },
        queues: {
            type: new GraphQLList(QueueType),
            resolve(parent, args){
                const query = `SELECT * FROM "queues"`;
                return db.conn.many(query)
                .then(data=>{
                    return data
                })
                .catch(err=>{
                    return 'error is ', err;
                })
            }
        }
    }
})

//? Mutations
const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addUser:{
            type: UserType,
            args: {
                fname: {type: GraphQLString},
                lname: {type: GraphQLString},
                image: {type: GraphQLString},
                email: {type: GraphQLString},
            },
            resolve(parent,args){
                const query = `INSERT INTO "users" (first_name,last_name,image,email) VALUES('${args.fname}','${args.lname}','${args.image}','${args.email}')`;
                return db.conn.any(query)
                .then(data=>{
                    return 'success!';
                })
                .catch(err=>{
                    return 'error is ', err
                })
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                uid: {type: GraphQLID}
            },
            resolve(parent,args){
                const query = `DELETE FROM users WHERE uid=${args.uid}`
                return db.conn.query(query)
                .catch(err=>{
                    return 'err is ', err
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})