//import React, { useEffect, useState } from "react";
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
//import { fontFamily, textAlign } from '@mui/system';
import React from 'react';
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";// import "./MatchSmallCard.css";

const useStyles = makeStyles({
    root: {
        height: '150px',
        width: '140px',
        cursor: 'pointer',
        background: 'linear-gradient(45deg, #dcedc8 30%, #c8e6c9 90%)',
        boxShadow: '5px 10px 20px #c8e6c9',
        borderRadius: '15px'
    },
    content: {
        textAlign: 'center',
        marginTop: '20px'
    },
    title: {
        fontWeight: '500',
        fontSize: '15px',
        fontFamily: 'Jost, sans-serif',
        color: '#33691e',
        marginTop: 0
    },
    number: {
        fontWeight: '800',
        fontSize: '25px',
        fontFamily: 'Jost, sans-serif',
        color: '#33691e',
        marginBottom: 0

    },
    icon: {
        color: '#33691e',
        height: 38,
        width: 38,
    }

})

const UnfilledBinsCard = ({ title, num }) => {
    // const [num, setNum] = useState(num);
    // const [title, setTitle] = useState(title)


    const classes = useStyles();
    
    return (
        <Card className={classes.root}
        // bordered={false}
        // bodyStyle={{ padding: 10 }}
        >
            <div className={classes.content} >
                <DeleteOutlineIcon className={classes.icon} />
                <p className={classes.number} > {num} </p>
                <p className={classes.title}> {title || { title }}</p>
            </div>
        </Card >
    )

}

export default UnfilledBinsCard;
