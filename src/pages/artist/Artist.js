import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';

import BannerArtist from '../../components/artist/BannerArtist';
import BasicSliderItems from '../../components/Sliders/BasicSliderItems'

import { map } from 'lodash';
import firebase from '../../utils/Firebase'
import 'firebase/firestore'
import 'firebase/storage'

import './Artist.scss';
const db = firebase.firestore( firebase );

function Artist({ match }) {
    const { params } = match;

    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        db.collection("artists")
            .doc(params?.id)
            .get()
            .then( data => {
                const data_artist = data.data();
                data_artist.id = data.id
                setArtist( data_artist );
            });
    }, [ params ])

    useEffect(() => {
        if( artist ) {
            db.collection('albums')
            .where("artist", "==", artist.id)
            .get()
            .then( res => {
                const arrayAlbums = [];
                map( res.docs, album => {
                    arrayAlbums.push({ id: album.id, ...album.data() });
                });

                setAlbums( arrayAlbums );
            });
        }
    }, [ artist ])


    return (
        <div className="artist">
            { artist && 
            
                <BannerArtist 
                    artist={ artist }
                />
            }
            <div className="artist__content">

                <BasicSliderItems 
                    title="Álbumes"
                    data={ albums }
                    folderImage="album"
                    urlName="album"
                />
            </div>
        </div>
    )
}


export default withRouter( Artist );
