import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    //credentials state
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    //using useHistory hook for redirect
    const history = useNavigate()

    //host
    const host = "http://localhost:5000";

    //function for handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = `${host}/api/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const jsonResp = await response.json();
        console.log(jsonResp);
        if (jsonResp.success) {
            localStorage.setItem('token', jsonResp.authtoken);
            history('/');
            props.showAlert("Succesfully logged in", "success")
        } else {
            props.showAlert("Invalid credentials", "danger")
        }
    }

    //onChange Function
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <h2 className='text-center'>Log in</h2>
            <form className='my-2' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
        </div>
    );
};

export default Login;
