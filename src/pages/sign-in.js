import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { navigate } from 'gatsby'
import axios from 'axios'
import { Dialog, Button } from '@material-ui/core'
import gql from "graphql-tag"
import { useSubscription } from "react-apollo-hooks"

const GET_USERS = gql`
  subscription {
    users {
      name
      imageUrl
      googleId
      givenName
      familyName
      email
      type
    }
  }
`

const SignIn = () => {
  const { data } = useSubscription(GET_USERS, {
    suspend: false,
  })

  const [modal, setModal] = useState(false)
  const [user, setUser] = useState({})

  const signUp = (type) => {
    const profile = user
    setTimeout(() =>{
      setModal(false)
      const body = {
        query: `
          mutation {
            insert_users(objects: {
              googleId: "${profile.googleId}", 
              email: "${profile.email}", 
              familyName: "${profile.familyName}", 
              givenName: "${profile.givenName}", 
              name: "${profile.name}",  
              imageUrl: "${profile.imageUrl}"
              type: "${type}"
            }) 
            {
              returning {
                name
                imageUrl
                googleId
                givenName
                familyName
                email
                type
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
        .then(res => {
          if(res.data.errors){
            console.log(res.data.errors)
          } 
          else {
            localStorage.setItem('handraise', res.accessToken)
            navigate('/cohorts/', {
              state: profile
            })
          }
        })
    }, 100)
  }

  const responseGoogle = (res) => {

    var found = null;
    found = data.users.find(user => user.googleId === res.profileObj.googleId)
    if(found) {
      navigate('/cohorts', {
        state: found
      })
    } else {
      setUser(res.profileObj)
      setModal(true)
    }
  }



  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 180
    }}>
      <h1>Handraise</h1>
      <GoogleLogin 
        clientId="28861163542-su8up622bc6br2c077qgaqp380g4m9k3.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <Dialog open={modal} onClose={()=>setModal(false)}>
        <div>
          <Button onClick={()=>{
            signUp('student')
          }}>Student</Button>
          <Button onClick={()=>{
            signUp('mentor')
          }}>Mentor</Button>
        </div>
      </Dialog>
    </div>
  )
}

export default SignIn