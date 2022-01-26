import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    //state for creating user
    const [userInfo, setUserInfo] = useState({ userName: "", email: "", password: "" });

    //using useNavigate hook for redirect
    const history = useNavigate()

    //onChange function
    const onChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    //host
    const host = "http://localhost:5000";

    //function for handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = `${host}/api/auth/createuser`;

        //we are using destructuring to upack variables from userInfo state
        const { userName, email, password } = userInfo;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: userName, email, password })
        });
        const jsonResp = await response.json();
        console.log(jsonResp);
        if (jsonResp.success) {
            localStorage.setItem('token', jsonResp.authtoken);
            history('/');
            props.showAlert("Account created successfully", "success")
        } else {
            props.showAlert("Unable to create an account", "danger")
        }

    }


    return (
        <div className='container my-3'>
            <h2 className='text-center'>Create an account</h2>
            <form className='my-2' autoComplete="off" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="userName" name='userName' value={userInfo.userName} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={userInfo.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={userInfo.password} onChange={onChange} minLength={8} />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
