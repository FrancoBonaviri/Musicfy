import React, { useState, useEffect } from 'react'
import { map  } from 'lodash'
import { Grid } from 'semantic-ui-react';
import './Albums.scss'
import NoBannerImage from '../../assets/png/no-image.png'
import { Link } from 'react-router-dom';

// Firebase ->
import firebase from '../../utils/Firebase'
import 'firebase/firestore';
import 'firebase/storage'
const db = firebase.firestore( firebase );


export default function Albums() {


    const [albums, setAlbums] = useState([]);

    console.log(albums);

    useEffect(() => {
        db.collection('albums')
        .get()
        .then( res => {
            const arrayAlbum = [];
            map(res.docs, item => {
                const album = { id: item.id, ...item.data() };
                arrayAlbum.push(album);
            });;

            setAlbums( arrayAlbum );
        });
    }, [])




    return (
        <div className="albums">
            <h1>Albums</h1>


            <Grid>
                { map(albums, album => (
                    <Grid.Column
                        key={ album.id }
                        mobile={ 16 }
                        tablet={ 8 }
                        computer={ 4 }
                    >
                        <Album album={ album }/>
                    </Grid.Column>
                ))}    
                
            </Grid>            
        </div>
    )
}



function Album({ album }) {

    const [imageUrl, setImageUrl] = useState(null)


    console.log(imageUrl);
    useEffect(() => {
        firebase.storage()
            .ref(`album/${ album?.banner }`)
            .getDownloadURL()
            .then( url => {
                setImageUrl( url );
            });
    }, [ album ])




    return (
        <Link to={`album/${album.id}`}>
            <div className="albums__item">
                <div 
                    className="avatar"
                    style={{ backgroundImage: `url('${ imageUrl ? imageUrl : NoBannerImage }')`}}
                />
                <h3>{ album.name }</h3>
            </div>
        </Link>
    )

}