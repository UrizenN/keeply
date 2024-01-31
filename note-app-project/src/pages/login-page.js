import axios from 'axios';
import React, { useState} from "react";
import ReactDom  from 'react-dom';
import '../stylesheet/login-page.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () =>{
    const [myUsername,setMyUsername] = useState('');
    const [myPassword,setMyPassword] = useState('');
    const [registerOpen,setRegisterOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegisterRequest = async (fullname, username, password) => {
        console.log('handleRegisterRequest has worked!')
        const myURL = 'http://localhost:18842/api/DiaryApp/register';
        console.log(fullname, username, password);

        const userObject = {
            Id: 0,
            NameSurname: fullname,
            Username: username,
            Password: password
        } 
        
        try{
            await axios.post(myURL,userObject
                ).then(response => {
                    console.log(response)
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleLoginRequest = async (e) => {
        e.preventDefault();
        const myURL = 'http://localhost:18842/api/DiaryApp/login?UserName='+myUsername+'&Password='+myPassword;

        try{
            await axios.post(myURL).then((response) => {
                if (response.data.truth === true){
                    navigate('/home',{state:{UserID: response.data.id}});
                }
                else {
                    return null;
                }
            });
        }
        catch (err){
            console.log(err);
        }
    }

    return (
        <div>
            <div className="login-form">
                <p className="login-title">LOGIN KEEPLY</p>
                <textarea className='username-area-login' placeholder='Username' onChange={(event) => setMyUsername(event.target.value)}></textarea>
                <textarea className='password-area-login' placeholder='Password' onChange={(event) => setMyPassword(event.target.value)}></textarea>
                <button className="login-button" onClick={handleLoginRequest}>Login</button>
                <button className="register-model-button" onClick={() => setRegisterOpen(true)}>Register</button>
            </div>
            <SignUpModel open={registerOpen} onClickQuit={ () => setRegisterOpen(false)} onClickRegister={handleRegisterRequest}/>
        </div>
    );
}



const SignUpModel = (props) => {

    const [NameSurname, setNameSurname] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const sendRegistryUp = (e) => {
        e.preventDefault();
        props.onClickRegister(NameSurname, Username, Password);
        props.onClickQuit();
    }
    if (!props.open) return null

    return ReactDom.createPortal(
        <div>
            <div className="register-model-overlay"></div>
            <div className="sign-up-form">
                <p className="sign-up-title">Sign Up</p>
                <textarea className='name-surname-area-register' placeholder="Name-Surname" onChange={(event) => setNameSurname(event.target.value)}></textarea>
                <textarea className='username-area-register' placeholder='Username' onChange={(event) => setUsername(event.target.value)}></textarea>
                <textarea className='password-area-register' placeholder='Password' onChange={(event) => setPassword(event.target.value)}></textarea>
                <button className="quit-register-button" onClick={props.onClickQuit}>Quit</button>
                <button className="register-button" onClick={sendRegistryUp}>Register</button>
            </div>
        </div>,
        document.getElementById('signUpModel')
    );
}

export default LoginPage;
