import React, { useState, useEffect } from 'react'
import { map } from 'lodash';

// Components ->
import BannerHome from '../../components/BannerHome';  
import BasicSliderItems from '../../components/Sliders/BasicSliderItems';

// styles ->
import './Home.scss';

// Firebase ->
import firebase from '../../utils/Firebase'
import 'firebase/firestore';
const db = firebase.firestore( firebase );

export default function Home() {


    const [artist, setArtist] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const arrayArtist = [];
        db.collection('artists')
        .get()
        .then( artists => {
            map( artists?.docs, artist => {
                const data = artist.data();
                data.id = artist.id;
                arrayArtist.push( data ); 
            });

            setArtist(arrayArtist);
        })
    }, [])

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
        <>
            <BannerHome />
            <div className="home-page">
                <BasicSliderItems 
                    title="Ultimos Artistas"
                    data={ artist }
                    folderImage={ "artist" }
                    urlName={ "artist" }
                />


                <BasicSliderItems 
                    title="Ultimos albumes"
                    data={ albums }
                    folderImage={ "album" }
                    urlName={ "album" }
                />


                {/* <h2>mass....</h2> */}
            </div>
        </>
    )
}
