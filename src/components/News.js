import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

const News = (props) =>{

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c4281ac8dfc4cb18e76cddd75159fca&page=1&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }
    useEffect(() => {
        updateNews();
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    }, [])

    const handlePrevClick = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c4281ac8dfc4cb18e76cddd75159fca&page=${page - 1}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setPage(page-1);
        setLoading(false);
    }
    const handleNextClick = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c4281ac8dfc4cb18e76cddd75159fca&page=${page + 1}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setPage(page+1);
        setLoading(false);
    }
        return (
            <div className="container my-5">
                <h1 className="text-center">Happening - Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
                {loading && <Spinner/>}
                <div className="row">
                {!loading && articles.map((element)=>{
                    return <div className="col-lg-4 col-md-6 col-sm-12" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0, 88):""} imgURL={element.urlToImage} newsURL={element.url} date={element.publishedAt}/>
                            </div>
                })}
                    
                </div>
                <div className="container d-flex justify-content-end">
                    <button disabled={page<=1} type="button" className="btn btn-primary nextPrevBTN" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-primary nextPrevBTN" onClick={handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
