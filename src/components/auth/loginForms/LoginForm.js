import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';

// Firebase ->
import firebase from '../../../utils/Firebase';
import 'firebase/auth';

// styles ->
import './LoginForm.scss'

// utils ->
import { validateEmail } from '../../../utils/Validations';






export default function LoginForm({ setSelectedForm }) {

    //#region states 

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userActive, setUserActive] = useState(true)
    const [user, setUser] = useState(null);

    //#endregion


    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmit = () => {
        setIsLoading( true );
        if( validator() ) {
            firebase.auth().signInWithEmailAndPassword( formData.email, formData.password )
            .then( (data) => {
                setUser( data.user );
                setUserActive( data.user.emailVerified );
                if( !data.user.emailVerified ){
                    hanlderNoEmailVerified();
                }
            })
            .catch( err => {
                handlerError( err.code );
            })
            .finally( () => {
                setIsLoading( false ) ;
            })
        }
        setIsLoading( false );

    }



    const validator = () => {
        setFormError({});
        let errors = {};
        let formOk = true;


        if( !validateEmail(formData.email) ){
            errors.email = true;
            formOk = false;
        }

        if( !formData.password || !formData.password.trim()){
            errors.password = true;
            formOk = false;
        }

        setFormError( errors );
        return formOk
    }


    const hanlderNoEmailVerified = () => {
        toast.warning("Para poder ingresar, primero deber confirmar el email de tu cuenta");
    }


    return (
        <div className="login-form">
            <h1>Música para todos.</h1>
            


            <Form onSubmit={handlerSubmit} onChange={ onChange }>

                <Form.Field>
                    <Input 
                        type="text"
                        name="email"
                        placeholder="Correo electrónico"
                        icon="mail outline"
                        error={ formError.email }
                    />
                       { formError.email && (
                        <span className="error-text">
                            Por favor, introduce un correo electrónico válido.
                        </span>
                    )}
                </Form.Field>

                <Form.Field>
                    <Input 
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        icon="eye"
                        error={ formError.password }
                    />
                       { formError.password && (
                        <span className="error-text">
                            Por favor, introduce una contraseña 
                        </span>
                    )}
                </Form.Field>

                <Button 
                    type="submit"
                    loading={ isLoading }
                >
                    Inciar Sesión
                </Button>

            </Form>

            { !userActive && (
                <ButtonResetSendEmailVerification 
                    user={ user }
                    setIsLoading={ setIsLoading }
                    setUserActive={ setUserActive }
                />
            )}


            <div className="login-form__options">
                <p onClick={ () => setSelectedForm(null) }>Volver</p>

                <p>¿No tienes una cuenta?{" "}
                    <span onClick={ () => setSelectedForm('register')}> Regístrarme </span>
                </p>
            </div>
        </div>
    )
}


function ButtonResetSendEmailVerification({ user, setIsLoading, setUserActive })  {


    const resendVerificationEmail = () => {
        user.sendEmailVerification().then( () => {
            toast.success('Se ha enviado el mail de verificacion.')
        })
        .catch( err => {
            handlerError( err.code );
            console.log(err);
        })
        .finally( () => {
            setIsLoading(false);
            setUserActive(true);
        });
    }




    return (
        <div className="resend-verification-email">
            <p>
                Si no has reicibido el email de verificacion puedes volver a enviarlo 
                haciendo click <span onClick={ resendVerificationEmail }>aqui</span> 
            </p>
        </div>

    )



}
function handlerError(errorCode) {
    switch(errorCode){

        case "auth/wrong-password":
            toast.warning("Usuario o contraseña incorrectos.");
        break;
        
        case "auth/too-many-requests": 
            toast.warning("Se han enviado demasiadas solicitudes de reenvio de confirmacion en muy poco tiempo.")
        break;

        case 'auth/user-not-found':
            toast.warning("Usuario o contraseña incorrectos.");        
        break;
    }
}
