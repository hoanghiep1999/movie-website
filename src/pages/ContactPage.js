import React from 'react';
import arrow from '../svg/arrow-up-solid.svg';
import '../css/FixedBtn.css';
import '../css/ContactPage.css';

const ContactPage = () => {
    const scroll = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="contact-main">
            <div className="contact-title1">Chào bạn!</div>
            <div className="contact-title2">Hãy liên hệ với chúng tôi.</div>
            <form className="contact-form">
                <input type="text" className="contact-input" placeholder="Họ" />
                <input type="text" className="contact-input" placeholder="Tên" />
                <input type="text" className="contact-input" placeholder="Số điện thoại" />
                <input type="text" className="contact-input email" placeholder="Địa chỉ email" />
                <textarea className="contact-input message" placeholder="Nội dung của bạn" />
                <button type="submit">Gửi</button>
            </form>

            <div className="fixed-btn" onClick={scroll}><img src={arrow} alt="" width="20" /></div>
        </div>
    );
}

export default ContactPage;