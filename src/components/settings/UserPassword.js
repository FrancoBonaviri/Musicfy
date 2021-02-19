import React, { useState } from 'react'
import { Button, Form, Input, Icon } from 'semantic-ui-react';

import { toast } from 'react-toastify';
import { reauthenticate } from '../../utils/api';
import AlertErrors from '../../utils/AlertErrors';
import firebase from '../../utils/Firebase';
import 'firebase/auth';
import alertErrors from '../../utils/AlertErrors';

export default function UserPassword( { user, setShowModal, setTitleModal, setContentModal } ) {
    
    
    
    const handlerEditPassword = () => {
        setTitleModal('Actualizar contraseña')
        setContentModal(<ChangePasswordForm setShowModal={ setShowModal } />)

        setShowModal(true);
    }
    
    
    return (
        <div className="user-password">
            <h3>Contraseña:  *** *** *** ***</h3>



            <Button circular onClick={ handlerEditPassword }>
                Actualizar
            </Button>
        </div>
    )
}


function ChangePasswordForm({ setShowModal }) {

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);


    const handlerSubmit = () => {
        
        if( validator() ) {

            setIsLoading( true );
            
            reauthenticate(formData.oldPassword)
            .then( () => {
                changePassword();
            })
            .catch( err => {
                AlertErrors( err.code );
            })
            .finally( () => {
                setIsLoading(false);
                setShowModal(false);
            })


        }
    }


    const changePassword = () => {
        firebase.auth().currentUser.updatePassword( formData.newPassword ).then( () => {
            toast.success("La contraseña se ha actualizado correctamente. Por favor vuelva a iniciar sesión.");
            firebase.auth().signOut();
        })
        .catch( err => {
            console.log(err);
            alertErrors( err.code )
        })
        .finally( () => {
            setIsLoading( false );
            setShowModal( false );
        });
    }


    const validator = () => {

        if( !formData.oldPassword || !formData.newPassword || !formData.newPasswordRepeat ) {
            toast.warning("Debe completar todos los campos.");
            return false;
        }

        if( formData.newPassword != formData.newPasswordRepeat ){
            toast.warning("Las contraseñas deben coincidir.");
            return false;
        }

        if( formData.newPassword.length < 6 ){
            toast.warning("La contraseña debe tener minimo 6 carácteres.");
            return false;
        }


        return true;
    } 


    
    
    const onChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }


    return (
        <Form onSubmit={ handlerSubmit } onChange={ onChange }>

            <Form.Field>
                <Input 
                    type="password"
                    placeholder="Contraseña Actual"
                    name="oldPassword"
                />
            </Form.Field>


            <Form.Field>
                <Input 
                    type={ showPassword ? "text" : "password" }
                    placeholder="Nueva Contraseña"
                    name="newPassword"
                    icon={ 
                        <Icon 
                            link 
                            name={ showPassword ? "eye slash outline" : 'eye' } 
                            onClick={ () => setShowPassword( val => !val )}
                        /> 
                    }
                />
            </Form.Field>

            <Form.Field>
                <Input 
                    type={ showPassword ? "text" : "password" }
                    placeholder="Repetir nueva Contraseña"
                    name="newPasswordRepeat"
                    icon={
                        <Icon 
                            link 
                            name={ showPassword ? "eye slash outline" : 'eye' }
                            onClick={ () => setShowPassword( val => !val )}
                        /> 
                    }
                />
            </Form.Field>
        

            <Button type="submit" loading={ isLoading }>
                Actualizar
            </Button>
        
        
        </Form>
    );



}
