import React, {useContext} from 'react';
import '../css/CategoryPage.css';
import '../css/Pagination.css';
import arrow from '../svg/arrow-up-solid.svg';
import '../css/FixedBtn.css';
import {Link, useParams} from 'react-router-dom';
import {dataContext} from '../context/context';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const CategoryPage = () => {
    const scroll = () => {
        window.scrollTo(0, 0);
    }

    const param = useParams();
    const {arrMovie} = useContext(dataContext);
    const data = arrMovie.filter(item => item.category === param.category.replace(/-/g, ' '));

    return (
        <div className="main-category-page">
        {
            typeof data !== 'undefined' && data.length !== 0 && data.map(item => {
                let numItem = 20;
                let start = parseInt((param.page-1) * numItem);
                let numPage;
                if (typeof item.list !== 'undefined')
                    numPage = Math.ceil(item.list.length / 20);
                /*let paginationList = [];
                for(let i = 1; i <= parseInt(param.page); i++){
                    let paginationItem = 
                        (<PaginationItem active>
                            <PaginationLink href={`/category/category=${item.category.replace(/\s/g, '-')}&page=${i}`}>
                                {i}
                            </PaginationLink>
                        </PaginationItem>);
                    paginationList = [...paginationList, paginationItem];
                }*/
                return (
                    <React.Fragment key={item.id}>
                        <div className="category-title">Thể loại: <span>{item.category}</span></div>
                        <ul className="category-list-item">
                        {
                            typeof item.list !== 'undefined' && item.list.length !== 0 && item.list.slice(start, parseInt(param.page) * numItem).map((item2, index) => {
                                return (
                                    <li className="category-item" key={index}>
                                        <Link to={`/detail/category=${item2.category.replace(/\s/g, '-')}&title=${item2.urlTitle}`} style={{backgroundImage: `url(${item2.imageUrl})`}} />
                                        <Link to={`/detail/category=${item2.category.replace(/\s/g, '-')}&title=${item2.urlTitle}`} className="category-item-name" title={item2.title}>{item2.title}</Link>
                                        <div className="category-item-type">
                                            <img src="https://www.ssphim.net/static/5fe2d564b3fa64a886a11cee/5fe2d564b3fa647446a11d19_tag.svg" width="17" alt="" />
                                            <Link to={`/category/category=${item2.category.replace(/\s/g, '-')}&page=1`}>{item2.category}</Link>
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
                                    href={`/category/category=${item.category.replace(/\s/g, '-')}&page=1`}
                                    />
                                </PaginationItem> : <PaginationItem>
                                    <PaginationLink
                                    first
                                    href={`/category/category=${item.category.replace(/\s/g, '-')}&page=1`}
                                    />
                                </PaginationItem>
                            }
                            {
                                parseInt(param.page) === 1 ? <PaginationItem disabled>
                                    <PaginationLink
                                    href={`/category/category=${item.category.replace(/\s/g, '-')}&page=${parseInt(param.page)-1}`}
                                    previous
                                    />
                                </PaginationItem> : <PaginationItem>
                                    <PaginationLink
                                    href={`/category/category=${item.category.replace(/\s/g, '-')}&page=${parseInt(param.page)-1}`}
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
                                    href={`/category/category=${item.category.replace(/\s/g, '-')}&page=${parseInt(param.page)+1}`}
                                    next
                                    />
                                </PaginationItem> : <PaginationItem disabled>
                                    <PaginationLink
                                    href={`/category/category=${item.category.replace(/\s/g, '-')}&page=${parseInt(param.page)+1}`}
                                    next
                                    />
                                </PaginationItem>
                            }
                            {
                                parseInt(param.page) === numPage ? <PaginationItem disabled>
                                    <PaginationLink
                                    href={`/category/category=${item.category.replace(/\s/g, '-')}&page=${numPage}`}
                                    last
                                    />
                                </PaginationItem> : <PaginationItem>
                                    <PaginationLink
                                    href={`/category/category=${item.category.replace(/\s/g, '-')}&page=${numPage}`}
                                    last
                                    />
                                </PaginationItem>
                            }
                        </Pagination>
                    </React.Fragment>
                );
            })
        }

            <div className="fixed-btn" onClick={scroll}><img src={arrow} alt="" width="20" /></div>
        </div>
    );
}

export default CategoryPage;