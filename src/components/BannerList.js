import React, {useContext} from 'react';
import Banner from '../components/Banner';
import {dataContext} from '../context/context';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'

import '../css/Header.css';

// import Swiper core and required modules
import SwiperCore, {
  Navigation,Pagination
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation,Pagination]);


const BannerList = () => {
    const {listMovie} = useContext(dataContext);
    const data = [];

    if(typeof(listMovie.phimchieurap) !== 'undefined' && listMovie.phimchieurap.length !== 0) {
        listMovie.phimchieurap.forEach(movie => {
            if(typeof(movie.episode) !== 'undefined' && movie.episode[0].url.indexOf("https://ok.ru/") !== -1 )
                {
                    data.push(movie);
                }
        })
    }

    return (
        <Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{"clickable": true}} navigation={false} className="mySwiper">
            {
                data.slice(0,5).map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            {item.episode.length === 0 && <Banner url={item.imageUrl} episode="none" category={item.category} title={item.title} urlTitle={item.urlTitle}/>}
                            {item.episode.length === 1 && <Banner url={item.imageUrl} episode={`/watchmovie/title=${item.urlTitle}&episode=ban-full`} category={item.category} title={item.title} urlTitle={item.urlTitle}/>}
                            {item.episode.length !== 1 && <Banner url={item.imageUrl} episode={`/watchmovie/title=${item.urlTitle}&episode=tap-1`} category={item.category} title={item.title} urlTitle={item.urlTitle}/>}
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
    );
}

export default BannerList;