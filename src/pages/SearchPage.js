import React, {useContext} from 'react';
import '../css/CategoryPage.css'; // Cau truc trang search va category giong nhau
import '../css/Pagination.css';
import arrow from '../svg/arrow-up-solid.svg';
import '../css/FixedBtn.css';
import {Link, useParams} from 'react-router-dom';
import {dataContext} from '../context/context';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const SearchPage = () => {
    const scroll = () => {
        window.scrollTo(0, 0);
    }

    const {listAllMovie} = useContext(dataContext);
    const param = useParams();
    const data = listAllMovie.filter(movie => movie.title.indexOf(param.name) !== -1);

    let numItem = 20;
    let start = parseInt((param.page-1) * numItem);
    let numPage;
    if (typeof data !== 'undefined')
        numPage = Math.ceil(data.length / 20);

    return (
        <div className="main-detail-page">
            <div className="category-title category-search-title">Kết quả tìm kiếm với từ khóa: <span>{param.name}</span></div>
            <ul className="category-list-item">
                {
                    typeof data !== 'undefined' && data.length !== 0 && data.slice(start, parseInt(param.page) * numItem).map((item, index) => {
                        return (
                            <li className="category-item" key={index}>
                                <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} style={{backgroundImage: `url(${item.imageUrl})`}} />
                                <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} className="category-item-name" title={item.title}>{item.title}</Link>
                                <div className="category-item-type">
                                    <img src="https://www.ssphim.net/static/5fe2d564b3fa64a886a11cee/5fe2d564b3fa647446a11d19_tag.svg" width="17" alt="" />
                                    <Link to={`/category/category=${item.category.replace(/\s/g, '-')}&page=1`}>Phim chiếu rạp</Link>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>

            
            <Pagination className="pagination" aria-label="Page navigation example">
                {
                    parseInt(param.page) === 1 ? <PaginationItem disabled>
                        <PaginationLink
                        first
                        href={`/movie-website/search/name=${param.name}&page=1`}
                        />
                    </PaginationItem> : <PaginationItem>
                        <PaginationLink
                        first
                        href={`/movie-website/search/name=${param.name}&page=1`}
                        />
                    </PaginationItem>
                }
                {
                    parseInt(param.page) === 1 ? <PaginationItem disabled>
                        <PaginationLink
                        href={`/movie-website/search/name=${param.name}&page=${parseInt(param.page)-1}`}
                        previous
                        />
                    </PaginationItem> : <PaginationItem>
                        <PaginationLink
                        href={`/movie-website/search/name=${param.name}&page=${parseInt(param.page)-1}`}
                        previous
                        />
                    </PaginationItem>
                }
                {
                    <span className="pagination-page">Trang: {param.page} / {numPage}</span>/*paginationList.map(item => item)*/
                }
                {
                    parseInt(param.page) > 0 && parseInt(param.page) < numPage ? <PaginationItem>
                        <PaginationLink
                        href={`/movie-website/search/name=${param.name}&page=${parseInt(param.page)+1}`}
                        next
                        />
                    </PaginationItem> : <PaginationItem disabled>
                        <PaginationLink
                        href={`/movie-website/search/name=${param.name}&page=${parseInt(param.page)+1}`}
                        next
                        />
                    </PaginationItem>
                }
                {
                    parseInt(param.page) === numPage ? <PaginationItem disabled>
                        <PaginationLink
                        href={`/movie-website/search/name=${param.name}&page=${numPage}`}
                        last
                        />
                    </PaginationItem> : <PaginationItem>
                        <PaginationLink
                        href={`/movie-website/search/name=${param.name}&page=${numPage}`}
                        last
                        />
                    </PaginationItem>
                }
            </Pagination>
            <div className="fixed-btn" onClick={scroll}><img src={arrow} alt="" width="20" /></div>
        </div>
    );
}

export default SearchPage;