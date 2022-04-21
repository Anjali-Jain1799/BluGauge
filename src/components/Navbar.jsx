import { AppBar, Badge, Toolbar, Typography } from '@material-ui/core'; // Avatar,
import { makeStyles } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
//import { alpha } from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './apipath';


// Hook API
const useStyles = makeStyles(() => ({
    // mediaquery like things
    // works for both long and short devices
    logolg: {
        display: "none",
        // [theme.breakpoints.up("sm")]: {
        //     display: "block",

    },
    logosm: {
        display: "block",
        // [theme.breakpoints.up("sm")]: {
        //     display: "none",

    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    input: {
        color: "white",
        marginLeft: '4px'
    },
    appbar:{
       background:'rgba(255, 255, 255, 0.8)'
    },
    icons: {
        display: "flex",
        alignItems: "center",
        color:'#78909c'
    },
    badge: {
        marginRight: '20px'
    }
}))

const Navbar = () => {
    const classes = useStyles()
    const [name, setName] = useState({});

    useEffect(
        () => {
            getCurrentUser().then(response => {
                setName(response);
                //console.log(response);
            })
        },[ ]
    )
    return (
        <AppBar position='fixed' className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.logolg}>
                    {name.name}
                </Typography>
                <Typography variant="h5" className={classes.logosm}>
                    {name.name}
                </Typography>
                {/* <div className={classes.search}>
                    <Search className={classes.searchButton} />
                    <InputBase placeholder="Search ..." className={classes.input} />
                </div> */}
                <div className={classes.icons}>
                    {/* <Search className={classes.searchButton} /> */}
                    <Badge badgeContent={4} color='secondary' className={classes.badge}>
                        <Notifications />
                    </Badge>
                    {/* <Avatar alt='Remy Sharp' className={classes.icons}></Avatar> */}
                </div>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
