import React from 'react';
import '../css/Footer.css';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <React.Fragment>
            <div className="footer">
                <div className="footer-info">
                    <div className="footer-info-name">HOÀNG HIỆP <span>MOVIE</span></div>
                    <div className="footer-info-address">Số 310 Tô Hiệu, Lê Chân, Hải Phòng</div>
                    <span>hoanghiep1999hp@gmail.com</span>
                    <span>0914587966</span>
                </div>
                <div className="footer-info-wrap">
                    <ul>
                        <li>
                            <Link to="/movie-website">FAQ</Link>
                        </li>
                        <li>
                            <Link to="/movie-website">Investor Relations</Link>
                        </li>
                        <li>
                            <Link to="/movie-website">Privacy</Link>
                        </li>
                        <li>
                            <Link to="/movie-website">Speed Test</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link to="/movie-website">Help Center</Link>
                        </li>
                        <li>
                            <Link to="/movie-website">Jobs</Link>
                        </li>
                        <li>
                            <Link to="/movie-website">Cookie Preferences</Link>
                        </li>
                        <li>
                            <Link to="/movie-website">Legal Notices</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link to="/movie-website">Media Center</Link>
                        </li>
                        <li>
                            <Link to="/movie-website">Terms of Use</Link>
                        </li>
                        <li>
                            <Link to="/movie-website">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-copyright">@Copyright by Hoang Hiep, 2021</div>
        </React.Fragment>
    );
}

export default Footer;