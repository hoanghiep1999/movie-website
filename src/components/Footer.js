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
                            <Link to="/">FAQ</Link>
                        </li>
                        <li>
                            <Link to="/">Investor Relations</Link>
                        </li>
                        <li>
                            <Link to="/">Privacy</Link>
                        </li>
                        <li>
                            <Link to="/">Speed Test</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link to="/">Help Center</Link>
                        </li>
                        <li>
                            <Link to="/">Jobs</Link>
                        </li>
                        <li>
                            <Link to="/">Cookie Preferences</Link>
                        </li>
                        <li>
                            <Link to="/">Legal Notices</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link to="/">Media Center</Link>
                        </li>
                        <li>
                            <Link to="/">Terms of Use</Link>
                        </li>
                        <li>
                            <Link to="/">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-copyright">@Copyright by Hoang Hiep, 2021</div>
        </React.Fragment>
    );
}

export default Footer;