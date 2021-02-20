import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';

import BannerArtist from '../../components/artist/BannerArtist';

import firebase from '../../utils/Firebase'
import 'firebase/firestore'

import './Artist.scss';
const db = firebase.firestore( firebase );

function Artist({ match }) {
    const { params } = match;

    const [artist, setArtist] = useState(null);


    useEffect(() => {
        db.collection("artists")
            .doc(params?.id)
            .get()
            .then( data => {
                setArtist( data.data() );
            });
    }, [ params ])

    return (
        <div className="artist">
            { artist && 
            
                <BannerArtist 
                    artist={ artist }
                />
            }
            <h2>Mas información </h2>
        </div>
    )
}


export default withRouter( Artist );
