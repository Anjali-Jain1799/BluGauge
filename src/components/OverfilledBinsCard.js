import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
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
    background: "linear-gradient(45deg, #ffcdd2 30%, #f8bbd0 90%)",
    boxShadow: "5px 10px 20px #ffcdd2",
    borderRadius: "15px",
  },
  main: {
    alignItems: "center",
  },
  content: {
    textAlign: "center",
    marginTop: "20px",
  },
  title: {
    fontWeight: "500",
    fontSize: "15px",
    fontFamily: "Jost, sans-serif",
    color: "#ff6e40",
    marginTop: 0,
  },
  number: {
    fontWeight: "800",
    fontSize: "25px",
    fontFamily: "Jost, sans-serif",
    color: "#ff6e40",
    marginBottom: 0,
  },
  icon: {
    color: "#ff6e40",
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
    background: "rgba(255, 255, 255, 0.8)",
  },
  overfilltitle: {
      color: "#ff6e40",
      marginLeft: 10,
      marginTop:5
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

const OverfilledBinsCard = ({ title, num, bintable }) => {
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
          <RestoreFromTrashIcon className={classes.icon} />
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
            <RestoreFromTrashIcon className={classes.icon} />

            <h3 className={classes.overfilltitle}>Overfilled Bins</h3>
            <section className={classes.cross} >
              <IconButton
                edge="start"
                onClick={handleClose}
                aria-label="close"
                
              >
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

export default OverfilledBinsCard;
