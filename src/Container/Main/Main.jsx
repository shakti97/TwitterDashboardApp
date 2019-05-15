import React, { Component } from "react";
import Axios from "axios";
import DisplayTweet from "../../Components/DisplayTweets/DisplayTweet";
import FilterTweets from "../../Components/FilterTweets/FilterTweets";
import Header from "../../Components/Header/Header";
import "./Main.css";
import $ from "jquery";
import Modal from "../Modal/Modal";

const regexNumber = /^[0-9]+$/;
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      show: "",
      searchValue: "",
      filterName: "",
      clientSideValidation: [],
      serverSideValidation : [],
      tweets: [],
      hashTagArray : [],
      filterTweets: []
    };
  }
  handleChange = event => {
    event.preventDefault();
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        console.log(this.state);
        if (this.state.searchValue === "") {
          this.setState({
            filterTweets: this.state.tweets
          });
        }
      }
    );
  };
  searchTweets = event => {
    event.preventDefault();
    console.log("search Tweet");
    if (this.state.filterName === "tweetLength") {
      if (!regexNumber.test(this.state.searchValue)) {
        this.setState({
          clientSideValidation: ["tweetLength"]
        });
      } else {
        console.log("Calling filter By Length");
        this.filterByLength(this.state.searchValue);
      }
    }
    if (this.state.filterName === "textSearch") {
      this.filterByText(this.state.searchValue);
    }
    if(this.state.filterName==='hashTags'){
      this.getMultipleSelectedValue();
    }
  };
  filterByText = searchedText => {
    var filterTweets = this.state.tweets;
    var filteredTweets = filterTweets.filter(tweet => {
      if (tweet.text.includes(searchedText)) {
        return tweet;
      }
    });
    this.setState(
      {
        filterTweets: filteredTweets
      },
      () => {
        console.log("filter By Text", this.state.filterTweets);
      }
    );
  };
  filterByLength = tweetLength => {
    var filterTweets = this.state.tweets;
    var filteredTweets = filterTweets.filter(tweet => {
      console.log(
        "tweet Length " + tweet.length + " search tweet length " + tweetLength
      );
      if (tweet.length == tweetLength) {
        return tweet;
      }
    });
    console.log("filterTweet", filteredTweets);
    this.setState({
      filterTweets: filteredTweets
    });
  };
  componentDidMount() {
    this.showModal();
  }
  getTweetsLength = () => {
    var tweetsArray = [];
    this.state.tweets.forEach(tweet => {
      tweet.length = tweet.text.length;
      tweetsArray.push(tweet);
    });
    this.setState(
      {
        tweets: tweetsArray,
        filterTweets: tweetsArray
      },
      () => {
        console.log(this.state.tweets);
        this.getHashTagArray();
      }
    );
  };
  getHashTagArray=()=>{
    var hashTagArray=[];
    this.state.tweets.forEach((tweet,index)=>{
      tweet.entities.hashtags.forEach(hash=>{
        var hashObject={
          value : hash.text,
          tweetIndex : index
        }
        hashTagArray.push(hashObject);
      })
    })
    this.setState({
      hashTagArray : hashTagArray
    },()=>{
      console.log(this.state.hashTagArray);
    })
  }
  getMultipleSelectedValue=()=>{
    var tweetsArray=[];
    var selectedTagArray=[];
    var x=document.getElementById("hashTagArray");
    for (var i = 0; i < x.options.length; i++) {
        if(x.options[i].selected ==true){
            this.state.hashTagArray.forEach(hash=>{
              if(hash.value===x.options[i].value){
                  selectedTagArray.push(hash.tweetIndex);              
              }
            })
        }
    }
    selectedTagArray=[...new Set(selectedTagArray)];
    selectedTagArray.forEach(tagIndex=>{
      tweetsArray.push(this.state.tweets[tagIndex]);
    })
    this.setState({
      filterTweets: tweetsArray
    });
  }
  getMyServerTweets = (userName = "Shakti2397") => {
    Axios.get("https://ancient-ocean-37070.herokuapp.com/tweets/" + userName).then(response => {
      console.log(response);
      if(response.data.error){
            this.setState({
                serverSideValidation : ['NameError']
            })
            return ;
      }
      this.setState(
        {
          tweets: response.data,
          filterTweets: response.data
        },
        () => {
          console.log(this.state.tweets);
          this.closeModal();
          this.getTweetsLength();
        }
      );
    })
    .catch(error=>{
        console.log(error.response)
    })
  };
  showModal = () => {
    this.setState({
      show: true
    });
  };
  closeModal = () => {
    this.setState({
      show: false
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="mainContainer">
          <Header />
          <div className="container">
            <FilterTweets
              searchValue={this.state.searchValue}
              searchTweets={this.searchTweets}
              clientSideValidation={this.state.clientSideValidation}
              filterName={this.state.filterName}
              handleChange={this.handleChange}
              hashTagArray={this.state.hashTagArray}
            />
            {!this.state.show && <DisplayTweet tweets={this.state.filterTweets} />}
            {this.state.show && (
              <Modal
                show={this.state.show}
                modalTitle="User Modal"
                handleClose={this.closeModal}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter UserName"
                  name="userName"
                  onChange={this.handleChange}
                />
                {this.state.serverSideValidation.includes('NameError') && <div className='redColor'>No Name Exist! Try New Name</div> }
                <div className="submitButton">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.getMyServerTweets(this.state.userName)}
                  >
                    Submit
                  </button>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
