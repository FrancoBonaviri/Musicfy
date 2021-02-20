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
                <h2>mass....</h2>
            </div>
        </>
    )
}
