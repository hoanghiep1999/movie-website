import React, {useContext} from 'react';
import Card from '../components/Card';
import BannerList from '../components/BannerList';
import arrow from '../svg/arrow-up-solid.svg';
import '../css/FixedBtn.css';
import {Link} from 'react-router-dom';
import {dataContext} from '../context/context';

// swiperjs
import { Swiper, SwiperSlide } from "swiper/react";

// swiper bundle styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'

// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';

import '../css/HomePage.css';

// install Swiper modules
SwiperCore.use([Navigation]);

const HomePage = () => {
    const scroll = () => {
        window.scrollTo(0, 0);
    }

    const {arrMovie} = useContext(dataContext);

    return (
        <React.Fragment>
            <BannerList />
            <div className="main">
                <ul className="main-list">
                    {
                        arrMovie.slice(0,6).map(type => {
                            return (
                                <li className="main-item">
                                    <div className="main-item-wrap">
                                        <span className="main-item-title">{type.category}</span>
                                        <Link to={`/category/category=${type.category.replace(/\s/g, '-')}&page=1`}>Xem thêm</Link>
                                    </div>
                                    <ul className="main-card-list">
                                        <Swiper navigation={true} slidesPerView={5} spaceBetween={30} 
                                            breakpoints={
                                            {
                                                "320": {
                                                    "slidesPerView": 4,
                                                    "spaceBetween": 8
                                                },
                                                "576": {
                                                    "slidesPerView": 4,
                                                    "spaceBetween": 10
                                                },
                                                "768": {
                                                    "slidesPerView": 4,
                                                    "spaceBetween": 15
                                                },
                                                "876": {
                                                    "slidesPerView": 4,
                                                    "spaceBetween": 15
                                                },
                                                "1024": {
                                                    "slidesPerView": 5,
                                                    "spaceBetween": 25
                                                }
                                                ,
                                                "1160": {
                                                    "slidesPerView": 5,
                                                    "spaceBetween": 30
                                                }
                                            }
                                        } 
                                        className="mySwiper">
                                        {
                                            type.list.slice(0,10).map(item => {
                                                if(item.episode.length === 0) 
                                                    return <SwiperSlide><Card url={item.imageUrl} episode="none" category={type.category} title={item.title} urlTitle={item.urlTitle} /></SwiperSlide>;
                                                else if (item.episode.length === 1) {
                                                    return <SwiperSlide><Card url={item.imageUrl} episode={`/watchmovie/title=${item.urlTitle}&episode=ban-full`} category={type.category} title={item.title} urlTitle={item.urlTitle} /></SwiperSlide>;
                                                }
                                                else {
                                                    return <SwiperSlide><Card url={item.imageUrl} episode={`/watchmovie/title=${item.urlTitle}&episode=tap-1`} category={type.category} title={item.title} urlTitle={item.urlTitle} /></SwiperSlide>;
                                                }
                                            })
                                        }
                                        </Swiper>
                                    </ul>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            <div className="fixed-btn" onClick={scroll}><img src={arrow} alt="" width="20" /></div>
        </React.Fragment>
    );
}

export default HomePage;