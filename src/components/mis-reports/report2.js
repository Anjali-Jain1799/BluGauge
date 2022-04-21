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
    field: "sla_breech",
    title: "SLA Breech",
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
            (rowdata.sla_breech === "Yes" && "#e57373") ||
            (rowdata.sla_breech === "No" && "#f8bbd0"),
          borderRadius: 8,
          padding: "3px 10px",
          display: "inline-block",
        }}
      >
        {rowdata.sla_breech}
      </div>
    ),
  },
];

const Report2 = ({ binList }) => {
  const classes = useStyles();
  const [reportdata2, setReportdata2] = useState([]);

  var date = Date.now();
  let eDate = format(date, "yyyy-MM-dd HH:mm:ss");
  let sDate = format(date - 86400000, "yyyy-MM-dd HH:mm:ss");

  useEffect(() => {
    if (reportdata2.length === 0) {
      getHistoryData(sDate, eDate).then((response) => {
        setReportdata2(response.binsHistoryList);
      });
    }
  }, []);

  var normalBins = reportdata2.filter((el) => el.height !== 9999);

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

  let tempArr2 = tempArr1.filter((v) => v.maxfillpcent >= 85);

  tempArr2.forEach((e) => {
    e.highestFilled = new Date(e.highestFilled.slice(0, 21));
    e.lowestFilled = new Date(e.lowestFilled.slice(0, 21));
    if (e.minfillpcent >= 0 && e.minfillpcent < 10) {
      if (e.highestFilled < e.lowestFilled) {
        if (Math.abs(e.highestFilled - e.lowestFilled) / 3600000 > 5) {
          e.highestFilled = format(e.highestFilled, "yyyy-MM-dd HH:mm:ss");
          e.lowestFilled = format(e.lowestFilled, "yyyy-MM-dd HH:mm:ss");
          e.breech = "Yes";
        } else {
          e.highestFilled = format(e.highestFilled, "yyyy-MM-dd HH:mm:ss");
          e.lowestFilled = format(e.lowestFilled, "yyyy-MM-dd HH:mm:ss");
          e.breech = "No";
        }
      } else {
        if (Math.abs(date - e.highestFilled) / 3600000 > 5) {
          e.highestFilled = format(e.highestFilled, "yyyy-MM-dd HH:mm:ss");
          e.lowestFilled = "-";
          e.breech = "Yes";
        } else {
          e.highestFilled = format(e.highestFilled, "yyyy-MM-dd HH:mm:ss");
          e.lowestFilled = "-";
          e.breech = "No";
        }
      }
    } else {
      if (Math.abs(date - e.highestFilled) / 3600000 > 5) {
        e.highestFilled = format(e.highestFilled, "yyyy-MM-dd HH:mm:ss");
        e.lowestFilled = "-";
        e.breech = "Yes";
      } else {
        e.highestFilled = format(e.highestFilled, "yyyy-MM-dd HH:mm:ss");
        e.lowestFilled = "-";
        e.breech = "No";
      }
    }
  });
  console.log(tempArr2);

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
        sla_breech: e.breech,
      },
    ];
  });

  return (
    <Container className={classes.container}>
      <MaterialTable
        onPageChange={() => console.log("On Page Change")}
        onChangeRowsPerPage={() => console.log("On Change Rows Per Page")}
        title="SLA Breech Report (more than 5 hours)"
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

export default Report2;
