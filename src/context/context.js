import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const dataContext = React.createContext();

export const DataProvider = (props) => {
    const [listMovie, setListMovie] = useState({});

    /* Lay danh sach toan bo cac bo phim cua tat ca cac the loai khac nhau */
    const [listAllMovie, setListAllMovie] = useState([]);

    /* Khoi tao doi tuong lay toan bo cac bo phim cua tat ca cac the loai khac nhau voi key va value tuong ung */
    const [arrMovie, setArrMovie] = useState([]);

    useEffect(() => {
        axios.get('https://api.apify.com/v2/key-value-stores/QubTry45OOCkTyohU/records/LATEST?fbclid=IwAR1pQf1gu4aYQLM6vskcM480I5A2PLvnkAauZ9i1M9qzVUkJPje6n5MqgMw')
            .then(res => {
                const newData = [];
                for(var key of Object.keys(res.data.phim)) {
                    const data = res.data.phim[key].map(item => {
                        let str1 = item.title.replace(/\s/g, '-');
                        let str2 = str1.replace(/-/g, '')
                        return {
                            ...item,
                            urlTitle: str2,
                            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        }
                    });
                    newData[key] = data;
                }
                setListMovie({...newData});
            })
            .catch(err => console.log('Có lỗi!!'));
    }, []);

    useEffect(() => {
        const newData = [];
        for(var dataArr of Object.values(listMovie)) {
            newData.push(...dataArr);
        }
        setListAllMovie(newData);
    }, [listMovie]);

    useEffect(() => {
        /*listAllMovie.forEach((movie, index) => {
            if(movie.episode.length === 0) {
                listAllMovie.splice(index, 1);
            }
            let check = movie.episode.some(epi => epi.url.indexOf('https://ok.ru/', 0) === -1);
            if(check) {
                listAllMovie.splice(index, 1);
            }
        })*/
        const list1 = listAllMovie.filter(item => item.category === "Phim hành động");
        const list2 = listAllMovie.filter(item => item.category === "Phim kinh dị");
        const list3 = listAllMovie.filter(item => item.category === "Phim tình cảm");
        const list4 = listAllMovie.filter(item => item.category === "Phim cổ trang");
        const list5 = listAllMovie.filter(item => item.category === "Phim phiêu lưu");
        const list6 = listAllMovie.filter(item => item.category === "Phim hoạt hình");
        const list7 = listAllMovie.filter(item => item.category === "TV SHOW");
        const list8 = listAllMovie.filter(item => item.category === "Hài Hước");
        const list9 = listMovie.phimbo;
        const list10 = listMovie.phimle;
        const list11 = listMovie.phimchieurap;
        setArrMovie([{id: "1", category: "Phim hành động", list: list1}, 
            {id: "2", category: "Phim kinh dị", list: list2},
            {id: "3", category: "Phim tình cảm", list: list3}, 
            {id: "4", category: "Phim cổ trang", list: list4}, 
            {id: "5", category: "Phim phiêu lưu", list: list5},
            {id: "6", category: "Phim hoạt hình", list: list6}, 
            {id: "7", category: "TV SHOW", list: list7}, 
            {id: "8", category: "Hài Hước", list: list8},
            {id: "9", category: "Phim bộ", list: list9},
            {id: "10", category: "Phim lẻ", list: list10}, 
            {id: "11", category: "Phim chiếu rạp", list: list11}
        ]);
    }, [listAllMovie, listMovie]);

    /*console.log(listMovie);
    console.log(listAllMovie);
    console.log(arrMovie);*/

    return (
        <dataContext.Provider value={{listMovie, listAllMovie, arrMovie}}>
            {props.children}
        </dataContext.Provider>
    )
}