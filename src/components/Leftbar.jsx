import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import EqualizerIcon from "@material-ui/icons/Equalizer";
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import RouterIcon from "@material-ui/icons/Router";
import GandhinagarLogo from "../assets/gandhinagar.png";
import Logo from "../assets/logo2.png";
import { ExitToAppOutlined } from "@material-ui/icons";
import { Notifications } from "@material-ui/icons";
import FeedbackIcon from "@material-ui/icons/Feedback";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AlarmIcon from "@material-ui/icons/Alarm";
import AlarmOffIcon from "@material-ui/icons/AlarmOff";

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  image: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "contain",
    height: "125px",
    width: "175px",
    marginTop: "15px",
    marginBottom: "40px",
  },
  item: {
    display: "flex",
    height: 40,
    padding: 0,
    cursor: "Pointer",
    "&:hover": {
      background: "#b2ebf2",
      opacity: 0.72,
      borderRight: "3px solid #60b8d4",
    },
  },
  text: {
    fontSize: 17,
    marginLeft: 5,
    fontFamily: "sans-serif",
    color: "#78909c",
    marginTop: 5,
    "&:hover": {
      textDecoration: "none",
    },
  },
  lefticon: {
    marginLeft: "30px",
    marginRight: 5,
    padding: 0,
    marginTop: 5,
    fontSize: 22,
    color: "#78909c",
  },
  badge: {
    display: "flex",
    float: "right",
    color: "#78909c",
  },
  maiden: {
    bottom: 20,
    left: "15%", //added
    position: "absolute",
    alignItems: "center",
    background: "#dbf5fc",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
  },
  notificon: {
    color: "#78909c",
    marginLeft: "auto",
    marginRight: -12,
  },
  blugauge: {
    color: "#60b8d4",
    fontFamily: "Jost",
    fontWeight: "bold",
    fontSize: 28,
  },
  logo: {
    bottom: 75,
    marginLeft: "40%",
    position: "absolute",
    zIndex: 1,
    objectFit: "contain",
    height: "45px",
    width: "45px",
    borderRadius: "20px",
    marginBottom: "5px",
    background: "#dbf5fc",
    boxShadow: "0 3px 5px 2px #9e9e9e",
  },
  appbar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: "rgba(255, 255, 255, 0.8)",
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    toolbar: theme.mixins.toolbar,
    display: "flex",
    justifyContent: "space-between",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  nestedtext: {
    fontSize: 17,
    fontFamily: "sans-serif",
    color: "#78909c",
    marginTop: 5,
    "&:hover": {
      textDecoration: "none",
    },
  },
  nestedicon: {
    marginLeft: "30px",
    marginRight: 5,
    padding: 0,
    marginTop: 5,
    fontSize: 22,
    color: "#78909c",
  },
  nesteditem: {
    display: "flex",
    height: 40,
    paddingLeft: 30,
    cursor: "Pointer",
    "&:hover": {
      background: "#b2ebf2",
      opacity: 0.72,
      borderRight: "3px solid #60b8d4",
    },
  },
}));

const Leftbar = ({ compChange, Logout }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [index, setIndex] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  // const handleChange = (event) => {
  //     setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <img src={GandhinagarLogo} className={classes.image} alt="IMG" />
      <div
        className={classes.item}
        onClick={() => {
          compChange("dash");
          setIndex(0);
        }}
        style={
          index === 0
            ? {
                background: "#dbf5fc",
                borderRight: "3px solid #60b8d4",
                transition: "background .5s ease",
              }
            : {}
        }
      >
        <EqualizerIcon
          className={classes.lefticon}
          style={index === 0 ? { color: "#60b8d4" } : {}}
        />
        <Typography
          className={classes.text}
          style={index === 0 ? { color: "#60b8d4" } : {}}
        >
          Dashboard
        </Typography>
      </div>
      <div
        className={classes.item}
        onClick={() => {
          compChange("table");
          setIndex(1);
        }}
        style={
          index === 1
            ? {
                background: "#dbf5fc",
                borderRight: "3px solid #60b8d4",
                transition: "background .5s ease",
              }
            : {}
        }
      >
        <RouterIcon
          className={classes.lefticon}
          style={index === 1 ? { color: "#60b8d4" } : {}}
        />
        <Typography
          className={classes.text}
          style={index === 1 ? { color: "#60b8d4" } : {}}
        >
          Devices
        </Typography>
      </div>
      {/* Feedback Form Implementation -> Uncomment After */}
      <div
        className={classes.item}
        onClick={() => {
          handleClick();
        }}
      >
        <FeedbackIcon
          className={classes.lefticon}
          style={index === 2 ? { color: "#60b8d4" } : {}}
        />
        <Typography
          className={classes.text}
          style={index === 2 ? { color: "#60b8d4" } : {}}
        >
          Mis Reports
        </Typography>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div
          className={classes.nesteditem}
          onClick={() => {
            compChange("report1");
            setIndex(2);
          }}
          style={
            index === 2
              ? {
                  background: "#dbf5fc",
                  borderRight: "3px solid #60b8d4",
                  transition: "background .5s ease",
                }
              : {}
          }
        >
          <AlarmIcon
            className={classes.nestedicon}
            style={index === 2 ? { color: "#60b8d4" } : {}}
          />
          <Typography
            className={classes.nestedtext}
            style={index === 2 ? { color: "#60b8d4" } : {}}
          >
            Bin Status
          </Typography>
        </div>
        <div
          className={classes.nesteditem}
          onClick={() => {
            compChange("report2");
            setIndex(3);
          }}
          style={
            index === 3
              ? {
                  background: "#dbf5fc",
                  borderRight: "3px solid #60b8d4",
                  transition: "background .5s ease",
                }
              : {}
          }
        >
          <AlarmOffIcon
            className={classes.nestedicon}
            style={index === 3 ? { color: "#60b8d4" } : {}}
          />
          <Typography
            className={classes.nestedtext}
            style={index === 3 ? { color: "#60b8d4" } : {}}
          >
            Breech Report
          </Typography>
        </div>
        <div
          className={classes.nesteditem}
          onClick={() => {
            compChange("report3");
            setIndex(4);
          }}
          style={
            index === 4
              ? {
                  background: "#dbf5fc",
                  borderRight: "3px solid #60b8d4",
                  transition: "background .5s ease",
                }
              : {}
          }
        >
          <LocalShippingIcon
            className={classes.nestedicon}
            style={index === 4 ? { color: "#60b8d4" } : {}}
          />
          <Typography
            className={classes.nestedtext}
            style={index === 4 ? { color: "#60b8d4" } : {}}
          >
            Collection
          </Typography>
        </div>
      </Collapse>
      <div className={classes.item} id="logout" onClick={Logout}>
        <ExitToAppOutlined className={classes.lefticon} />
        <Typography className={classes.text}>Logout</Typography>
      </div>
      <img src={Logo} className={classes.logo} alt="LOGO" />
      <div className={classes.maiden}>
        <Typography className={classes.blugauge}>BluGauge</Typography>
      </div>
      <Divider />
    </div>
  );

  const container = undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="default"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <section className={classes.notificon}>
            <IconButton
              size="medium"
              aria-label="notification"
              aria-controls="notif"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Notifications />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </section>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

Leftbar.propTypes = {
  compChange: PropTypes.func,
  Logout: PropTypes.func,
};

export default Leftbar;
