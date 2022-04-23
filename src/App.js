import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  let searchdata = "today";

  let [articles,setArticles] = useState([]);

  function readValue(value) {
    searchdata = value;
  }

  useEffect(()=> {
    getNews();
  },[]);

  function getNews(){
    let url = `https://newsapi.org/v2/everything?q=${searchdata}&apiKey=8186d2714f1442cb8b88d0a97b90eee2`;

    fetch(`${url}`)
    .then((response)=>response.json())
    .then((news)=>{
      setArticles(news.articles);
      console.log(news.articles);
    })
    .catch((err)=> {
      console.log(err);
    })
  }

  return (
    <div className="App">

      <div className="search">

        <input placeholder="Search News" className="search-input" 
        onChange={(event)=>{readValue(event.target.value)}}/>

        <button className="search-btn" onClick={getNews}> Search </button>

      </div>

      <div className="articles">
          {
            articles.map((articles,index)=> {
              return(

                <div key={index} className="article">
                    <img className="news-img" src={articles.urlToImage}/>
                    <div className="news-details">
                        <h3 className="title">{articles.title}</h3>
                        <h5 className="author">{articles.author}</h5>
                        
                        <a href={articles.url}>
                        <button className="btn">Read More</button>
                        </a>
                    </div>
                </div>  

              )
            })
          }
      </div>

    </div>
  );
}

export default App;