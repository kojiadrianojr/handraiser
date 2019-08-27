import React, { useEffect } from "react"
import gql from "graphql-tag"
import { useSubscription } from "react-apollo-hooks"
import { navigate } from 'gatsby'

const GET_USERS = gql`
  subscription {
    users {
      email
      givenName
      familyName
      googleId
      imageUrl
      name
      type
    }
  }
`

const Users = () => {
  const { data, loading, error } = useSubscription(GET_USERS, {
    suspend: false,
  })

  if(loading) {
    return <p>Loading..</p>
  }
  
  if(error) {
    return <pre>{JSON.stringify(error, null, 2)}></pre>
  }

  return (
    <div>
      {data.users.map(user => (
        <h2>{user.name}</h2>  
      ))}
    </div>
  )
}

export default () => {
  useEffect(()=>{
    navigate('/sign-in/')
  }, [])
  return (
    <>
      <Users />
    </>
  )
}
