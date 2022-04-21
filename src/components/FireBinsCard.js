import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import WhatshotIcon from "@material-ui/icons/Whatshot";
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
    background: "linear-gradient(45deg, #ffff8d 30%, #ffcc80 90%)",
    boxShadow: "5px 10px 20px #ffff8d",
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
    color: "#e65100",
    marginTop: 0,
  },
  number: {
    fontWeight: "800",
    fontSize: "25px",
    fontFamily: "Jost, sans-serif",
    color: "#e65100",
    marginBottom: 0,
  },
  icon: {
    color: "#e65100",
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
    background: "rgb(230, 81, 0, 0.1)",
  },
  overfilltitle: {
    color: "#e65100",
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

const FireBinsCard = ({ title, num, bintable }) => {
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
          <WhatshotIcon className={classes.icon} />
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
            <WhatshotIcon className={classes.icon} />

            <h3 className={classes.overfilltitle}> Fire Alarm</h3>
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

export default FireBinsCard;
