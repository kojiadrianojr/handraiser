import React from "react";
import Header from "../components/header";
import { graphql, navigate } from "gatsby";
import './style.css'
import styled from "styled-components"

const Container = styled.div`
    div > div.banner-msg {
        height: 100%;
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

  if(!props.location.state) {
    navigate('/sign-in/')
  }

  return (
    <Container>
      {props.location.state ? (
        <div className="container" >
          <Header
            classList={props.data.demo.class}
            user={props.location.state}
          />
          <div className="banner-msg" style={style.body}>
            <h1>Select a cohort to enter classroom</h1>
          </div>
        </div>
      ) : null}
    </Container>
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
