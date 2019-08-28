import React from "react";
import { graphql, navigate } from "gatsby";
import Header from "../components/header";
import Student from "../components/student";
import Mentor from "../components/mentor";
import gql from "graphql-tag";
import { useSubscription } from "react-apollo-hooks";
import styled from "styled-components";
import CircularProgress from '@material-ui/core/CircularProgress';
import CohortClass from "../components/cohortclass";
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';

const Container = styled.div`
    div > div.banner-msg {
        min-height: 300px;
        position: relative;
        top: 50px;
    }
`;

const Body = styled.div`
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cohort(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClassChange(val, user) {
    setOpen(false);
    if(val==="null"){
        navigate('/cohorts', { state: user})
    }else{
        navigate(`/cohorts/${val}`, { state: user})
    }
  }

  if(!props.location.state) {
    navigate('/sign-in/')
  }

  const { data, loading } = useSubscription(GET_USERS, {
    suspend: false
  });
  if (loading) {
    return <CircularProgress />;
  }
  const cohort = props.data.demo.class_by_pk;
  const queueData = data.queue.filter(
    q => q.class.class_id === cohort.class_id
  );
  const found = queueData.find(
    que => que.user.googleId === props.location.state.googleId
  );
  return (
    <Container>
      <Header
        classList={props.data.demo.class}
        user={props.location.state}
        id={cohort.class_id}
        help={found}
        handleClickOpen={handleClickOpen}
      />
      <Body>
        <div className="banner-msg">
          {props.location.state.type === "student" ? (
            <Student queueData={queueData} user={props.location.state} />
          ) : (
            <Mentor queueData={queueData} user={props.location.state} />
          )}
        </div>
      </Body>
      <Dialog fullScreen open={open} onClose={handleClose}  TransitionComponent={Transition}>
        <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <CohortClass
          handleClassChange={handleClassChange}
          classList={props.data.demo.class}
          user={props.location.state}
        />
      </Dialog>
    </Container>
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
