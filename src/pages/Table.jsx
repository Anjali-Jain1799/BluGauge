import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import React from "react";
import { Grid } from "@material-ui/core";
import { BasicTable } from "../components/BasicTable";
import { HistoryTable } from "../components/HistoryTable";

// Hook API
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  card: {},
}));

const BinTable = ({ binList }) => {
  const classes = useStyles();
  const bins = binList;

  return (
    <Container className={classes.container}>
      {/* <Post /> */}
      <div className="match-detail-section">
        <Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <BasicTable bins={bins} /> {/*//setBinData={setBinData}*/}
              </Grid>
            </Grid>
          </Grid>
          {/* {singleBinData.length!==0 ? */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <HistoryTable /> {/*count={count}*/}
                {/* <HistoryTable2 count={count} bins={binsHistory}/> count={data.count} */}
              </Grid>
            </Grid>
          </Grid>
          {/*count!==0 ? () : <h1>loading</h1> */}
        </Grid>
      </div>

      {/* <div className="Map"><GoogleMaps bins={bins} /></div> */}
    </Container>
  );
};

export default BinTable;
