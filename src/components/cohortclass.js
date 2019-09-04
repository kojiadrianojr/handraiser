import React from "react";
import Typography from '@material-ui/core/Typography';
import {BoxMain, BoxCont, MainContainer, ResultNav} from "../style/cohortDesign";


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
                        {
                            this.props.classList.map(x => {
                                return (
                                    <BoxCont key={x.class_id} onClick={e => this.props.handleClassChange(x.class_id, this.props.user)}>
                                        <Typography variant="h6">
                                            {x.class_name}
                                        </Typography>
                                    </BoxCont>
                                )
                            })
                        }
                    </BoxMain>
                </MainContainer>
            </React.Fragment>
        )
    }
}