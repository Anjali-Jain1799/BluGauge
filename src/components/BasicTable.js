import React from "react";
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";
import show from "@material-ui/icons/ViewColumn";

const columns = [
  { field: "id", title: "Bin ID" },
  { field: "place", title: "Place" },
  { field: "color", title: "Color" },
  { field: "capacity", title: "Capacity", type: "numeric" },
  { field: "height", title: "Height", type: "numeric" },
  {
    field: "status",
    title: "Status",
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
  { field: "fillpcent", title: "Fill Percentage", type: "numeric" },
  { field: "last_updated", title: "Last Update Time", defaultSort: "desc" },
];

export const BasicTable = ({ bins, setBin }) => {
  const showBinData = (id) => {
    setBin(id);
  };

  let data = [];
  bins.forEach((e) => {
    data = [
      ...data,
      {
        id: e.bin_id,
        place: e.place,
        color: e.color,
        capacity: e.capacity,
        height: e.height,
        status: e.status,
        fillpcent: e.fillpcent,
        last_updated: e.last_updated,
      },
    ];
  });

  return (
    <MaterialTable
      onPageChange={() => console.log("On Page Change")}
      onChangeRowsPerPage={() => console.log("On Change Rows Per Page")}
      title="Bin Data"
      icons={tableIcons}
      columns={columns}
      data={data}
      options={{ exportButton: true, sorting: true, filtering: true }}
    />
  );
};
