import React from 'react';
import {HeaderStyle, DividerHead} from '../css/style';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class Header extends React.Component {
    constructor() {
        super();

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
                        <MenuItem>Hesus Iscariot</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </Menu>
                </HeaderStyle>
            </AppBar>
        )
    }
}