import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import React from "react";
import { Grid } from "@material-ui/core";
import TotalBinsCard from "../components/TotalBinsCard";
import OverfilledBinsCard from "../components/OverfilledBinsCard";
import FilledBinsCard from "../components/FilledBinsCard";
import UnfilledBinsCard from "../components/unfilledbinscard";
import FireBinsCard from "../components/FireBinsCard";
import OfflineBinsCard from "../components/OfflineBinsCard";
import LowBatteryCard from "../components/LowBatteryCard";
import AbnormalBinsCard from "../components/abnormalBinsCard";
import GoogleMaps from "../components/GoogleMaps";
import PieChart from "../components/charts/piechart";
import LineChart from "../components/charts/linechart";
import { getHistoryData } from "../components/apipath";
import { useState } from "react";
import { useEffect } from "react";

// Hook API
const useStyles = makeStyles(() => ({
  container: {
    borderRadius: "20px",
    // background: 'linear-gradient(45deg, #e1f5fe 50%, #e0f7fa 50%, #e0f2f1 50%)',
    paddingTop: "100px",
    marginLeft: 0,
    borderLeft: 0,
    width: "100wh",
  },

  cards: {
    borderRadius: "20px",
    padding: "50px",
    marginLeft: 0,
    borderLeft: 0,
    width: "100wh",
    alignItems: "center",
  },
  piechart: {
    borderRadius: "20px",
    padding: "5px",
    alignItems: "center",
    boxShadow: "0 3px 5px 2px #9e9e9e",
  },
  // pie: {
  //     selfAlign: 'center'
  // },
  linechart: {
    borderRadius: "20px",
    padding: "5px",
    alignItems: "center",
    boxShadow: "0 3px 5px 2px #9e9e9e",
  },
}));

const Feed = ({ binList }) => {
  const bins = binList;
  const classes = useStyles();

  //    const totalBins = bins.length;
  const overfilledBins = bins.filter(function (bin) {
    return bin.status === "Overfilled" || bin.height === 99;
  });
  const filledBins = bins.filter(function (bin) {
    return bin.status === "Filled";
  }); // 70% fill
  const unfilledBins = bins.filter(function (bin) {
    return bin.status === "Unfilled";
  });
  const lowBattBins = bins.filter(function (bin) {
    return bin.battery_alarm === 1;
  });
  const fireBins = bins.filter(function (bin) {
    return bin.fire_alarm === 1;
  });
  const abnormalBins = bins.filter(function (bin) {
    return bin.status === "Error";
  });
  const offlineBins = bins.filter(function (bin) {
    return bin.status === "Offline";
  });

  return (
    <Container className={classes.container}>
      {/* <Post /> */}
      <h4>Gandhinagar Municipal Corporation</h4>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Container className={classes.cards}>
            <Grid container spacing={3}>
              <Grid item lg={3} md={3} sm={6}>
                <TotalBinsCard title="TOTAL BINS" num={bins.length} />
              </Grid>
              <Grid item lg={3} md={3} sm={6}>
                <OverfilledBinsCard
                  title="OVERFILLED BINS"
                  num={overfilledBins.length}
                  bintable={overfilledBins}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6}>
                <FilledBinsCard
                  title="FILLED BINS"
                  num={filledBins.length}
                  bintable={filledBins}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6}>
                <UnfilledBinsCard
                  title="UNFILLED BINS"
                  num={unfilledBins.length}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6}>
                <FireBinsCard
                  title="ON FIRE BINS"
                  num={fireBins.length}
                  bintable={fireBins}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6}>
                <AbnormalBinsCard
                  title="ABNORMAL BINS"
                  num={abnormalBins.length}
                  bintable={abnormalBins}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6}>
                <LowBatteryCard
                  title="LOW BATTERY BINS"
                  num={lowBattBins.length}
                  bintable={lowBattBins}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6}>
                <OfflineBinsCard
                  title="OFFLINE BINS"
                  num={offlineBins.length}
                  bintable={offlineBins}
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={4} lg={4}> */}
            {/* <Container className={classes.piechart}> */}
            {/* <Grid container spacing={3}> */}
            <Grid item xs={12} md={4} lg={4}>
              <PieChart className={classes.pie} bins={bins} />
            </Grid>
            {/* </Grid> */}
            {/* </Container> */}

            {/* <BasicTable bins={bins} /> */}
            {/* </Grid> */}

            {/* <Grid item xs={12} md={8} lg={8}> */}
            {/* <Container className={classes.linechart}> */}
            {/* <Grid container spacing={3}> */}
            <Grid item xs={12} md={8} lg={8} align="center">
              <LineChart bins={bins} />
            </Grid>
            {/* </Grid> */}
            {/* </Container> */}
          </Grid>
          {/* </Grid> */}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <GoogleMaps bins={bins} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Feed;
