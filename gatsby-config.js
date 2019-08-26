require("dotenv").config()
const fetch = require("isomorphic-fetch")
const { createHttpLink } = require("apollo-link-http")

module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "hasura",
        fieldName: "demo",
        createLink: () => {
          return createHttpLink({
            uri:
              "https://hasura-gatsby-demo.herokuapp.com/v1/graphql",
            headers: {
              "x-hasura-admin-secret":
                process.env.GATSBY_HASURA_GRAPHQL_ADMIN_SECRET,
            },
            fetch,
          })
        },
      },
    },
  ],
}
