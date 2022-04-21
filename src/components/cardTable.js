import React from "react";
import MaterialTable from "material-table";
import { Card } from "@material-ui/core";
import tableIcons from "./MaterialTableIcons";

const columns = [
  {
    field: "bin_id",
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
    width: "18%",
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
  },
  {
    field: "capacity",
    title: "Capacity",
    type: "numeric",
    width: "10%",
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
    title: "Status",
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
    field: "fillpcent",
    title: "Fill Percentage",
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
    field: "last_updated",
    title: "Last Update Time",
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

const CardTable = ({ bins }) => {
  // let data = [];
  // bins.forEach((e) => {
  //   data = [
  //     ...data,
  //     {
  //       id: e.bin_id,
  //       place: e.place,
  //       color: e.color,
  //       capacity: e.capacity,
  //       status: e.status,
  //       fillpcent: e.fillpcent,
  //       last_updated: e.last_updated,
  //     },
  //   ];
  // });

  return (
    <Card>
      <MaterialTable
        onPageChange={() => console.log("On Page Change")}
        onChangeRowsPerPage={() => console.log("On Change Rows Per Page")}
        title="Bin Data"
        icons={tableIcons}
        columns={columns}
        data={bins}
        options={{ exportButton: true, sorting: true, filtering: true }}
      />
    </Card>
  );
};
export default CardTable;
