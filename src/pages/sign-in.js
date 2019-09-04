import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { navigate } from "gatsby";
import axios from "axios";
import { Dialog, Button } from "@material-ui/core";
import gql from "graphql-tag";
import { useSubscription } from "react-apollo-hooks";
import logo from "../assets/logo-cropped.png";
import Grid from "@material-ui/core/Grid";
import "./style.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
`;

const SignIn = () => {
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
  const signInMsg = () => toast.success('🐨: Logged in!')
  const introduceCody = () => toast.info('🐨: Hi my name is Cody the Koala and I will be your guide! ')
  const { data } = useSubscription(GET_USERS, {
    suspend: false
  });



  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});

  const signUp = type => {
    const profile = user;
    setTimeout(() => {
      setModal(false);
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
      };
      const options = {
        headers: {
          "x-hasura-admin-secret":
            process.env.GATSBY_HASURA_GRAPHQL_ADMIN_SECRET
        }
      };

      axios
        .post(
          "https://hasura-gatsby-demo.herokuapp.com/v1/graphql",
          body,
          options
        )
        .then(res => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            localStorage.setItem("handraise", res.accessToken);
            //localStorage.setItem("info", res.)
            navigate("/cohorts/", {
              state: profile
            });
          }
        });
    }, 100);
  };

  const responseGoogle = res => {
    var found = null;
    found = data.users.find(user => user.googleId === res.profileObj.googleId)
    if(found) {
      localStorage.setItem("currUser", res.profileObj.name)
      signInMsg()
      setTimeout(introduceCody(), 6000)
      navigate('/cohorts', {
        state: found
      });
    } else {
      setUser(res.profileObj);
      setModal(true);
    }
  };

  return (
    <Grid container className="containerSignIn">
      <Grid item className="itemSignIn">
        <img src={logo} alt="logo" />
        <div className="textSignIn">
          <p className="signupSignIn">Sign In</p>
          <p>Use Your Google Account</p>
        </div>
        <GoogleLogin
          className="LoginSignIn"
          clientId="516160884998-hmnadbna7mhmop6676mg15sandeg5v77.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
         <Dialog open={modal} onClose={()=>setModal(false)}>
          <div>
            <Button onClick={()=>{
              signUp('student')
            }}>Students</Button>
            <Button onClick={()=>{
              signUp('mentor')
            }}>Mentors</Button>
          </div>
        </Dialog>

      </Grid>
    </Grid>
  );
};

export default SignIn;
