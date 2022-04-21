import React, { useState } from 'react'
import './login.css'
import logo from '../assets/logo.png'
import {makeStyles} from '@material-ui/core/styles' //useTheme

const useStyles= makeStyles((theme)=>({
    logodiv:{
        display: 'flex', 
        float: 'left',
       objectFit: 'cover',
       position: 'sticky',
       height:'110px',
       width: '110px',
       marginTop: '5px',
       marginLeft: '5px',
[theme.breakpoints.down('sm')]:{
    display:'none',
}
    }
}))

const LoginForm = ({ Login, error }) => {
    const classes= useStyles();
    const [details, setDetails] = useState({ usernameOrEmail: "", password: "" });
    const submit = e => {
        e.preventDefault();
        if (details.usernameOrEmail !== "" && details.password !== "") {
            Login(e, details, error);
        }
        else {
            console.log("Error");
            error = "Please Fill in the Details";
        }
    }

    return (
        <div id='loginbody'>
        <img src={logo} className={classes.logodiv} alt="Logo" />
         <div className='loginpage'> 
            <div className='main'>
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className='form-inner'>
                    <form onSubmit={submit}>
                        <label htmlFor="chk" aria-hidden="true" className='loginlabel'>BluGauge</label>
                        {/* {(!error !== "") ? ( <div className='error'></div>) : <h1>Vardaan</h1>} */}
                        <input className='logininput' type='email' name="email" id="email" placeholder="Email" onChange={e => setDetails({ ...details, usernameOrEmail: e.target.value, })} value={details.usernameOrEmail} />
                        <input className='logininput' type='password' name="password" id="password" placeholder="Password" onChange={e => setDetails({ ...details, password: e.target.value, })} value={details.password} />
                        {(error) ? (<div className='error' style={{ alignItems: 'center' }}>{error}</div>) : ""}
                        <input type="submit" value="Login" className='loginbutton' />
                    </form>
                </div>
                <div className='contactus'>
                    <label htmlFor="chk" aria-hidden="true" className='loginlabel'>Register</label>
                    <div className='email'>E-Mail:<br />maiden.easydesign@gmail.com</div>
                    <a href="www.maideneasydesign.com" className='link'>www.maideneasydesign.com</a>
                </div>

            </div>
        </div>
        </div>
    )
}

export default LoginForm
