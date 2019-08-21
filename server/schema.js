const axios = require('axios');
const _= require('lodash');
const {
    GraphQLObjectType, 
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
} = require('graphql');

//? Dummy data
var users = [
    {username: 'username1',password: 'password1', email: 'user1@email',uid: '1'},
    {username: 'username2',password: 'password2', email: 'user2@email',uid: '2'},
    {username: 'username3',password: 'password3', email: 'user3@email',uid: '3'},
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        uid: {type: GraphQLID},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        email: {type: GraphQLString}
    })
});

//? Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: { 
            type: UserType,
            args: {uid:{type: GraphQLID}},
            resolve(parent,args){
            return _.find(users,{uid:args.uid});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})