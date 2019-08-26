import React from 'react'
import Grid from '@material-ui/core/Grid'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import { navigate } from 'gatsby'
import { GoogleLogout } from 'react-google-login'
import axios from 'axios'

const style = {
    con: {
        padding: '20px',
        backgroundColor: '#333',
        color: 'white',
    }
}

const handleClassChange = (val, user) => {
    if(val==="null"){
        navigate('/cohorts', { state: user})
    }else{
        navigate(`/cohorts/${val}`, { state: user})
    }
}

export default ({classList, user, id, help}) => {
    const needHelp = () => {
        const body = {
            query: `
            mutation {
                insert_queue(objects: {class_id: "${id}", status: "need help", user_id: "${user.googleId}"}) {
                    returning {
                    id
                    }
                }
            }`
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
        <div >
            <Grid container style={style.con} >
                <Grid item xs={4}>
                    <select style={{maxWidth: 200}} onChange={e=>handleClassChange(e.target.value, user)}>
                        <option value="null" >Select Cohort</option>
                       { 
                        classList.map(c => (
                            <option key={c.class_id} value={c.class_id} selected={c.class_id===id}
                            >
                                {c.class_name}
                            </option>
                        ))
                        }
                    </select>
                </Grid>
                <Grid item xs={4} style={{textAlign: 'center'}}>
                    Hello {user.name}!
                    <span>
                        {(!help && id) ?
                            <button onClick={needHelp}>I need help!</button>
                        : help ? null 
                        : id ? <button onClick={needHelp}>I need help!</button> : null
                        }
                    </span>
                </Grid>
                <Grid item xs={4} style={{textAlign: 'right'}}>
                <GoogleLogout
                    clientId="28861163542-su8up622bc6br2c077qgaqp380g4m9k3.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={(e)=> navigate("/sign-in")}
                    render={renderProps => (
                        <LogoutIcon onClick={renderProps.onClick} disabled={renderProps.disabled}></LogoutIcon>
                      )}
                    >
                </GoogleLogout>
                </Grid>
            </Grid>
        </div>
    )
}
