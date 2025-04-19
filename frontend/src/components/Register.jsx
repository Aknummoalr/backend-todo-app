import React from 'react'
import axios from 'axios';
//import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate  = useNavigate();
    const [formData, setFormData] = useState({
        username:'',
        password:'',
    });
    const handleChange =(e)=>{
        setFormData({...formData,
                    [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/register',formData);
            // Cookies.set("Token", response.data.token);
            console.log("Registration Successful", response.data);
            navigate('/login');
        } catch (error) {
            console.log("Error :", error)
        }        
    }
    return (
        <div>
            <div className="form-container">    
                <form onSubmit={handleSubmit} className="form-container">    
                    <div className="username">
                        <input 
                            name="username"
                            type="username"
                            value={formData.username} 
                            onChange={handleChange} 
                            placeholder='Enter username'
                            required
                        />
                    </div><br/>
                    <div className="password">
                        <input 
                            name="password"
                            type="password"
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder='Enter password'
                            required
                            autoComplete='true'
                        />
                    </div><br/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
  )
}

export default Register