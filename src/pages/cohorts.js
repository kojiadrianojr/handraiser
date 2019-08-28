import React from "react";
import Header from "../components/header";
import CohortClass from "../components/cohortclass";
import { graphql, navigate } from "gatsby";
import './style.css';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import gql from "graphql-tag";
import { useSubscription } from "react-apollo-hooks";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Box, Grid} from '@material-ui/core'

const GET_CLASSES = gql`
    subscription {
        class {
        class_id
        class_name
        date_created
        }
    }
`;


const Container = styled.div`
    div > div.banner-msg {
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        top: 50px;
    }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Cohorts(props) {
  const [open, setOpen] = React.useState(false);
  const { data, loading } = useSubscription(GET_CLASSES, {
    suspend: false,
  })
  
  if(loading){
    return <CircularProgress />;
  }


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
  const dataInfo = data.class
  return (
    <Box>
      {props.location.state ? (
        <div>
          <Header
            classList={props.data.demo.class}
            user={props.location.state}
            handleClickOpen={handleClickOpen}
          />
          <div className="banner-msg">
            <Typography variant="h4">Select a cohort.</Typography>
          </div>
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
        </div>
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
