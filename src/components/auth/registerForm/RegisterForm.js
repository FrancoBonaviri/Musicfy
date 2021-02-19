import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';

// Firebase ->
import firebase from '../../../utils/Firebase';
import 'firebase/auth';

// styles ->
import './RegisterForm.scss'

// utils ->
import { validateEmail } from '../../../utils/Validations';

export default function RegisterForm( { setSelectedForm } ) {

    //#region states 
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [formError, setFormError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //#endregion



    const onChange = e => {
       setFormData({
           ...formData,
           [e.target.name]: e.target.value
       });
    }

    const handlerShowPassword = () => {
        setShowPassword( !showPassword )
    }

    const handlerSubmit = () => {
        setIsLoading( true );
        if( validator() ) {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then( () => {
                console.log("ok");
                changeUserName();
                sendVerificationEmail();
            })
            .catch( err => {
                toast.error("Error Al crear la cuenta: " + err);
            })
            .finally( () => {
                setIsLoading(false);
                setSelectedForm(null);   
            })
        }
    }
    
    
    
    
    
    const validator = () => {
        setFormError({});
        let errors = {};
        let formOk = true;
        
        if(!validateEmail(formData.email)) {
            errors.email = true;
            formOk = false;

        }

        if(formData.password.length < 6){
            errors.password = true;
            formOk = false;
        }

        if( !formData.username ){
            errors.username = true;
            formOk = false;
        }


        setFormError( errors );
        return formOk


    }

    const changeUserName =  () => {
        firebase.auth().currentUser.updateProfile({
            displayName: formData.username
        }).catch( err => {
            toast.error("Error al asignar el a el usuario");
        })
    }


    const sendVerificationEmail = () => {
        firebase.auth().currentUser.sendEmailVerification().then( () => {
            toast.success("Se ha enviado un mail de verificación");
        }).catch( err => {
            toast.error("Error al enviar email de verificación.");
        }) 
    }


    return (
        <div className="register-form">
            <h1> Empieza a escuchar con una cuenta en Musicfy gratis.</h1>

            <Form onSubmit={ handlerSubmit } onChange={onChange}>
 
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
                        type={ showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        error={ formError.password }
                        icon={
                            <Icon 
                                name={showPassword ? "eye slash outline" : "eye"} 
                                link 
                                onClick={handlerShowPassword} 
                            />
                        }
                    />

                    { formError.password && (
                        <span className="error-text">
                            Por favor, introduce un contraseña superior a 5 carácteres. 
                        </span>
                    )}

                </Form.Field> 


                <Form.Field>
                    <Input 
                        type="text"
                        name="username"
                        placeholder="¿Como deberíamos llamarte?"
                        icon="user circle outline"
                        error={ formError.username }
                    />

                    { formError.username && (
                        <span className="error-text">
                            Por favor, introduce un username
                        </span>
                    )}

                </Form.Field> 


                <Button 
                    type="submit"
                    loading={ isLoading }
                >
                    Continuar
                </Button>   


 
            </Form>

            <div className="register-form__options">
                <p onClick={ () => setSelectedForm(null) }>Volver</p>
                <p> 
                    ¿Ya tienes Musicfy?
                    <span onClick={ () => setSelectedForm('login')}> Iniciar sesión </span>
                </p>
            </div>
 
        </div>
    )
}


