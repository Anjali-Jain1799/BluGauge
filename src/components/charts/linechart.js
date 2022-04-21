import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Card, CardHeader } from "@material-ui/core";
import { getFilledHistoryData } from "../apipath";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

const _ = require("lodash");

const useStyles = makeStyles(() => ({
  linechart: {
    boxShadow: "0 3px 5px 2px #9e9e9e",
    padding: 0,
  },
  title: {
    fontSize: "15px",
    fonWeight: "500",
    fontFamily: "Jost, sans-serif",
    textAlign: "left",
  },
  chart: {
    margin: 0,
    padding: 0,
  },
}));

const LineChart = ({ bins }) => {
  const classes = useStyles();
  const [historybins, setHistorybins] = useState([]);

  var date = Date.now();
  var dateminus1 = date - 86400000;
  var dateminus2 = date - 2 * 86400000;
  var dateminus3 = date - 3 * 86400000;
  var dateminus4 = date - 4 * 86400000;
  var dateminus5 = date - 5 * 86400000;
  var dateminus6 = date - 6 * 86400000;

  let eDate = format(date, "yyyy-MM-dd HH:mm:ss");
  let sDate = format(dateminus6, "yyyy-MM-dd HH:mm:ss");

  useEffect(() => {
    if (historybins.length === 0) {
      getFilledHistoryData(sDate, eDate).then((response) => {
        setHistorybins(response.binsHistoryList);
      });
    }
  }, []);

  let colorBlue = Object.entries(historybins).filter(
    ([key, value]) => value.color === "Blue" && value.emptyTimes.length !== 0
  );

  let colorGreen = Object.entries(historybins).filter(
    ([key, value]) => value.color === "Green" && value.emptyTimes.length !== 0
  );

  colorGreen.forEach((e) => {
    let countGreen = e[1].emptyTimes.length;
  });
  console.log(colorGreen);

  const series = [
    {
      name: "Filled Bins",
      data: [
        [dateminus6, 20],
        [dateminus5, 46],
        [dateminus4, 33],
        [dateminus3, 97],
        [dateminus2, 22],
        [dateminus1, 45],
        [date, 55],
      ],
    },
    {
      name: "Breakdown Bins",
      data: [
        [dateminus6, 75],
        [dateminus5, 84],
        [dateminus4, 46],
        [dateminus3, 65],
        [dateminus2, 33],
        [dateminus1, 35],
        [date, 86],
      ],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    colors: ["#29b6f6", "#8B0000"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      min: date - 6 * 86400000,
      max: date,
    },
  };
  const tooltip = {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  };

  return (
    <Card className={classes.linechart}>
      <CardHeader className={classes.title} title="Weekly Analytics" />
      <Chart
        className={classes.chart}
        options={options}
        series={series}
        type="area"
        width="650"
      />
    </Card>
  );
};

export default LineChart;
