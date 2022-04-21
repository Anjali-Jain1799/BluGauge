import { Container } from '@material-ui/core';
import React from 'react';
import TruckOne from '../comps/VehicleCards/TruckOne.js';
import TruckTwo from '../comps/VehicleCards/TruckTwo.js';
import TruckThree from '../comps/VehicleCards/TruckThree.js';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        borderRadius: '20px',
        paddingTop: '100px',
        marginLeft: 0,
        borderLeft: 0,
        width: '100wh'
    }
})

const Vehicle = () => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} lg={4}>
                                <TruckOne />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <TruckTwo />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <TruckThree />
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </Container >
    )
}

export default Vehicle;