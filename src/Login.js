import React, { useState } from 'react'
import $ from 'jquery'
import firebase from './firebase'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signin = () => {
        window.location.href = "/register";
    }

    const login = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            if(email === 'admin@gmail.com'){
                window.location.href = "/dashboard";
            }
            else {
                window.location.href = "/";
            }
        }) 
        .catch((error) => {
            alert(error.message)
        })
    }

    const handleChangeEmail = e => {
        setEmail(e.target.value)
    }

    const handleChangePassword = e => {
        setPassword(e.target.value)
    }

    $('html').css({'background-color':'black'})

    return (
        <div className='loginGrid'>
            <h1 className='connection'>Connexion</h1>
            <div>
                <p className='logLabel'>Courriel:</p>
                <input className='inputBoxLog' type='text' value={email} onChange={handleChangeEmail}/>
            </div>
            <div>
                <p className='logLabel'>Mot de passe:</p>
                <input className='inputBoxLog' type='password' value={password} onChange={handleChangePassword}/>
            </div>
            <div className='logBtnContainer'>
                <button onClick={() => login()} className='logBtn'>Se connecter</button>
                <button onClick={() => signin()} className='logBtn2'>S'inscrire</button>
            </div>
        </div>
    )
}

export default Login
/*
admin@gmail.com
123123
            */