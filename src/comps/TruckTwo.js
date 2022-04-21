import React from 'react';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { FullscreenExit, SingleBed } from '@material-ui/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InfoIcon from '@material-ui/icons/Info';
import Battery90Icon from '@material-ui/icons/Battery90';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Divider from '@material-ui/core/Divider';
import SignalCellular4BarIcon from '@material-ui/icons/SignalCellular4Bar';

const useStyles = makeStyles({
    header: {
        background: '#fafafa',
    },
    truckicon: {
        display: 'flex',
        position: 'inline',
        float: 'right',
    },
    locationicon: {
        display: 'flex',
        position: 'inline',
        float: 'left'
    },
    infoicon: {
        display: 'flex',
        position: 'inline',
        float: 'left'
    },
    batteryicon: {
        display: 'flex',
        position: 'inline',
        float: 'left'
    },
    battery: {
        display: 'flex',
        position: 'inline',
        float: 'left'
    },
    signalicon: {
        display: 'flex',
        position: 'inline',
        float: 'left'
    },
    signal: {
        display: 'flex',
        position: 'inline',
        float: 'left'
    },
    keyicon: {
        display: 'flex',
        position: 'inline',
        float: 'left'
    },
    key: {
        display: 'flex',
        position: 'inline',
        float: 'left'
    }
})


const TruckTwo = () => {

    const classes = useStyles();

    return (
        <Card>
            <div className={classes.header}>
                <LocalShippingIcon className={classes.truckicon} />
                <h5>truck</h5>
            </div>
            <div className={classes.location}>
                <LocationOnIcon className={classes.locationicon} />
                <p>location</p>
                <p>date, time</p>
            </div>
            <div className={classes.speed}>
                <InfoIcon className={classes.infoicon} />
                <p>0 kmph | stopped since:   | distance travelled today</p>
            </div>
            <Divider />
            <div>
                <Battery90Icon className={classes.batteryicon} />
                <p className={classes.battery}>100%</p>
                <SignalCellular4BarIcon className={classes.signalicon} />
                <p className={classes.signal}>100%</p>
                <VpnKeyIcon className={classes.keyicon} />
                <p className={classes.key}>Off</p>
            </div>
        </Card >
    )
}

export default TruckTwo;