import React from 'react'


import { Button } from 'semantic-ui-react';


import './AuthOptions.scss'


export default function AuthOptions( { setSelectedForm } )  {



    const handlerRegister = () => {
        setSelectedForm("register");
    }

    const handlerLogin = () => {
        setSelectedForm("login");
    }



    return (
        <div className="auth-options">
            <h2>Millones de canciones en un solo lugar</h2>

            <Button 
                className="register"
                onClick={handlerRegister}
            >
                Registrarte Gratis
            </Button>
            <Button 
                className="login"
                onClick={ handlerLogin }
            >
                Ingresar
            </Button>
        </div>
    )
}
