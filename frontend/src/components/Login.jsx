import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate  = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData({...formData,
                    [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login',formData);
            Cookies.set("Token", response.data.token);
            console.log("Login Successful", response.data);
            navigate('/todos')
        } catch (error) {
            console.log("Error :", error)
        }        
    }
    return (
        <div>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="username">
                        <input name='username' 
                            type='username' 
                            value={formData.username} 
                            onChange={handleChange} 
                            placeholder='Enter username'/>
                    </div><br/>
                    <div className="pasword">
                        <input name= 'password' 
                            type='password' 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder='Enter password'/>
                    </div><br/>

                    <button type="submit" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login