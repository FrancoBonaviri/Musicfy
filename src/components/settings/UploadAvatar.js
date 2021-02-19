import React, { useState, useCallback } from 'react'
import { Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify'


import firebase from '../../utils/Firebase';
import 'firebase/storage';
import 'firebase/auth';

// styles and images ->
import DefaultAvatar from '../../assets/png/user.png';


export default function UploadAvatar( props ) {

    const { user, setReloadApp } = props;

    //#region states

    const [avatarUrl, setAvatarUrl] = useState(user.photoURL)

    //##endregion

    //#region React-Dropzone config 
    
    const onDrop = useCallback( acceptedFiles => {
        const file = acceptedFiles[0];
        setAvatarUrl( URL.createObjectURL(file) )
        uploadImage( file ).then( () => {
            updateUserImage()
        });
    })


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        accept: 'image/jpeg, image/png, image/jpg',
        noKeyboard: true,
        onDrop
    })

    //#endregion



    const uploadImage = (file) => {
        // Firebase folder ->
        const ref = firebase
        .storage()
        .ref()
        .child(`avatar/${ user.uid }`);

        // Push image ->
        return ref.put(file);
    }

    const updateUserImage = () => {
        // Get avatar url and update user ->
        firebase.storage()
        .ref(`avatar/${user.uid}`)
        .getDownloadURL()
        .then( async(URLAvatar) => {
            await firebase.auth().currentUser.updateProfile({photoURL: URLAvatar})
            setReloadApp( val => !val)
        }).catch( err => {
            toast.error("Error al actualizar el avatar.")
        })
    }


    return (
        <div className="user-avatar" { ...getRootProps() }>
            <input { ...getInputProps() } />
            { isDragActive ? (
                <Image src={DefaultAvatar} />
            ): (
                <Image src={avatarUrl ? avatarUrl : DefaultAvatar } />
            )}
        </div>
    )
}
