import React from "react";
import Header from "../components/header";
import { graphql, navigate } from "gatsby";
import './style.css'
import styled from "styled-components"
import gql from "graphql-tag"
import { useSubscription } from "react-apollo-hooks"
import {Box, Grid} from '@material-ui/core'


const GET_CLASSES = gql`
    subscription {
        class {
        class_id
        class_name
        date_created
        }
    }
`


const Container = styled.div`
    div > div.banner-msg {
    }
`
const style = {
    body: {
      minHeight: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  };



function Cohorts(props) {
  const { data, loading } = useSubscription(GET_CLASSES, {
    suspend: false,
  })
  
  if(loading){
    return <p>Loading</p>
  }

  if(!props.location.state) {
    navigate('/sign-in/')
  }
  const dataInfo = data.class
  return (
    <Box>
      {props.location.state ? (
        <Box>
          <Header classList={data.class} user={props.location.state} />
          <div className="banner-msg" style={style.body}>
            <h1>Select a cohort to enter classroom</h1>
            <Grid container style={{border: '1px solid black'}} >
              { 
                 dataInfo.map((data)=>(
                   <Grid item key={data.class_id}>
                     {data.class_name}
                   </Grid>
                 ))
              }
            </Grid>
          
          </div>
        </Box>
      ) : null}
    </Box>
  );
}

export const query = graphql`
  query {
    demo {
      class {
        class_name
        class_id
        date_created
      }
    }
  }
`;

export default Cohorts;
