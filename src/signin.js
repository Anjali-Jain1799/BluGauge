import React, { useState, useEffect } from "react"; //, useEffect
import LoginForm from "./components/Login";
import { login } from "./components/apipath";
import { getCurrentUser } from "./components/apipath";
import DashBoard from "./pages/DashMain";
//import { Navigate } from 'react-router-dom';

const ACCESS_TOKEN = "accessToken";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  function loadCurrentUser() {
    getCurrentUser()
      .then((response) => {
        // console.log(response);
        setUser(response.username);
      })
      .catch((error) => {
        // console.log(error);
        setUser("");
      });
  }

  useEffect(() => {
    loadCurrentUser();
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      setUser("");
    }
    return () => {
      //console.log("User Loaded")
    };
  }, []);

  // console.log(user);
  function Login(e, details, err) {
    // console.log(details);
    const toDash = (username) => {
      // console.log(username);
      setUser(username);
    };

    e.preventDefault();
    if (!err) {
      //console.log(details)
      login(details)
        .then((response) => {
          // console.log(response);
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          getCurrentUser().then((response) => {
            toDash(response.username);
          });

          //setUser({email: details.email})
        })
        .catch((error) => {
          if (error.status === 401) {
            setError("Incorrect Credentials");
            // console.log("Not Authorized 401");
          } else {
            setError("Fill in all the details");
            // console.log("Something went wrong");
          }
        });
      //console.log("Next");
      // setUser({
      //     email: details.email,
      // });
    }
  }

  const Logout = () => {
    // console.log("Logged Out");
    localStorage.removeItem(ACCESS_TOKEN);
    setUser("");
  };

  return (
    <div>
      {/* <Header /> */}
      <div>
        {user !== "" ? (
          <div>
            {/* <Navigate to="/dashboard" />; */}
            <DashBoard logout={Logout} user={user} />{" "}
            {/* SetUser={() => setUser("")} */}
          </div>
        ) : (
          <div className="App">
            <LoginForm Login={Login} error={error} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;

// className='welcome'
// className="lo"
