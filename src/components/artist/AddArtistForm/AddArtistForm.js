import React, { useState, useCallback } from 'react'
import { Form, Input, Icon, Button, Image } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

import { v4 as uuidv4 } from 'uuid';
// styles and images ->
import NoBannerImage from '../../../assets/png/no-image.png'
import './AddArtistForm.scss';

// Firebase ->
import  firebase  from '../../../utils/Firebase';
import 'firebase/storage';
import 'firebase/firestore';

const db = firebase.firestore( firebase );


export default function AddArtistForm({ setShowModal }) {
    
    const [formData, setFormData] = useState({
        name: ''
    });
    const [banner, setBanner] = useState(null)
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    const onDrop = useCallback( acceptedFile => {
        const file = acceptedFile[0];
        setFile(file);

        setBanner( URL.createObjectURL( file ) );
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg',
        noKeyboard: true,
        onDrop
    });


    

    const handlerSubmit = () => {
        if( validator() ) {
            setIsLoading(true);

            const fileNameByuuid = uuidv4();

            uploadImage( fileNameByuuid )
            .then( () => {
                uploadArtist( fileNameByuuid )
            })
            .catch( err => {
                toast.error("Error al subir la imagen del usuario");
            })
            .finally( () => {
                resetForm()
                setIsLoading(false);
                setShowModal(false);
            })


        }
    }


    const uploadArtist = ( fileNameByuuid ) => {
        db.collection("artists").add({ name: formData.name, banner: fileNameByuuid })
        .then( () => {
            toast.success("Artista creado correctamente");
        })
        .catch( err => {
            toast.error("Error al cargar el artista." + err )
        })
    }

    const uploadImage = (fileName)  => {

        const ref = firebase.storage().ref().child(`artist/${fileName}`);

        return ref.put( file );
    }

    const resetForm = () => {
        setFormData({name: ''});
        setFile(null);
        setBanner( null );
    }

    const validator = () => {

        if( !formData.name ){
            toast.warning("Debe completar todos los campos");
            return false;
        }

        if( !file ){
            toast.warning("Debe subir el banner del artista");
            return false;
        }

        return true;
    }


    return (
        <Form
            className="add-artist-form"
            onSubmit={handlerSubmit}
        >

            <Form.Field className="artist-banner"> 
                <div 
                    { ...getRootProps() } 
                    className="banner"
                    style={{
                        backgroundImage: `url('${banner}')`
                    }}
                ></div>
                <input { ...getInputProps() } />

                { !banner && <Image src={ NoBannerImage } />}
            </Form.Field>
 
            <Form.Field className="artist-avatar"> 
                <div 
                    className="avatar"
                    style={{
                        backgroundImage: `url('${banner ? banner : NoBannerImage}')`
                    }}   
                />
            </Form.Field>

             <Form.Field className="artist-name"> 
                <Input 
                    type="text"
                    placeholder="Nombre del Artista"
                    onChange={ e => setFormData({ name: e.target.value })}
                />
            </Form.Field>


            <Button
                loading={ isLoading }
                type="submit"
            >
                Crear Artista                
            </Button>




        </Form>
    )
}
