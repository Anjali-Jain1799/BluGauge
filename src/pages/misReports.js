import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import React from "react";
import { Grid } from "@material-ui/core";
import Report1 from "../components/mis-reports/report1";
import Report2 from "../components/mis-reports/report2";
import { getHistoryData } from "../components/apipath";
import { useEffect, useState } from "react";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

const _ = require("lodash");

// Hook API
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  card: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MisReports = ({ binList }) => {
  const classes = useStyles();
  const [bins, setBins] = useState(binList);
  // console.log(bins);
  // const [comp, setcomp] = useState("report1");

  const [reportdata1, setReportdata1] = useState([]);
  // const currentbins = bins;

  var date = Date.now();
  let eDate = format(date, "yyyy-MM-dd kk:mm:ss");
  let sDate = format(date - 86400000, "yyyy-MM-dd kk:mm:ss");

  // console.log(sDate, eDate);

  useEffect(() => {
    if (reportdata1.length === 0) {
      getHistoryData(sDate, eDate).then((response) => {
        // console.log(response.binsHistoryList);
        setReportdata1(response.binsHistoryList);
      });
    }
  }, []);
  console.log(reportdata1);

  let filterById = _.groupBy(reportdata1, "bin_id");
  // console.log(filterById);

  let binIdArray = Object.keys(filterById);
  // console.log(binIdArray.length);

  // console.log(filterById[binIdArray[0]]);
  let arrayIdFilter = [];
  for (let i = 0; i < binIdArray.length; i++) {
    var filterByIdArray = [filterById[binIdArray[i]]];
    arrayIdFilter.push(filterByIdArray);
    // console.log(filterByIdArray);
    // console.log(i);
  }
  // console.log(arrayIdFilter);

  let finalArray = [];
  for (let i = 0; i < arrayIdFilter.length; i++) {
    var arrayIdFilter1 = arrayIdFilter[i];
    for (let j = 0; j < arrayIdFilter1.length; j++) {
      // let arrayIdFilter2 = arrayIdFilter1[j];
      // console.log(arrayIdFilter2);
      let minbyheight = _.minBy(arrayIdFilter1[j], "height");
      // console.log(minbyheight);
      let maxbyheight = _.maxBy(arrayIdFilter1[j], "height");
      // console.log(maxbyheight);
      var temp = {
        bin_id: minbyheight.bin_id,
        min: format(new Date(minbyheight.last_updated), "yyyy-MM-dd kk:mm"),
        max: format(new Date(maxbyheight.last_updated), "yyyy-MM-dd kk:mm"),
        difference:
          Math.abs(
            new Date(minbyheight.last_updated) -
              new Date(maxbyheight.last_updated)
          ) / 3600000,
      };
    }
    finalArray.push(temp);
    // console.log(temp);
  }
  console.log(finalArray);
  // console.log(bins);

  var mergedList = _.map(finalArray, function (item) {
    return _.extend(item, _.find(bins, { bin_id: item.bin_id }));
  });

  return (
    <Container className={classes.container}>
      {/* <div>
        <Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Report1 mergedList={mergedList} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Report2 mergedList={mergedList} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div> */}
      <Button
        variant="text"
        onClick={() => Report1((mergedList = { mergedList }))}
      >
        Text
      </Button>
      {/* <Report1
        mergedList={mergedList}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      /> */}
    </Container>
  );
};

export default MisReports;
