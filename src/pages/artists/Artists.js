import React, { useState, useEffect } from 'react'
import { map } from 'lodash'
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NoBannerImage from '../../assets/png/no-image.png'
import './Artists.scss';

// Firebase ->
import firebase from '../../utils/Firebase';
import 'firebase/firestore';

const db = firebase.firestore( firebase );


export default function Artists() {

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        db.collection('artists')
        .get()
        .then( res => {
                const arrayList = [];
                map( res?.docs, item => {
                    const data = {...item.data(), id: item.id}
                    arrayList.push( data );
                });
                setArtists(arrayList);
            });
    }, [])


    return (
        <div className="artists">
            <h1>Artistas</h1>
            <Grid>
                { map( artists, artist => ( 
                    <Grid.Column
                        key={ artist.id }
                        mobile={ 16 }
                        tablet={ 6 }
                        computer={ 4 }
                    >
                        <RenderArtist 
                            artist={ artist } 
                        />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
}



function RenderArtist({ artist }) {

    const [banner, setBanner] = useState(null)


    useEffect(() => {
        if( artist.banner ){
            firebase
                .storage()
                .ref(`artist/${artist.banner}`)
                .getDownloadURL()
                .then( res => {
                    setBanner( res );
                })
        } else {
            setBanner(NoBannerImage)
        }
        console.log(banner);
    }, [artist])

    return (
        <Link
            to={ `/artist/${ artist.id }`}
        >
            <div className="artists__item">
                <div 
                    className="avatar"
                    style={{ backgroundImage: `url('${ banner }')`}}
                />
                <h3>{ artist.name } </h3>
            </div>
        </Link>
    );



}
