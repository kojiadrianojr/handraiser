import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Header from "./header";
import { graphql, navigate } from "gatsby";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  BoxMain,
  BoxCont,
  SearchBoxNav,
  MainContainer,
  ResultNav
} from "../style/cohortDesign";
import ReactLoading from "react-loading";

export default class CohortClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <MainContainer>
          <ResultNav>
            <Typography variant="caption">
              About {this.props.classList.length} results.
            </Typography>
          </ResultNav>
          <BoxMain>
            {/*
                            If the result/data is empty
                            <Typography variant="h4" style={{color: '#1f1e1c'}}>Empty!</Typography> 
                        */}
            {/* 
                            If the result/data is loading
                            <CircularProgress />
                        */}
            {this.props.classList.map(x => {
              return (
                <BoxCont
                  key={x.class_id}
                  onClick={e =>
                    this.props.handleClassChange(x.class_id, this.props.user)
                  }
                >
                  <Typography variant="h6">{x.class_name}</Typography>
                </BoxCont>
              );
            })}
          </BoxMain>
        </MainContainer>
      </React.Fragment>
    );
  }
}
