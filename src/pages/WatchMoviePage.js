import React, {useContext} from 'react';
import '../css/WatchMoviePage.css';
import arrow from '../svg/arrow-up-solid.svg';
import '../css/FixedBtn.css';
import {Link, useParams} from 'react-router-dom';
import {dataContext} from '../context/context';

const WatchMoviePage = () => {
    const scroll = () => {
        window.scrollTo(0, 0);
    }

    const param = useParams();
    const {listAllMovie, arrMovie} = useContext(dataContext);
    let data = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    /* Random item number */
    let randomNum1;
    let randomNum2;
    let randomNum3;

    data = listAllMovie.find(item => item.urlTitle === param.title);
    data2 = listAllMovie.filter(item => item.category === data.category);
    data3 = arrMovie.find(item => item.category === "Phim bộ");
    data4 = arrMovie.find(item => item.category === "Phim lẻ");
    if(typeof data2 !== 'undefined' && data2.length !== 0) {
        randomNum1 = Math.floor(Math.random() * data2.length) - 4;
    }
    if(typeof data3 !== 'undefined' && typeof data3.list !== 'undefined' && data3.list.length !== 0) {
        randomNum2 = Math.floor(Math.random() * data3.list.length) - 4;
    }
    if(typeof data4 !== 'undefined' && typeof data4.list !== 'undefined' && data4.list.length !== 0) {
        randomNum3 = Math.floor(Math.random() * data4.list.length) - 4;
    }
    
    return (
        <div className="main-watch-page">
            <div className="main-watch-detail">
                {
                    typeof data !== 'undefined' && data.length !== 0 && 
                        <React.Fragment>
                            <img src={data.imageUrl} alt="" />
                            <ul className="main-watch-info">
                                <span title={data.title}>{data.title}</span>
                                <div className="main-watch-category">
                                    <img src="https://www.ssphim.net/static/5fe2d564b3fa64a886a11cee/5fe2d564b3fa647446a11d19_tag.svg" width="17" alt="" />
                                    <Link to={`/category/category=${data.category.replace(/\s/g, '-')}&page=1`}>{data.category}</Link>
                                </div>
                                <div className="main-watch-content">{data.content}</div>
                            </ul>
                        </React.Fragment>
                }
            </div>
            {typeof data !== 'undefined' && data.episode.length === 1 && data.episode[0].url.indexOf("https://ok.ru/") !== -1 && <div style={{display: "flex",justifyContent: "center", marginTop: "20px"}}><iframe title="phim" src={data.episode[0].url} allow="fullscreen" webkitallowfullscreen="true" mozallowfullscreen="true" /></div>}
            {typeof data !== 'undefined' && data.episode.length === 1 && data.episode[0].url.indexOf("https://ok.ru/") === -1 && <div style={{display: "flex",justifyContent: "center", marginTop: "20px"}}><div style={{padding: "0 0 10px 0", textAlign: "center"}}>Rất tiếc, tập phim này hiện chưa được cập nhật.</div></div>}
            {typeof data !== 'undefined' && data.episode.length !== 1 && <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                {
                    data.episode[param.episode.slice(4,5)-1].url !== '' && data.episode[param.episode.slice(4,5)-1].url.indexOf("https://ok.ru/") !== -1 && <iframe title="phim" src={data.episode[param.episode.slice(4,5)-1].url} allow="fullscreen" webkitallowfullscreen="true" mozallowfullscreen="true" />
                }
                {
                    data.episode[param.episode.slice(4,5)-1].url !== '' && data.episode[param.episode.slice(4,5)-1].url.indexOf("https://ok.ru/") === -1 && <div style={{padding: "0 0 10px 0", textAlign: "center"}}>Rất tiếc, tập phim này hiện chưa được cập nhật.</div>
                }
                {
                    data.episode[param.episode.slice(4,5)-1].url === '' && <div style={{padding: "0 0 10px 0", textAlign: "center"}}>Rất tiếc, tập phim này hiện chưa được cập nhật.</div>
                }
            </div>
            }
            <div className="main-watch-wrap">
                <ul className="main-watch-episode">
                    <li>Chọn tập phim:</li>
                        {typeof data !== 'undefined' && data.episode.length === 1 && <span style={{margin: "27px 10px 0 0", textAlign: "center"}}>Bạn đang được xem bản Full của bộ phim này !</span>}
                        {typeof data !== 'undefined' && data.episode.length !== 1 && data.episode.map((num) => 
                            <li key={num.episode}>
                                <Link to={`/watchmovie/title=${data.urlTitle}&episode=tap-${num.episode}`}>Tập {num.episode}</Link>
                            </li> 
                        )}
                    <div className="main-watch-others">
                        <span>Có thể bạn cũng muốn xem</span>
                        <ul>
                            {typeof data2 !== 'undefined' && data2.slice(randomNum1, randomNum1 + 4).map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} style={{backgroundImage: `url(${item.imageUrl})`}} />
                                        <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} className="main-watch-others-name" title={item.title}>{item.title}</Link>
                                        <div className="main-watch-others-category">
                                            <img src="https://www.ssphim.net/static/5fe2d564b3fa64a886a11cee/5fe2d564b3fa647446a11d19_tag.svg" width="17" alt="" />
                                            <Link to={`/category/category=${item.category.replace(/\s/g, '-')}&page=1`}>{item.category}</Link>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </ul>

                <div className="sidebar">
                    <span className="sidebar-title">Phim lẻ hot trong tuần</span>
                    <ul className="sidebar-list">
                        {
                            typeof data4 !== 'undefined' && typeof data4.list !== 'undefined' && data4.list.length !== 0 && data4.list.slice(randomNum3, randomNum3 + 4).map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} style={{backgroundImage: `url(${item.imageUrl})`}} />
                                        <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} className="sidebar-item-info">
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <span className="sidebar-title">Phim bộ hot trong tuần</span>
                    <ul className="sidebar-list">
                    {
                        typeof data3 !== 'undefined' && typeof data3.list !== 'undefined' && data3.list.length !== 0 && data3.list.slice(randomNum2, randomNum2 + 4).map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} style={{backgroundImage: `url(${item.imageUrl})`}} />
                                    <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} className="sidebar-item-info">
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })
                    }
                    </ul>
                </div>
            </div>

            <div className="fixed-btn" onClick={scroll}><img src={arrow} alt="" width="20" /></div>
        </div>
    );
}

export default WatchMoviePage;