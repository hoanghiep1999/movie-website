import React, {useState, useContext, useRef} from 'react';
import '../css/Header.css';
import close from '../svg/close.png';
import {Link} from 'react-router-dom';
import {dataContext} from '../context/context';
import {Spinner} from 'reactstrap';

const Header = () => {
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);
    const [toggle4, setToggle4] = useState(false);
    const [searchList, setSearchList] = useState("");

    const {listAllMovie, arrMovie} = useContext(dataContext);
    let data = [];

    if(searchList !== "")
        data = listAllMovie.filter(movie => movie.title.indexOf(searchList) !== -1);

    let className = "overlay";
    if(toggle1) {
        className += " active";
    }

    let refInput = useRef();

    return (
        <React.Fragment>
            <div className="header">
                <div className={className} onClick={() => setToggle1(!toggle1)}></div>
                <div className="header-list-wrap" style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Link to="/" className="header-title">HOÀNG HIỆP <span>MOVIE</span></Link>
                    <div className="header-list-btn1" onClick={() => setToggle1(!toggle1)}><div></div></div>
                </div>
                <div className="header-wrap">
                    <ul className={toggle1 ? "active" : ""}>
                        <li>
                            <Link to="/" onClick={() => setToggle1(!toggle1)}>Trang chủ</Link>
                        </li>
                        {
                            arrMovie.slice(8,10).map(item => {
                                return (
                                    <li key={item.id}>
                                        <Link to={`/category/category=${item.category.replace(/\s/g, '-')}&page=1`} onClick={() => setToggle1(!toggle1)}>{item.category}</Link>
                                    </li>
                                );
                            })
                        }
                        <li>
                            <span>Thể loại</span>
                            <ul className="header-list-dropdown">
                            {
                                arrMovie.slice(0,8).map(item => {
                                    return (
                                        <li key={item.id}>
                                            <Link to={`/category/category=${item.category.replace(/\s/g, '-')}&page=1`} onClick={() => setToggle1(!toggle1)}>{item.category}</Link>
                                        </li>
                                    );
                                })
                            }
                                <li>
                                    {
                                        arrMovie.length !== 0 && <Link to={`/category/category=${arrMovie[arrMovie.length-1].category.replace(/\s/g, '-')}&page=1`} onClick={() => setToggle1(!toggle1)}>Phim chiếu rạp</Link>
                                    }                         
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/contact" onClick={() => setToggle1(!toggle1)}>Liên hệ</Link>
                        </li>
                        <li>
                            <div className="close-list" onClick={() => setToggle1(!toggle1)}></div>
                        </li>
                    </ul>
                    <form>
                        <input type="text" value={searchList} placeholder="Điền ở đây..." ref={refInput} onChange={(event) => setSearchList(event.target.value)}/>
                        <Link to={`/search/name=${searchList}&page=1`}><button type="submit" onClick={(event) => {
                            if(searchList === ""){
                                event.preventDefault();
                                setToggle3(false);
                                setToggle4(!toggle4);
                            }
                            else {
                                setSearchList("");
                                refInput.current.focus();
                            }
                        }}>Tìm kiếm</button></Link>
                        <div className="form-result">
                            <ul className={toggle2 ? "active" : ""}>
                                {
                                    data.length !== 0 &&
                                        data.slice(0,10).map(item => {
                                            return (
                                                <li>
                                                    <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} className="form-result-item">
                                                        <img src={item.imageUrl} alt="" />
                                                    </Link>
                                                    <div className="form-result-info">
                                                        <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} className="form-result-title" title={item.title}>{item.title}</Link>
                                                        <span>{item.category}</span>
                                                    </div>
                                                </li>
                                            );
                                        })
                                }
                                {
                                    data.length > 10 && <div className="form-result-more"><Link to={`/search/name=${searchList}&page=1`}>Xem thêm kết quả</Link></div>
                                }
                            </ul>
                            {
                                data.length === 0 && <div className={toggle2 ? "no-result active" : "no-result"} onClick={() => setToggle2(!toggle2)}><span>Chưa có kết quả tìm kiếm !</span></div>
                            }
                            <div className={toggle2 ? "close active" : "close"} onClick={() => setToggle2(!toggle2)}></div>
                            <div className={toggle2 ? "open active" : "open"} onClick={() => setToggle2(!toggle2)}></div>
                        </div>
                    </form>
                    <Link to="/" className="header-login-btn" onClick={(event) => {
                        event.preventDefault();
                        setToggle3(!toggle3);
                        setToggle4(false);
                    }}>Đăng nhập</Link>
                    <div className="header-list-btn2" onClick={() => setToggle1(!toggle1)}><div></div></div>
                </div>
            </div>

            <div className={toggle3 ? "header-toast active" : "header-toast"}>
                <div className="header-toast-header">
                    <Spinner size="sm"></Spinner>
                    <span>Thông báo</span>
                    <img src={close} alt="" width="18" onClick={() => setToggle3(!toggle3)}/>
                </div>
                <div className="header-toast-body">
                    Chức năng đăng nhập đang hoàn thiện !
                </div>
            </div>

            <div className={toggle4 ? "header-toast active" : "header-toast"}>
                <div className="header-toast-header">
                    <Spinner size="sm"></Spinner>
                    <span>Thông báo</span>
                    <img src={close} alt="" width="18" onClick={() => setToggle4(!toggle4)}/>
                </div>
                <div className="header-toast-body">
                    Yêu cầu bạn nhập từ khóa !
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;