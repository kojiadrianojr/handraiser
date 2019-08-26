import React from 'react'
import axios from 'axios'

const style = {
    body: {
        minHeight: '200px',
    },
    head: {
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        padding: '10px'
    }
}

export default function Student({queueData, user}) {

    const removeHelp = () => {
        const body = {
            query: `
            mutation {
                delete_queue(where: {user_id: {_eq: "${user.googleId}"}}) {
                  returning {
                    user_id
                  }
                }
              }              
            `
        }
        const options = {
            headers: {
              "x-hasura-admin-secret":
                process.env.GATSBY_HASURA_GRAPHQL_ADMIN_SECRET,
            },
        }
        axios
            .post('https://hasura-gatsby-demo.herokuapp.com/v1/graphql', body, options)
    }

    return (
        <div>
           <div style={style.head}>Need Help</div>
            <div style={style.body}>
                {
                    queueData.map( needHelp => (
                        needHelp.status==='need help' ? 
                            <span key={needHelp.user.googleId}>
                                <p>{needHelp.user.name}</p>
                                {needHelp.user.googleId === user.googleId && <button onClick={removeHelp}>remove</button>}
                            </span>
                        : null
                    ))
                }
            </div>
            <div style={style.head}>Being Helped</div>
            <div style={style.body}>
                {
                    queueData.map( beingHelped => (
                        beingHelped.status==='being helped' ? <p key={beingHelped.user.googleId}>{beingHelped.user.name}</p> : null
                    ))
                }
            </div>
        </div>
    )
}
