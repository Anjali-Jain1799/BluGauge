import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { getBinData } from "../components/apipath";
import React from "react";
import "./DashMain.css";
import Feed from "./Feed";
import Leftbar from "../components/Leftbar";
import BinTable from "./Table";
import PropTypes from "prop-types";
import Report1 from "../components/mis-reports/report1";
import Report2 from "../components/mis-reports/report2";
import Report3 from "../components/mis-reports/report3";

const DashBoard = ({ logout, user }) => {
  const [comp, setcomp] = useState("dash");
  const [bins, setBins] = useState([]);

  useEffect(() => {
    getBinData(user).then((response) => {
      let binList = response.binsList;
      console.log(binList);
      let date = new Date();

      binList.forEach((i) => {
        let binDate = new Date(i.last_updated);
        i.top_height = 100;
        if (i.fire_alarm === 1) {
          i.status = "Fire";
        } else if (
          i.height === 0 ||
          (date - binDate) / (1000 * 60 * 60 * 24) > 2
        ) {
          i.status = "Offline";
        } else if (i.battery_alarm === 1) {
          i.status = "Low Battery";
        } else if (i.height === 9999) {
          i.status = "Unfilled";
        } else if (i.height === 99) {
          i.status = "Over Flow or Blockage";
        } else if (
          i.full_alarm === 1 ||
          (i.height - i.top_height) / i.total_height <= 0.2
        ) {
          i.status = "Overfilled";
        } else if (
          (i.height - i.top_height) / i.total_height < 0.4 &&
          (i.height - i.top_height) / i.total_height > 0.2
        ) {
          i.status = "Filled";
        } else if (
          i.height < 2000 &&
          (i.height - i.top_height) / i.total_height > 0.4
        ) {
          i.status = "Unfilled";
        } else if (i.height > 2000 && i.tilt_alarm === 1) {
          i.status = "Open or Error";
        } else {
          i.status = "Error";
        }
      });
      binList.forEach((e) => {
        let x = 0;
        if (e.height === 99) {
          e.fillpcent = 100;
        } else if (e.height === 9999) {
          e.fillpcent = 0;
        } else {
          x =
            ((e.total_height - e.height + e.top_height) * 100) / e.total_height;
          x = x.toFixed(2);
          if (x >= 0) {
            e.fillpcent = x;
          } else {
            e.fillpcent = 0;
          }
        }
      });
      setBins(binList);
    });
  }, [comp]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={2}>
          <Leftbar compChange={setcomp} Logout={logout} />
        </Grid>

        {comp === "dash" && (
          <Grid item sm={10} xs={10}>
            <Feed binList={bins} />
          </Grid>
        )}
        {comp === "table" && (
          <Grid item sm={10} xs={10}>
            <BinTable binList={bins} />
          </Grid>
        )}
        {comp === "report1" && (
          <Grid item sm={10} xs={10}>
            <Report1 binList={bins} />
          </Grid>
        )}
        {comp === "report2" && (
          <Grid item sm={10} xs={10}>
            <Report2 binList={bins} />
          </Grid>
        )}
        {comp === "report3" && (
          <Grid item sm={10} xs={10}>
            <Report3 binList={bins} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

DashBoard.propTypes = {
  logout: PropTypes.func,
  username: PropTypes.string,
};

export default DashBoard;
