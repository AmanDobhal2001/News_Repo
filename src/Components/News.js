import React, { Component } from 'react';
import NewsTitle from './NewsTitle';
import Spinner from './Spinner';

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }

  async handlePage() {
    this.props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=100e0374408e403cbe2856106504ab13&page=${this.state.page}&pageSize=9`;
    this.props.setProgress(40);
    let data = await fetch(url);
    this.props.setProgress(60);
    let parsedData = await data.json();
    this.props.setProgress(80);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.handlePage()
  }

  setPreviousButton = async () => {
    await this.setState({ page: this.state.page - 1 })
    await this.handlePage()
  }

  setNextButton = async () => {
    await this.setState({ page: this.state.page + 1 })
     this.handlePage()
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NEWS - UPDATES</h1>
        {this.state.loading && <Spinner />}
        <div className="row my-3">
          {this.state.articles.map((element) => {
            return this.state.loading === true ? " " : <div className="col-md-4 my-3">
              <NewsTitle title={element.title} description={element.description} urlToImage={element.urlToImage ? element.urlToImage : "https://static.toiimg.com/thumb/msid-102815827,width-1070,height-580,imgsize-134732,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} newsurl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
            </div>
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page === 1} type="button" className="btn btn-success" onClick={this.setPreviousButton}>&laquo;Previous</button>
          <button disabled={this.state.page + 1 === Math.ceil(this.state.totalResults / 9)} type="button" className="btn btn-success" onClick={this.setNextButton}>Next &raquo;</button>
        </div>
      </div>
    )
  }
}

export default News
