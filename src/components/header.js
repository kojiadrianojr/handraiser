import React from 'react';
import {HeaderStyle, DividerHead} from '../css/style';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LogoutIcon from '@material-ui/icons/ExitToApp'
import { navigate } from 'gatsby'
import { GoogleLogout } from 'react-google-login'
import axios from 'axios'

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleMenu: null,
        }
    }

    handleMenu = (event) => {
        this.setState({
            toggleMenu: event.currentTarget,
        })
    }

    handleClose = () => {
        this.setState({
            toggleMenu: null,
        })
    }

    handleClassChange = (val, user) => {
        if(val==="null"){
            navigate('/cohorts', { state: user})
        }else{
            navigate(`/cohorts/${val}`, { state: user})
        }
    }

    needHelp = () => {
        const body = {
            query: `
            mutation {
                insert_queue(objects: {class_id: "${this.props.id}", status: "need help", user_id: "${this.props.user.googleId}"}) {
                    returning {
                    id
                    }
                }
            }`
        }
        const options = {
            headers: {
              "x-hasura-admin-secret":
                process.env.GATSBY_HASURA_GRAPHQL_ADMIN_SECRET,
            },
        }
        axios
            .post('https://hasura-gatsby-demo.herokuapp.com/v1/graphql', body, options)
    }

    render() {
        return (
            <AppBar position="fixed">
                <HeaderStyle>
                    <DividerHead>
                        <Typography style={{float: 'left'}} variant="h6" color="inherit">
                            Handraiser
                        </Typography>
                    </DividerHead>
                    <IconButton onClick={this.handleMenu} style={{float: 'right'}} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={this.state.toggleMenu} 
                        keepMounted 
                        open={Boolean(this.state.toggleMenu)} 
                        onClose={this.handleClose}
                    >
                        <MenuItem>{this.props.user.name}</MenuItem>
                        {(!this.props.help && this.props.id) ?
                                <MenuItem onClick={e => {
                                    this.needHelp()
                                    e.target.setAttribute('disabled', 'true')
                                }}>I need help!</MenuItem>
                            : this.props.help ? null 
                            : this.props.id ? <MenuItem onClick={e => {
                                    this.needHelp()
                                    e.target.setAttribute('disabled', 'true')
                                }}>I need help!</MenuItem>
                            : null
                            }
                        <MenuItem>
                            Select Cohort
                        </MenuItem>
                        <MenuItem>
                            <GoogleLogout
                                clientId="28861163542-su8up622bc6br2c077qgaqp380g4m9k3.apps.googleusercontent.com"
                                buttonText="Logout"
                                onLogoutSuccess={(e)=> navigate("/sign-in")}
                                render={renderProps => (
                                    //<LogoutIcon onClick={renderProps.onClick} disabled={renderProps.disabled}></LogoutIcon>
                                    <Typography onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</Typography>
                                )}
                                >     
                            </GoogleLogout>
                        </MenuItem>
                    </Menu>
                </HeaderStyle>
            </AppBar>
        )
    }
}
