import React from 'react';
import '../css/Banner.css';
import movie from '../svg/video-solid.svg';
import {Link} from 'react-router-dom';

const Banner = ({url, episode, category, title, urlTitle}) => {
    return (
        <div className="banner" style={{backgroundImage: `url(${url})`}}>
            <div className="banner-info">
                <span className="banner-info-title">{title}</span>
                <div className="banner-info-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                <div className="banner-info-wrap">
                    <Link to={episode}>Xem ngay <img src={movie} alt="" /></Link>
                    <Link to={`/detail/category=${category.replace(/\s/g, '-')}&title=${urlTitle}`}>Xem thêm</Link>
                </div>
            </div>
        </div>
    );
}

export default Banner;