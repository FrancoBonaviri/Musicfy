import React, { useState, useCallback, useEffect } from 'react';
import { map } from 'lodash'
import { Form, Input, Button, Image, Dropdown } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify'

import firebase from '../../../utils/Firebase';
import 'firebase/firestore'
import 'firebase/storage'
import { v4 as uuid } from 'uuid';


import './AddAlbumForm.scss';
import noImage from '../../../assets/png/no-image.png'


const db = firebase.firestore( firebase );



export default function AddAlbumForm({ setShowModal }) {
    
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState(null)
    const [artists, setArtists] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        artist: ''
    });
    
    useEffect(() => {
        db.collection('artists')
        .get()
        .then( res => {
            const arrayArtists = [];
            map( res.docs, item => {
                const artist = { id: item.id, ...item.data() }
                arrayArtists.push({
                    key: artist.id,
                    value: artist.id,
                    text: artist.name
                });
            });
            setArtists( arrayArtists ); 
        })
    }, [])
    
    
    
    
    
    
    const handlerSubmit = () => {
        if( validator() ){
            setIsLoading( true );
            const fileName = uuid();
            uploadImage( fileName ).then( () => {
                db.collection('albums')
                    .add({
                        name: formData.name,
                        artist: formData.artist,
                        banner: fileName
                    })
                    .then( () => {
                        toast.success("Album creado correctamente.");
                    })
                    .catch( err => {
                        toast.warning("Error al subir el album");
                    });
            })
            .catch( er => {
                toast.warning("Error al subir la imagen del album.")
            })
            .finally( () => {
                setIsLoading( false );
                setShowModal( false );
            });

            console.log(formData);
        }
    }
    
    

    const uploadImage = ( fileName ) => {
        const ref = firebase.storage().ref().child(`album/${ fileName }`);

        return ref.put( file );
    }
    
    const validator = () => {
        if( !formData.name || !formData.artist ){
            toast.warning("Debe completar todos los datos.");
            return false;
        }


        if( !file ){
            toast.warning("La imagen del album es obligatoria.")
            return false;
        }

        return true;
    }






    const onDrop = useCallback( acceptedFile => {
        const file = acceptedFile[0];
        setFile( file );

        const url = URL.createObjectURL( file );
        setFileUrl( url );
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg',
        noKeyboard: true,
        onDrop
    });
    


    return (
        <Form 
            className="add-album-form"
            onSubmit={ handlerSubmit }
        >
            <Form.Group>

                <Form.Field
                    className="album-avatar"
                    width={ 5 }
                >
                    <div 
                        { ...getRootProps() }
                        className="avatar"
                        style={{ backgroundImage: `url('${ fileUrl }')`}}
                    />
                    <input 
                        { ...getInputProps() } 
                    />

                    { !fileUrl && <Image src={ noImage } /> }
                </Form.Field>

                <Form.Field
                    className="album-inputs"
                    width={ 11 }
                >
                    <Input
                        placeholder="Nombre del album"
                        onChange={ e => setFormData( {...formData, name: e.target.value } ) }
                    />


                    <Dropdown 
                        placeholder="El album pertenece..."
                        search
                        fluid 
                        selection
                        lazyLoad
                        options={ artists }
                        onChange={ ( e, data )=> setFormData({ ...formData, artist: data.value })}
                    />
                </Form.Field>
            </Form.Group>


            <Button
                type="submit"
                loading={ isLoading }
            >
                Crear album
            </Button>
        </Form >
    )
}
