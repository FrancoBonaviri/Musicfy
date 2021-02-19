import React from 'react'
import { toast } from 'react-toastify';



export default function alertErrors (  firebaseErrorCode  ) {


    switch ( firebaseErrorCode ) {

        case "auth/wrong-password":
            toast.warning("La contraseña no es correcta");    
        break;
    
        case "auth/email-already-in-use": 
            toast.warning("El email ya se encuentra registrado");
        break;

        default:
            toast.warning('Error en el servidor, inténtelo más tarde');
        break;
    }

}


