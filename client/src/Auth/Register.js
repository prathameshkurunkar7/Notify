import React,{useState} from 'react';
import RegisterImage from '../assets/images/register.svg';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {register} from '../store/actions/auth';


import './Auth.css';

function Register({history}) {

    const dispatch = useDispatch()

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const submitForm = (e) =>{
        e.preventDefault();
        dispatch(register({firstName,lastName,email,password},history))
    }
    return (
        <div id="auth-container">
            <div id="auth-card">
                <div className="card-shadow">
                    <div id="image-section">
                        <img src={RegisterImage} alt="Register" />
                    </div>
                    <div id="form-section">
                        <h2>Let's Notify</h2>
                        <form onSubmit={submitForm}>
                            <div className="input-field mb-1">
                                <input onChange={e=>setFirstName(e.target.value)} value={firstName} required='required' type='text' placeholder="First Name"></input>
                            </div>
                            <div className="input-field mb-1">
                                <input onChange={e=>setLastName(e.target.value)} value={lastName} required='required' type='text' placeholder="Last Name"></input>
                            </div>
                            <div className="input-field mb-1">
                                <input onChange={e=>setEmail(e.target.value)} value={email} required='required' type='text' placeholder="Email"></input>
                            </div>
                            <div className="input-field mb-2">
                                <input onChange={e=>setPassword(e.target.value)} value={password} required='required' type='password' placeholder="Password"></input>
                            </div>
                            <button className="btn-grad">Sign Up</button>
                        </form>
                        <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
