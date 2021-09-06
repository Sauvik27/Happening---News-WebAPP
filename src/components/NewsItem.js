import React from 'react'


const NewsItem = (props) => {
    
        let {title, description, imgURL, newsURL, date} = props;
        return (
            <div className="my-5">
                <div className="card mx-auto w-75" style={{width: "18rem"}}>
                <img src={imgURL?imgURL:"https://www.stevens.edu/sites/stevens_edu/files/styles/news_detail/public/shutterstock_1165123768.jpg?itok=haoBDwhQ"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <a rel="noreferrer" href={newsURL} target="_blank" className="btn btn-sm btn-outline-primary">Read more</a>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated on {new Date(date).toGMTString()}</small>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
