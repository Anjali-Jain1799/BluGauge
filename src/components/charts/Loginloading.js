import React, { useState } from "react";
import "./login.css";
import logo from "../assets/logo.png";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  logodiv: {
    display: "flex",
    float: "left",
    objectFit: "cover",
    position: "sticky",
    height: "110px",
    width: "110px",
    marginTop: "5px",
    marginLeft: "5px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const LoginForm = ({ Login, error }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const [details, setDetails] = useState({ usernameOrEmail: "", password: "" });
  const submit = (e) => {
    e.preventDefault();
    if (details.email !== "" && details.password !== "") {
      Login(e, details, error);
    } else {
      console.log("Error");
      error = "Please Fill in the Details";
    }
  };

  return (
    <body id="loginbody">
      <img src={logo} className={classes.logodiv} />
      <div className="loginpage">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="form-inner">
            <form onSubmit={submit}>
              <label htmlFor="chk" aria-hidden="true" className="loginlabel">
                BluGauge
              </label>
              <input
                className="logininput"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) =>
                  setDetails({ ...details, usernameOrEmail: e.target.value })
                }
                value={details.usernameOrEmail}
              />
              <input
                className="logininput"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                value={details.password}
              />
              {error ? (
                <div className="error" style={{ alignItems: "center" }}>
                  {error}
                </div>
              ) : (
                ""
              )}
              <input
                type="submit"
                value="Login"
                className="loginbutton"
                onClick={handleToggle}
              />
              <Backdrop
                className={classes.backdrop}
                open={open}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </form>
          </div>
          <div className="contactus">
            <label htmlFor="chk" aria-hidden="true" className="loginlabel">
              Register
            </label>
            <div className="email">
              E-Mail:
              <br />
              maiden.easydesign@gmail.com
            </div>
            <a href="www.maideneasydesign.com" className="link">
              www.maideneasydesign.com
            </a>
          </div>
        </div>
      </div>
    </body>
  );
};

export default LoginForm;
