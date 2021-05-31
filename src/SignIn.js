import React, { useState } from 'react'
import $ from 'jquery'
import firebase from './firebase'

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                window.location.href = './'
                // Signed in 
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const login = () => {

        window.location.href = './login'
                
    }

    const handleChangeEmail = e => {
        setEmail(e.target.value)
    }

    const handleChangePassword = e => {
        setPassword(e.target.value)
    }

    $('html').css({'background-color':'black'})
    $('html').css({'overflow-y':'scroll'})

    return (
        <div className='loginGrid'>
            <h1 className='connection'>Inscription</h1>
            <div>
                <p className='logLabel'>Nom:</p>
                <input className='inputBoxLog' type='text'/>
            </div>
            <div>
                <p className='logLabel'>Prénom:</p>
                <input className='inputBoxLog' type='text'/>
            </div>
            <div>
                <p className='logLabel'>Courriel:</p>
                <input className='inputBoxLog' type='text' value={email} onChange={handleChangeEmail}/>
            </div>
            <div>
                <p className='logLabel'>Mot de passe:</p>
                <input className='inputBoxLog' type='text' value={password} onChange={handleChangePassword}/>
            </div>
            <div className='logBtnContainer'>
                <button onClick={() => signUp()} className='logBtn'>S'inscrire</button>
                <button onClick={() => login()} className='logBtn2'>Se connecter</button>
            </div>
            <div className='warning'>warning</div>
        </div>
    )
}

export default SignIn
