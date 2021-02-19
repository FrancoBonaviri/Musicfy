import React,{ useState } from 'react'
import { Form, Input, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify'


import firebase from '../../utils/Firebase';
import 'firebase/auth';




export default function UserName({ user, setContentModal, setTitleModal, setShowModal, setReloadApp }) {
    
    
    

    const handlerEditName = () => {
        setTitleModal("Actualizar nombre de usuario");
        setContentModal(<ChangeDisplayNameForm displayName={ user.displayName } setShowModal={ setShowModal } setReloadApp={ setReloadApp }/>)
        setShowModal( true );
    }
    
    return (
        <div className="user-name">
            <h2>{ user.displayName }</h2>
            <Button circular onClick={handlerEditName}>
                Actualizar
            </Button>
        </div>
    )
}




function ChangeDisplayNameForm({ displayName, setShowModal, setReloadApp }) {



    const [formData, setFormData] = useState({ displayName: displayName });
    const [isLoading, setIsLoading] = useState(false);



    const handlerSubmit = () => {
        if( !formData.displayName || !formData.displayName.trim() || formData.displayName === displayName ){
            return setShowModal(false);
        }


        setIsLoading( true );
        changeDisplayName()
        .then( () => {
            toast.success("El nombre se ha modificado correctamente.");
            setReloadApp(val => !val);
        }).catch(err => {
            toast.error("Error al actualizar el nombre." + err);
        }).finally( () => {
            setIsLoading(false);
            setShowModal(false);
        })
        
    }


    const changeDisplayName = () => {
        return firebase.auth().currentUser.updateProfile({ displayName: formData.displayName });
    }

    return (
        <Form onSubmit={ handlerSubmit }>
            <Form.Field>
                <Input 
                    defaultValue={displayName}
                    onChange={ e => setFormData({ displayName : e.target.value })}
                />

            </Form.Field>


            <Button type="submit" loading={ isLoading }>
                Actualizar Nombre
            </Button>
        </Form>
    );
}