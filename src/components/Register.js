import React, {useState} from 'react'


const RegisterForm = ({Register, error}) => {
    const [details, setDetails] = useState({name: "", username: "", email: "", password: ""});

    const submit = e => {
        e.preventDefault();
        if(details.name !== "" && details.username !== "" && details.email !== "" && details.password !== ""){
            Register(details);

        // if(!error){

        // }
        }
        
    }

    return (
        <form onSubmit={submit}>
            <div className='form-inner'>
                <h2>Register</h2>
                {(!error) ? ( <div className='error'>{error}</div>) : ""}
                <div className='form-group'>
                    <label htmlFor='name'>Organization Name: </label>
                    <input type='text' name="name" id="name" placeholder='name' onChange={e => setDetails({...details, name: e.target.value, })} value={details.name}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='name'>Project Name: </label>
                    <input type='text' name="username" id="username" placeholder='username' onChange={e => setDetails({...details, username: e.target.value, })} value={details.username}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' name="email" id="email" placeholder='email' onChange={e => setDetails({...details, email: e.target.value, })} value={details.email}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' name="password" id="password" placeholder='password' onChange={e => setDetails({...details, password: e.target.value, })} value={details.password}/>
                </div>
                <input type="submit" value="Register" className='ui button blue' />
            </div>
        </form>
    )
}

export default RegisterForm
