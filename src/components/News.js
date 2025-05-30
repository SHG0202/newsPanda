import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setResults] = useState(0)

    
    const capatilizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        updateNews();
        document.title = `NewsPanda - ${capatilizeFirstLetter(props.category)} - Get your news in shots`
        // eslint-disable-next-line
    }, [])

    const updateNews = async () => {
        props.setProgress(10);
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        
        props.setProgress(30);
        
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        
        props.setProgress(50);
        
        setArticles(parsedData.articles)
        setResults(parsedData.totalResults)
        setLoading(false)
        
        props.setProgress(100);
    }

    // const handlePrevClick = async () => {
    //     setPage(page - 1)
    //     updateNews()
    // }

    
    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setResults(parsedData.totalResults)
    };

    return (
    <>
        <h1 className="text-center" style={{marginTop: '90px'}} >NewsPanda - Top {capatilizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}>    
            <div className="container">     
                <div className="row">
                    {articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} 
                        imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                        source={element.source.name}/>
                        </div>
                    })}
                </div>
            </div>   
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
            <button disabled ={Math.ceil(totalResults/page) < page + 1} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
    )
}

News.defaultProps = {
    country: 'india',
    pageSize: 12,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
