import React, { useState, useEffect } from 'react'
import firebase from '../../utils/Firebase';
import 'firebase/storage';


import './BannerHome.scss'



export default function BannerHome() {
    
    const [bannerUrl, setBannerUrl] = useState(null);

    useEffect(() => {
        firebase
        .storage()
        .ref('other/banner-home.jpg')
        .getDownloadURL()
        .then( banner_Url => {
            setBannerUrl( banner_Url )
        })
        
    }, [])

    

    if( !bannerUrl ) {
        return null;
    }

    
    return (
        <div 
            className="banner-home"
            style={{ backgroundImage: `url(${bannerUrl})`}}
        />
    )
}
