import React from "react";
import Header from "../components/header";
import CohortClass from "../components/cohortclass";
import { graphql, navigate } from "gatsby";
import './style.css'
import styled from "styled-components";

const Container = styled.div`
    div > div.banner-msg {
        position: relative;
        top: 30px;
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
            <CohortClass 
              classList={props.data.demo.class}
              user={props.location.state}
            />
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
