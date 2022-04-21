import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { getBinData } from '../components/apipath';
import { Grid } from '@material-ui/core';
//import DashboardCard from '../comps/DashboardCard';
//import './MatchSmallCard.css';
import { BasicTable } from '../components/BasicTable';
//import { Maps } from './Maps';
//import Post from '../components copy/Post';
import GoogleMaps from '../components/GoogleMaps';



// Hook API
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),

    }, 
    card: {}
}))

const BinTable = () => {
    const classes = useStyles()
    const [bins, setBins] = useState([]);

    useEffect(
        () => {
            getBinData().then(response => {
                setBins(response);
                // console.log(response)
            })
            return () => {
                //console.log("Done")
            }
        }, [])

    // const totalBins = bins.length;
    // const filledBins = bins.filter(function (bin) { return bin.full_alarm === 1 }).length;
    // const lowBattBins = bins.filter(function (bin) { return bin.battery_alarm === 1 }).length;
    // const fireBins = bins.filter(function (bin) { return bin.fire_alarm === 1 }).length;
    // const abnormalBins = bins.filter(function (bin) { return bin.height === 99 || bin.height === 9999 }).length;


    return (
        <Container className={classes.container}>
            {/* <Post /> */}
            <div className='match-detail-section'>
                <Grid>
                    <Grid item xs={12}>
                        <GoogleMaps maptype='cluster' />
                    </Grid>
                </Grid>
            </div>

            {/* <div className="Map"><GoogleMaps bins={bins} /></div> */}


        </ Container>
    );
}

export default BinTable;
