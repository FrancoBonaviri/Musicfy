import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import './Album.scss'
import NoBannerImage from '../../assets/png/no-image.png'

// Firebase ->
import firebase from '../../utils/Firebase'
import 'firebase/firestore';
import 'firebase/storage'
const db = firebase.firestore( firebase );

function Album({ match }) {

    const [album, setAlbum] = useState(null);
    const [albumImage, setAlbumImage] = useState(null);
    const [artist, setArtist] = useState(null);


    useEffect(() => {
        db.collection('albums')
        .doc(match.params.id)
        .get()
        .then( res => {
            setAlbum( res.data() );
        });
    }, [ match ])

    useEffect(() => {
        if( album ){

            firebase
                .storage()
                .ref(`album/${ album?.banner }`)
                .getDownloadURL()
                .then( res => {
                    setAlbumImage(res);
                })
        }
    }, [ album ])


    useEffect(() => {
        if ( album ) {
            db.collection('artists')
            .doc(album.artist)
            .get()
            .then( res => {
                setArtist( res.data() );
            });
        } 
    }, [ album ])

    if( !album || !artist  ){
        return <Loader active>Cargando...</Loader>
    }


    return (
        <div className="album">
            <div className="album__header">
             <HeaderAlbum album={ album } albumImg={ albumImage } artist={ artist } />

            </div>

            <div className="album__songs">
                <p>
                    Lista de canciones
                </p>
            </div>
        </div>
    )
}


export default withRouter( Album )



function HeaderAlbum({ album, albumImg, artist }) {

    return (
        <>
            <div 
                className="image"
                style={{ backgroundImage: `url('${ albumImg ? albumImg : NoBannerImage  }')`}}
            />

            <div className="info">
                <h1>{ album.name }</h1>
                <p>
                    De <span>{ artist.name }</span>
                </p>
            </div>

        </>
    )

}