import React from "react";
import MaterialTable from "material-table";
import tableIcons from "../MaterialTableIcons";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getHistoryData } from "../apipath";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const _ = require("lodash");

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const columns = [
  {
    field: "id",
    title: "Bin ID",
    width: "14%",
    cellStyle: {
      textAlign: "center",
    },
    headerStyle: {
      textAlign: "center",
      backgroundColor: "#fafafa",
    },
  },
  {
    field: "place",
    title: "Place",
    width: "14%",
    cellStyle: {
      textAlign: "center",
    },
    headerStyle: {
      textAlign: "center",
      backgroundColor: "#fafafa",
    },
  },
  {
    field: "color",
    title: "Color",
    width: "14%",
    cellStyle: {
      textAlign: "center",
    },
    headerStyle: {
      textAlign: "center",
      backgroundColor: "#fafafa",
    },
    render: (rowdata) => (
      <div
        style={{
          fontWeight: "bold",
          backgroundColor:
            (rowdata.color === "Blue" && "#90caf9") ||
            (rowdata.color === "Green" && "#a5d6a7"),
          borderRadius: 8,
          padding: "3px 10px",
          display: "inline-block",
        }}
      >
        {rowdata.color}
      </div>
    ),
  },
  {
    field: "capacity",
    title: "Capacity",
    type: "numeric",
    width: "14%",
    cellStyle: {
      textAlign: "center",
    },
    headerStyle: {
      textAlign: "center",
      backgroundColor: "#fafafa",
    },
  },
  {
    field: "highest_filled",
    title: "Highest filled in 24hrs",
    width: "14%",
    cellStyle: {
      textAlign: "center",
    },
    headerStyle: {
      textAlign: "center",
      backgroundColor: "#fafafa",
    },
  },
  {
    field: "lowest_filled",
    title: "lowest filled in 24hrs",
    width: "14%",
    cellStyle: {
      textAlign: "center",
    },
    headerStyle: {
      textAlign: "center",
      backgroundColor: "#fafafa",
    },
  },

  {
    field: "status",
    title: "current status",
    width: "14%",
    cellStyle: {
      textAlign: "center",
    },
    headerStyle: {
      textAlign: "center",
      backgroundColor: "#fafafa",
    },
    render: (rowData) => (
      <div
        style={{
          fontWeight: "bold",
          backgroundColor:
            (rowData.status === "Unfilled" && "#81c784") ||
            (rowData.status === "Abnormal" && "#64b5f6") ||
            (rowData.status === "Filled" && "#e57373") ||
            (rowData.status === "On Fire Bins " && "#ffb74d") ||
            (rowData.status === "Overfilled" && "#f06292") ||
            (rowData.status === "Low Battery" && "#9575cd") ||
            (rowData.status === "Error" && "#ba68c8") ||
            (rowData.status === "Open or Error" && "ff4081") ||
            (rowData.status === "Over Flow or Blockage" && "#b388ff") ||
            (rowData.status === "Offline" && "#e0e0e0"),

          borderRadius: 8,
          padding: "3px 10px",
          display: "inline-block",
        }}
      >
        {rowData.status}
      </div>
    ),
  },
];

const Report1 = ({ binList }) => {
  const classes = useStyles();
  const [reportdata1, setReportdata1] = useState([]);

  var date = Date.now();
  let eDate = format(date, "yyyy-MM-dd HH:mm:ss");
  let sDate = format(date - 86400000, "yyyy-MM-dd HH:mm:ss");

  useEffect(() => {
    if (reportdata1.length === 0) {
      getHistoryData(sDate, eDate).then((response) => {
        setReportdata1(response.binsHistoryList);
      });
    }
  }, []);

  var normalBins = reportdata1.filter((el) => el.height !== 9999);

  let tempArr = [];

  binList.forEach((e) => {
    let tempObj = {
      bin_id: e.bin_id,
      capacity: e.capacity,
      color: e.color,
      place: e.place,
      status: e.status,
      top_height: e.top_height,
      top_Height: e.top_Height,
      total_height: e.total_height,
    };
    tempArr.push(tempObj);
  });

  var mergedList = _.map(normalBins, function (item) {
    return _.extend(item, _.find(tempArr, { bin_id: item.bin_id }));
  });

  let filterById = _.groupBy(mergedList, "bin_id");
  let tempArr1 = [];

  Object.values(filterById).forEach((el) => {
    let minbyheight = _.minBy(el, "height");
    let maxbyheight = _.maxBy(el, "height");
    let minfillpcent = (
      ((maxbyheight.total_height -
        maxbyheight.height +
        maxbyheight.top_height) *
        100) /
      maxbyheight.total_height
    ).toFixed(2);
    let maxfillpcent = (
      ((minbyheight.total_height -
        minbyheight.height +
        minbyheight.top_height) *
        100) /
      minbyheight.total_height
    ).toFixed(2);
    if (minfillpcent < 0) {
      minfillpcent = 0;
    }
    if (maxfillpcent < 0) {
      maxfillpcent = 0;
    }
    let tempObj = {
      bin_id: minbyheight.bin_id,
      highestFilled: minbyheight.last_updated,
      lowestFilled: maxbyheight.last_updated,
      highestFilledHeight: minbyheight.height,
      lowestFilledHeight: maxbyheight.height,
      minfillpcent: minfillpcent,
      maxfillpcent: maxfillpcent,
      capacity: minbyheight.capacity,
      color: minbyheight.color,
      place: minbyheight.place,
      status: minbyheight.status,
      top_height: minbyheight.top_height,
      top_Height: minbyheight.top_Height,
      total_height: minbyheight.total_height,
    };
    tempArr1.push(tempObj);
  });

  let tempArr2 = tempArr1.filter((v) => v.maxfillpcent >= 85);

  tempArr3 = 
  tempArr2.forEach((e) => {
    e.highestFilled = new Date(e.highestFilled.slice(0, 21));
    e.lowestFilled = new Date(e.lowestFilled.slice(0, 21));
    if (
      e.minfillpcent >= 0 &&
      e.minfillpcent < 10 &&
      e.highestFilled < e.lowestFilled
    ) {
      e.highestFilled = format(e.highestFilled, "yyyy-MM-dd HH:mm:ss");
      e.lowestFilled = format(e.lowestFilled, "yyyy-MM-dd HH:mm:ss");
    } else {
      e.highestFilled = format(e.highestFilled, "yyyy-MM-dd HH:mm:ss");
      e.lowestFilled = "-";
    }
  });

  let data = [];
  tempArr2.forEach((e) => {
    data = [
      ...data,
      {
        id: e.bin_id,
        highest_filled: e.highestFilled,
        lowest_filled: e.lowestFilled,
        place: e.place,
        color: e.color,
        capacity: e.capacity,
        status: e.status,
      },
    ];
  });

  return (
    <Container className={classes.container}>
      <MaterialTable
        onPageChange={() => console.log("On Page Change")}
        onChangeRowsPerPage={() => console.log("On Change Rows Per Page")}
        title="Bin Status (real time)"
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{
          exportButton: true,
          sorting: true,
          filtering: true,
          pageSizeOptions: [5, 10, tempArr2.length],
        }}
      />
    </Container>
  );
};

export default Report1;
