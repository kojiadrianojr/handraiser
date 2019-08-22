import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import {BoxMain, BoxCont, SearchBoxNav, MainContainer, ResultNav} from "../style/cohortDesign";


export default class CohortClass extends React.Component {

    render() {
        return (
            <React.Fragment>
                <MainContainer>
                    <SearchBoxNav>
                        <Paper style={{
                            padding: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '400px'
                        }}>
                            <IconButton style={{padding: '10px'}} aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <InputBase
                                style={{marginLeft: 8, flex: 1}}
                                placeholder="Search Cohort Class"
                            />
                            <IconButton style={{padding: '10px'}} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider style={{height: 28, margin: 4}} orientation="vertical" />
                        </Paper>
                    </SearchBoxNav>
                    <ResultNav>
                        <Typography variant="caption">
                            About 4 results.
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
                        <BoxCont>
                            <Typography variant="h6">
                                Spring Cohort 2019
                            </Typography>
                        </BoxCont>
                        <BoxCont>
                            <Typography variant="h6">
                                Mecha Cohort 2019
                            </Typography>
                        </BoxCont>
                        <BoxCont>
                            <Typography variant="h6">
                                Jihad Cohort 2019
                            </Typography>
                        </BoxCont>
                        <BoxCont>
                            <Typography variant="h6">
                                Jihad Cohort 2019
                            </Typography>
                        </BoxCont>
                    </BoxMain>
                </MainContainer>
            </React.Fragment>
        )
    }
}

{/* <TextField
                        label="Search field"
                        type="search"
                        margin="normal"
                    /> */}