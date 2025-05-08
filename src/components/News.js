import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/everything?q=india&sortBy=popularity&apiKey=3b82e334fb704e769b241d6e62656a20&page=1&pageSize=15"
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles,
            totalResults: parsedData.totalResults
        })
    }

    handlePrevClick = async () => {
        
        let url = `https://newsapi.org/v2/everything?q=india&sortBy=popularity&apiKey=3b82e334fb704e769b241d6e62656a20&page=${this.state.page - 1}&pageSize=15`
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handleNextClick = async () => {
        if(Math.ceil(this.state.totalResults/this.state.page) < this.state.page + 1){

        }else{
            let url = `https://newsapi.org/v2/everything?q=india&sortBy=popularity&apiKey=3b82e334fb704e769b241d6e62656a20&page=${this.state.page + 1}&pageSize=15`
            let data = await fetch(url)
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }
11
    render() {
        return (
        <div className="container my-3">
            <h2>NewsPanda - Top Headlines</h2>
            <div className="row my-3">
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} 
                    imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>
                })}
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
        )
    }
}

export default News
