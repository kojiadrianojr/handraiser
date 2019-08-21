import React from "react";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {BoxMain} from "../style/cohortDesign"


export default class CohortClass extends React.Component {

    render() {
        return (
            <React.Fragment>
                <BoxMain>
                    <Box width="200px">
                        <Paper>
                            <h1>Spring Cohort</h1>
                        </Paper>
                    </Box>
                    <Box width="200px">
                        <Paper>
                            <h1>Test</h1>
                        </Paper>
                    </Box>
                    <Box width="200px">
                        <Paper>
                            <h1>Test</h1>
                        </Paper>
                    </Box>
                    <Box width="200px">
                        <Paper>
                            <h1>Test</h1>
                        </Paper>
                    </Box>
                </BoxMain>
            </React.Fragment>
        )
    }
}