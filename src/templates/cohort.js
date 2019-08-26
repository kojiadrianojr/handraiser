import React from "react";
import { graphql, navigate } from "gatsby";
import Header from "../components/header";
import Student from "../components/student";
import Mentor from "../components/mentor";
import gql from "graphql-tag";
import { useSubscription } from "react-apollo-hooks";
import styled from "styled-components";

const Container = styled.div`
    border: 1px dotted red;
    height: 100%;
    div > div {
        boder: 1px dotted red;
    }
`;

const GET_USERS = gql`
  subscription {
    queue {
      class {
        class_id
        class_name
        date_created
      }
      user {
        email
        familyName
        givenName
        googleId
        imageUrl
        name
        type
      }
      status
    }
  }
`;

export default function Cohort(props) {

  if(!props.location.state) {
    navigate('/sign-in/')
  }

  const { data, loading } = useSubscription(GET_USERS, {
    suspend: false
  });
  if (loading) {
    return <p>Loading</p>;
  }
  const cohort = props.data.demo.class_by_pk;
  const queueData = data.queue.filter(
    q => q.class.class_id === cohort.class_id
  );
  const found = queueData.find(
    que => que.user.googleId === props.location.state.googleId
  );
  return (
    <div>
      <Header
        classList={props.data.demo.class}
        user={props.location.state}
        id={cohort.class_id}
        help={found}
      />
      <Container>
        {props.location.state.type === "student" ? (
          <Student queueData={queueData} user={props.location.state} />
        ) : (
          <Mentor queueData={queueData} user={props.location.state} />
        )}
      </Container>
    </div>
  );
}

export const query = graphql`
  query cohortQuery($id: Int!) {
    demo {
      class {
        class_id
        class_name
        date_created
      }
      class_by_pk(class_id: $id) {
        class_id
        class_name
        date_created
      }
    }
  }
`;
