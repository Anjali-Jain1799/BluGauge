import React, {useState} from 'react';
import RegisterForm from './components/Register';
import { signup } from './components/apipath';


const SignUp = () => {

    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");


    const Register = details => {
        console.log(details);
        const signupRequest = {
            name: details.name,
            email: details.email,
            username: details.username,
            password: details.password
        };
        signup(signupRequest).then(response => {
            console.log('Signed up Successfully')
        }).catch(error => {
            setError("Fill in all the details");
            console.log('Sorry try again')
        });  
    }


  const Logout = () => {
    console.log("Logout");
    setUser({ name: "", email: ""});
  }

  return (
    <div>
    {/* <Header /> */}
     <div className="ui container">
      
      {(user.email !== "") ? (
      <div className='welcome'>
        <h2> Welcome, {user.name}</h2>
        <button onClick={Logout} className='ui button blue'>Logout</button>
      </div>
      ) : (
        <RegisterForm Register={Register} error={error}/>
      )}
    </div>
  </div>
  );
}

export default SignUp;
