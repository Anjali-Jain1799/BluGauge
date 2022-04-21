import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
const useStyles = makeStyles({
  root: {
    height: "150px",
    width: "140px",
    cursor: "pointer",
    background: "linear-gradient(45deg,#ffecb3 30%, #ffe0b2 90%)",
    boxShadow: "5px 10px 20px #ffecb3",
    borderRadius: "15px",
  },
  content: {
    textAlign: "center",
    marginTop: "20px",
  },
  title: {
    fontWeight: "500",
    fontSize: "15px",
    fontFamily: "Jost, sans-serif",
    color: "#ff8f00",
    marginTop: 0,
  },
  number: {
    fontWeight: "800",
    fontSize: "25px",
    fontFamily: "Jost, sans-serif",
    color: "#ff8f00",
    marginBottom: 0,
  },
  icon: {
    color: "#ff8f00",
    height: 38,
    width: 38,
  },
});

const TotalBinsCard = ({ title, num }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.content}>
        <DeleteSweepIcon className={classes.icon} />
        <p className={classes.number}> {num} </p>
        <p className={classes.title}> {title || { title }}</p>
      </div>
    </Card>
  );
};

export default TotalBinsCard;
