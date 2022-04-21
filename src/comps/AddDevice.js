import { Container } from '@material-ui/core';
import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddBin from '../comps/AddDevice/AddBin.js'

const useStyles = makeStyles({
    container: {
        borderRadius: '20px',
        paddingTop: '100px',
        marginLeft: 0,
        borderLeft: 0,
        width: '100wh'
    }
})

const AddDevice = () => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AddBin />
                </Grid>
            </Grid>
        </Container >
    )
}

export default AddDevice;