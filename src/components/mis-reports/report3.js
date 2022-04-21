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
    field: "collection_date",
    title: "Collection Date",
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
    field: "collection_time",
    title: "Collection Time",
    width: "14%",
    cellStyle: {
      textAlign: "center",
    },
    headerStyle: {
      textAlign: "center",
      backgroundColor: "#fafafa",
    },
  },
];

const Report3 = ({ binList }) => {
  const classes = useStyles();
  const [reportdata3, setReportdata3] = useState([]);

  var date = Date.now();
  let eDate = format(date, "yyyy-MM-dd HH:mm:ss");
  let sDate = format(date - 86400000, "yyyy-MM-dd HH:mm:ss");

  useEffect(() => {
    if (reportdata3.length === 0) {
      getHistoryData(sDate, eDate).then((response) => {
        setReportdata3(response.binsHistoryList);
      });
    }
  }, []);

  var normalBins = reportdata3.filter((el) => el.height !== 9999);

  let tempArr = [];

  binList.forEach((e) => {
    let tempObj = {
      bin_id: e.bin_id,
      capacity: e.capacity,
      color: e.color,
      place: e.place,
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
      top_height: minbyheight.top_height,
      top_Height: minbyheight.top_Height,
      total_height: minbyheight.total_height,
    };
    tempArr1.push(tempObj);
  });

  let tempArr2 = tempArr1.filter(
    (v) => v.minfillpcent >= 0 && v.minfillpcent < 10
  );

  tempArr2.forEach((e) => {
    e.collectionDate = e.lowestFilled.slice(0, 9);
    e.collectionTime = e.lowestFilled.slice(11, 18);
  });
  console.log(tempArr2);

  let data = [];
  tempArr2.forEach((e) => {
    data = [
      ...data,
      {
        id: e.bin_id,
        place: e.place,
        color: e.color,
        capacity: e.capacity,
        collection_date: e.collectionDate,
        collection_time: e.collectionTime,
      },
    ];
  });

  return (
    <Container className={classes.container}>
      <MaterialTable
        onPageChange={() => console.log("On Page Change")}
        onChangeRowsPerPage={() => console.log("On Change Rows Per Page")}
        title="Collection Report"
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

export default Report3;
