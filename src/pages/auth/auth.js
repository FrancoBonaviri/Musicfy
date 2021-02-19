import React, { useState } from 'react'

// Components ->
import  AuthOptions  from '../../components/auth/authOptions';
import  RegisterForm  from '../../components/auth/registerForm';
import  LoginForm  from '../../components/auth/loginForms'

// Images ->
import BackgroundAuth from '../../assets/jpg/background-auth.jpg';
import LogoNameWhite from '../../assets/png/logo-name-white.png';

// styles ->
import './auth.scss'


export default function Auth() {

    const [selectedForm, setSelectedForm] = useState(undefined)


    const handlerForm = () => {
        switch (selectedForm) {
            case "login":
                return <LoginForm setSelectedForm={ setSelectedForm } />
            case "register":
                return <RegisterForm setSelectedForm={ setSelectedForm } />
            default:
                return <AuthOptions setSelectedForm={ setSelectedForm } />
        }
    }


    return (
        <div className="auth" style={{ backgroundImage: `url(${ BackgroundAuth })`}}>
            <div className="auth__dark" />
            <div className="auth__box">
                <div className="auth__box-logo">
                    <img src={ LogoNameWhite } alt="Musicfy"/>
                </div>

            {  handlerForm() }
            </div>

        </div>
    )
}
