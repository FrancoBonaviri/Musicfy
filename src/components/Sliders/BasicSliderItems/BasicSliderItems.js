import React, { useState, useEffect } from 'react'
import { map } from 'lodash'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './BasicSliderItems.scss';
import NoBannerImage from '../../../assets/png/no-image.png'



import firebase from '../../../utils/Firebase';
import 'firebase/storage';

export default function BasicSliderItems({ title, data, folderImage, urlName }) {

    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        className: 'basic-slider-items__list'
    };





    return (
        <div className="basic-slider-items">
            <h2>{ title }</h2>

            <Slider
                {...settings}
            >
                { map(data, item => (
                    <RenderItem 
                        item={item} 
                        key={ item.id } 
                        folderImage={ folderImage }
                        urlName={ urlName }
                    />
                ))}

            </Slider>


        </div>
    )
}



function RenderItem({ item, folderImage, urlName }) {

    const [bannerUrl, setBannerUrl] = useState(null)

    useEffect(() => {
        if( item.banner ){

            firebase
            .storage()
            .ref(`${folderImage}/${ item.banner }`)
            .getDownloadURL().then( urlBanner => {
                setBannerUrl( urlBanner );
            });
        } else { setBannerUrl(NoBannerImage) }
    }, [ item, folderImage ])

    return ( 
        <Link
            to={`/${ urlName }/${ item.id }`}
        >
            <div className="basic-slider-items__list-item">
                <div 
                    className="avatar"
                    style={{ backgroundImage: `url('${ bannerUrl }')`}}
                />

                <h3> { item.name } </h3>
            </div>
        </Link>
    )


}
