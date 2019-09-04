import React from "react";
import Header from "../components/header";
import CohortClass from "../components/cohortclass";
import { graphql, navigate } from "gatsby";
import "./style.css";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import gql from "graphql-tag";
import { useSubscription } from "react-apollo-hooks";
import Loader from "react-loader-spinner";
//import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Grid } from "@material-ui/core";
import { borderRadius } from "@material-ui/system";


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
    suspend: false
  });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          height: "100vh"
        }}
      >
        <Loader type="BallTriangle" color="#3e51b5" height={80} width={80} />
      </div>
    );
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClassChange(val, user) {
    setOpen(false);
    if (val === "null") {
      navigate("/cohorts", { state: user });
    } else {
      navigate(`/cohorts/${val}`, { state: user });
    }
  }

  if (!props.location.state) {
    navigate("/sign-in/");
  }
  const dataInfo = data.class;
  return (
    <Box>
      {props.location.state ? (
        <div>
          <Header
            classList={props.data.demo.class}
            user={props.location.state}
            handleClickOpen={handleClickOpen}
          />
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <CohortClass
              handleClassChange={handleClassChange}
              classList={props.data.demo.class}
              user={props.location.state}
            />
          </Dialog>
          <div
            style={{
              display: "flex",
              height: "90vh",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "whitesmoke"
            }}
          >
            <img
              src={props.location.state.imageUrl}
              style={{
                borderRadius: "50%",
                margin: "16px"
              }}
            />
            <Typography variant="h4" color="inherit">
              {props.location.state.name}
            </Typography>
            <Typography variant="h6" color="inherit">
              {props.location.state.type}
            </Typography>
          </div>

          {console.log(props.location.state)}
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
