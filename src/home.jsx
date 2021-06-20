import React, { Component } from "react";
import "./css/newshome.css";
import "./components/fontawesome/css/all.css";
class NewsHome extends Component {
  state = {
    query: "",
    newsObj: [],
    categoryList: [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ],
    category: "business",
    firstSlideStyle: {
      marginLeft: 0,
    },
    loadStyle: {
      display: "none",
    },
    homenewsStyle: {
      display: "block",
    },
    randomnewsObj: [],
    search_div_style: {
      display: "block;",
    }
  };

  componentDidMount = () => {
    this.fetchNews("business");
  };
  fetchNews = async  (category) => {

      var params= {
        category:category,
        query:this.state.query
      }
    try{
    const data=await fetch("https://node-news-api.herokuapp.com/api",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(params)
    })
    
    if(!data.ok)
    {
      throw new Error('timout');
    }
    console.log("data",data);
    const x=await data.json();
    console.log("json",x);
    const res= x.news;
    this.setState({
      loadStyle: {
        display: "none",
      },
    });
    var date1=new Date();
        var newsObj = res["articles"];
        for (var i = 0; i < res["articles"].length; i++) {
          res["articles"][i]["publishedAt"] = res["articles"][i][
            "publishedAt"
          ].substr(0, res["articles"][i]["publishedAt"].indexOf("T"));
          var date = new Date(res["articles"][i]["publishedAt"]);
          res["articles"][i]["publishedAt"] = date.getDate();

          if (date1.getDate() - res["articles"][i]["publishedAt"] == 0) {
            res["articles"][i]["publishedAt"] = "Today";
          } else if (date1.getDate() - res["articles"][i]["publishedAt"] == 1) {
            res["articles"][i]["publishedAt"] = "Yesterday";
          } else {
            res["articles"][i]["publishedAt"] = date.toDateString();
          }
        }

        category === "random"
          ? this.setState({ randomnewsObj: newsObj })
          : this.setState({ newsObj });

      }
      catch(err){
        console.log("error occured",err);
      }
    }




  submit = () => {
    this.setState({
      homenewsStyle: {
        display: "none",
      },
      search_div_style: {
        display: "block",
      },
      randomnewsObj: "",
    });
    this.fetchNews("random");
  };
  changeNews = (index) => {
    this.setState({
      fullnewsIndex: index,
      inputval: "",
      search_div_style: {
        display: "none",
      },
      homenewsStyle: {
        display: "block",
      },
      randomnewsObj: "",
    });
    this.setState({
      newsObj: "",
      loadStyle: {
        display: "block",
      },
    });
    var category = this.state.categoryList[index];
    this.setState({ category });
    this.fetchNews(category);
    index == 0
      ? this.setState({
          firstSlideStyle: {
            marginLeft: 0,
          },
        })
      : index == 1
      ? this.setState({
          firstSlideStyle: {
            marginLeft: "-14.18%",
          },
        })
      : index == 2
      ? this.setState({
          firstSlideStyle: {
            marginLeft: "-28.48%",
          },
        })
      : index == 3
      ? this.setState({
          firstSlideStyle: {
            marginLeft: "-42.7%",
          },
        })
      : index == 4
      ? this.setState({
          firstSlideStyle: {
            marginLeft: "-57%",
          },
        })
      : index == 5
      ? this.setState({
          firstSlideStyle: {
            marginLeft: "-70.7%",
          },
        })
      : this.setState({
          firstSlideStyle: {
            marginLeft: "-85.4%",
          },
        });
  };
  render() {
    const { newsObj, category, categoryList, randomnewsObj } = this.state;
    return (
      <React.Fragment>
        <div className="news-search">
          <input
            type="text"
            placeholder="Search for Cars,Covid-19..."
            value={this.state.inputval}
            onChange={(e) =>
              this.setState({ query: e.target.value, inputval: e.target.value })
            }
          ></input>
          <button onClick={this.submit}>GO</button>
        </div>
        <div className="menu">
          {categoryList.map((e, index) => (
            <div
              className="category"
              tabIndex={index}
              onClick={() => this.changeNews(index)}
            >
              {e}
            </div>
          ))}
        </div>
        <div className="news-container" style={this.state.homenewsStyle}>
          <div className="all-category">
            <div className="each-category" style={this.state.firstSlideStyle}>
              <div className="business visible-category">
                {this.state.newsObj !== "" &&
                  newsObj.map((e) => (
                    <div
                      className="news-inf"
                      onClick={() => {
                        window.location.href = e["url"];
                      }}
                    >
                      {e["urlToImage"] !== "" && (
                        <img src={e["urlToImage"]}></img>
                      )}
                      <div className="title">{e["title"]} </div>
                      <div className="date">
                        {e["source"]["name"]} -{" "}
                        <span style={{ fontStyle: "italic" }}>
                          {e["publishedAt"]}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="each-category">
              <div className="Entertainment visible-category">
                <i
                  className="fa fa-spinner fa-spin"
                  style={this.state.loadStyle}
                ></i>
                {this.state.newsObj !== "" &&
                  newsObj.map((e) => (
                    <div
                      className="news-inf"
                      onClick={() => {
                        window.location.href = e["url"];
                      }}
                    >
                      <img src={e["urlToImage"]}></img>
                      <div className="title">{e["title"]}</div>
                      <div className="date">
                        {e["source"]["name"]} -{" "}
                        <span style={{ fontStyle: "italic" }}>
                          {e["publishedAt"]}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="each-category">
              <div className="General visible-category">
                {this.state.newsObj !== "" &&
                  newsObj.map((e) => (
                    <div
                      className="news-inf"
                      onClick={() => {
                        window.location.href = e["url"];
                      }}
                    >
                      <img src={e["urlToImage"]}></img>
                      <div className="title">{e["title"]}</div>
                      <div className="date">
                        {e["source"]["name"]} -{" "}
                        <span style={{ fontStyle: "italic" }}>
                          {e["publishedAt"]}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="each-category">
              <div className="Health visible-category">
                <i
                  className="fa fa-spinner fa-spin"
                  style={this.state.loadStyle}
                ></i>
                {this.state.newsObj !== "" &&
                  newsObj.map((e) => (
                    <div
                      className="news-inf"
                      onClick={() => {
                        window.location.href = e["url"];
                      }}
                    >
                      <img src={e["urlToImage"]}></img>
                      <div className="title">{e["title"]}</div>
                      <div className="date">
                        {e["source"]["name"]} -{" "}
                        <span style={{ fontStyle: "italic" }}>
                          {e["publishedAt"]}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="each-category">
              <div className="Science visible-category">
                {this.state.newsObj !== "" &&
                  newsObj.map((e) => (
                    <div
                      className="news-inf"
                      onClick={() => {
                        window.location.href = e["url"];
                      }}
                    >
                      <img src={e["urlToImage"]}></img>
                      <div className="title">{e["title"]}</div>
                      <div className="date">
                        {e["source"]["name"]} -{" "}
                        <span style={{ fontStyle: "italic" }}>
                          {e["publishedAt"]}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="each-category">
              <div className="Sports visible-category">
                <i
                  className="fa fa-spinner fa-spin"
                  style={this.state.loadStyle}
                ></i>
                {this.state.newsObj !== "" &&
                  newsObj.map((e) => (
                    <div
                      className="news-inf"
                      onClick={() => {
                        window.location.href = e["url"];
                      }}
                    >
                      <img src={e["urlToImage"]}></img>
                      <div className="title">{e["title"]}</div>
                      <div className="date">
                        {e["source"]["name"]} -{" "}
                        <span style={{ fontStyle: "italic" }}>
                          {e["publishedAt"]}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="each-category">
              <div className="Technology visible-category">
                {this.state.newsObj !== "" &&
                  newsObj.map((e) => (
                    <div
                      className="news-inf"
                      onClick={() => {
                        window.location.href = e["url"];
                      }}
                    >
                      <img src={e["urlToImage"]}></img>
                      <div className="title">{e["title"]}</div>
                      <div className="date">
                        {e["source"]["name"]} -{" "}
                        <span style={{ fontStyle: "italic" }}>
                          {e["publishedAt"]}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="random-search-news" style={this.state.search_div_style}>
          <div className="content">
            {this.state.randomnewsObj !== "" &&
              randomnewsObj.map((e) => (
                <div
                  className="news-inf"
                  onClick={() => {
                    window.location.href = e["url"];
                  }}
                >
                  <img src={e["urlToImage"]}></img>
                  <div className="title">{e["title"]}</div>
                  <div className="date">
                    {e["source"]["name"]} -{" "}
                    <span style={{ fontStyle: "italic" }}>
                      {e["publishedAt"]}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewsHome;
