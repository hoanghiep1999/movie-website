import React from 'react';
import '../css/Card.css';
import {Link} from 'react-router-dom';

const Card = ({url, episode, category, title, urlTitle}) => {
    return (
        <li className="main-card-item">
            <div className="main-card-img" style={{backgroundImage: `url(${url})`}}>
                <Link to={`/detail/category=${category.replace(/\s/g, '-')}&title=${urlTitle}`} />
            </div>
        </li>
    );
}

export default Card;