import React, { Component } from 'react'

export class NewsTitle extends Component {
  render() {
    let {title,description,urlToImage,newsurl,date,author,source}=this.props;
    return (
      <div>
        <div className="card" style={{width: '18rem'}}>
  <img src={urlToImage} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%'}}>
    {source}
  </span>
    <h5 className="card-title">{title?title.slice(0,45):""}...</h5>
    <p className="card-text">{description?description.slice(0,85):""}...</p>
    <p style={{fontSize:'12px'}}>By {author?author:"Unknown"} on {date=new Date(date).toGMTString()}</p>
    <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsTitle
