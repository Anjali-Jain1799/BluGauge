import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CardTable from "./cardTable";
import CardMap from "./cardMap";
import { Grid, Container } from "@material-ui/core";
import { getBinHistory } from "../components/apipath";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {
    height: "150px",
    width: "140px",
    cursor: "pointer",
    background: "linear-gradient(45deg, #b2dfdb 30%, #b2ebf2 90%)",
    boxShadow: "5px 10px 20px #b2dfdb",
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
    color: "#424242",
    marginTop: 0,
  },
  number: {
    fontWeight: "800",
    fontSize: "25px",
    fontFamily: "Jost, sans-serif",
    color: "#424242",
    marginBottom: 0,
  },
  icon: {
    color: "#424242",
    height: 38,
    width: 38,
  },
  container: {
    borderRadius: "20px",
    paddingTop: "100px",
    marginLeft: 0,
    borderLeft: 0,
    width: "100vw",
  },
  appBar: {
    background: "rgb(66, 66, 66, 0.1)",
  },
  overfilltitle: {
    color: "#424242",
    marginLeft: 10,
    marginTop: 5,
  },
  cross: {
    color: "#ff6e40",
    marginLeft: "auto",
    marginRight: -12,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AbnormalBinsCard = ({ title, num, bintable }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const [bins, setBins] = useState(bintable);
  // console.log(bins);

  // useEffect(() => {
  //   // bintable.forEach((abin) => {
  //   // Add Code to check if 9999 for last 24 hours
  //   getBinHistory(bintable[0].bin_id).then((response) => {
  //     let binHistoryList = response.binsHistoryList;
  //     // console.log(binHistoryList);
  //     binHistoryList.filter((bin) => {
  //       const now = new Date();
  //       const dby = new Date(bin.last_updated);
  //       // console.log(now - dby);
  //       if ((now - dby) / (1000 * 60 * 60 * 24) < 2) {
  //         return bin;
  //         // console.log(`less than 2 days`);
  //       }
  //     });
  //     // console.log(binHistoryList);
  //     if (binHistoryList.filter((bin) => bin.height !== 9999).length > 0) {
  //       console.log(
  //         `${bintable[0].bin_id} Only this time abnormal or Temp Abnormal`
  //       );
  //     }
  //     //   });
  //   });
  // }, []);

  return (
    <div>
      <Card className={classes.root} onClick={handleClickOpen}>
        <div className={classes.content}>
          <DeleteForeverIcon className={classes.icon} />
          <p className={classes.number}> {num} </p>
          <p className={classes.title}> {title || { title }}</p>
        </div>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <DeleteForeverIcon className={classes.icon} />

            <h3 className={classes.overfilltitle}>Abnormal Bins</h3>
            <section className={classes.cross}>
              <IconButton edge="start" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </section>
          </Toolbar>
        </AppBar>
        <Container className={classes.container}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <CardTable bins={bintable} />
              </Grid>
              <Grid item xs={4}>
                <CardMap bins={bintable} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
};

export default AbnormalBinsCard;
