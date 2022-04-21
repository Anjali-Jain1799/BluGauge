import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import BatteryAlertIcon from "@material-ui/icons/BatteryAlert";
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


const useStyles = makeStyles({
  root: {
    height: "150px",
    width: "140px",
    cursor: "pointer",
    background: "linear-gradient(45deg, #e8eaf6 30%, #CBC3E3 90%)",
    boxShadow: "5px 10px 20px #fbe9e7",
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
    color: "#6200ea",
    marginTop: 0,
  },
  number: {
    fontWeight: "800",
    fontSize: "25px",
    fontFamily: "Jost, sans-serif",
    color: "#6200ea",
    marginBottom: 0,
  },
  icon: {
    color: "#6200ea",
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
    background: "rgb(98, 0, 234, 0.1)",
  },
  overfilltitle: {
    color: "#6200ea",
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

const LowBatteryCard = ({ title, num, bintable }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.root} onClick={handleClickOpen}>
        <div className={classes.content}>
          <BatteryAlertIcon className={classes.icon} />
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
            <BatteryAlertIcon className={classes.icon} />

            <h3 className={classes.overfilltitle}>Low Battery Bins</h3>
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

export default LowBatteryCard;
