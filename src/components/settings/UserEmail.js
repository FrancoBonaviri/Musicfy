import React, { useState } from 'react'
import { Button, Form, Input, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import alertErrors from '../../utils/AlertErrors';
import { reauthenticate } from '../../utils/api';

import firebase from '../../utils/Firebase';
import 'firebase/auth';



export default function UserEmail({ user, setShowModal, setTitleModal, setContentModal }) {


    const handlerEditEmail = () => {
        setTitleModal("Actualizar Email");
        setContentModal(<ChangeEmailForm user={ user } setShowModal={ setShowModal } />)
        setShowModal( true );
    }



    return (
        <div className="user-email">
            <h3>Email: { user.email }</h3>

            <Button circular onClick={ handlerEditEmail } >
                Actualizar
            </Button>
        </div>
    )
}



function ChangeEmailForm({ user, setShowModal }) {


    const [formData, setFormData] = useState( { email: user.email, password: "" } )
    const [isLoading, setIsLoading] = useState(false)

    const handlerSubmit = () => {
        
        if( validator() ) {

            setIsLoading(true)
        
            reauthenticate( formData.password ).then( () => {
                const currentUser = firebase.auth().currentUser;

                currentUser.updateEmail( formData.email )
                .then( () => {
                    toast.success("Email Actualizado.")
                    currentUser.sendEmailVerification().then( () => {
                        firebase.auth().signOut();
                    });
                })
                .catch( err => {
                    console.log(err);
                    alertErrors( err?.code )
                })
                .finally( () => {
                    setIsLoading(false);
                    setShowModal(false);
                });
            })
            .catch( err => {
                alertErrors( err?.code );
            })
            .finally( () => {
                setIsLoading(false);
                setShowModal(false);
            })
            
        }
    }


    const validator = () => {

        if( !formData.email || !formData.email.trim() || formData.email === user.email){
            setShowModal(false);
            toast.warning("Debe intoducir un correo electronico valido");
            return false;
        }

        if( !formData.password || !formData.password.trim() ){
            setShowModal(false);
            toast.warning("Contraseña incorrecta");
            return false;
        } 

        return true;
    }



    const onChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });

        console.log(formData);
    }


    return (
        <Form onSubmit={ handlerSubmit } onChange={ onChange }>
            <Form.Field>
                <Input 
                    placeholder="Email"
                    type="text"
                    name="email"
                    defaultValue={ user.email }
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    name="password"
                   type="password"
                   placeholder="Contraseña"
                />
            </Form.Field>


            <Button type="submit" loading={ isLoading }>
                Actualizar
            </Button>
        </Form>
    )

}