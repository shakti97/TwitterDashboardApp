import React, { Component } from 'react';
import Axios from 'axios';
import DisplayTweet from '../Components/DisplayTweets/DisplayTweet';
import FilterTweets from '../Components/FilterTweets/FilterTweets';
import Header from '../Components/Header/Header';
import './Main.css';

const regexNumber=/^[0-9]+$/;
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName : '',
            searchValue : '',
            filterName : '',
            clientSideValidation : [], 
            tweets : [],
            filterTweets : []
        };
    }
    handleChange=(event)=>{
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        },()=>{
            console.log(this.state);
            if(this.state.searchValue===''){
                this.setState({
                    filterTweets : this.state.tweets
                })
            }
        })
    }
    searchTweets=(event)=>{
        event.preventDefault();
        console.log('search Tweet');
        if(this.state.filterName==='tweetLength'){
            if(!regexNumber.test(this.state.searchValue)){
                this.setState({
                    clientSideValidation : ['tweetLength']
                })
            }
            else{
                console.log('Calling filter By Length');
                this.filterByLength(this.state.searchValue);
            }
        }
        if(this.state.filterName==='textSearch'){
            this.filterByText(this.state.searchValue);
        }
    }
    filterByText=(searchedText)=>{
        var filterTweets=this.state.tweets;
        var filteredTweets=filterTweets.filter(tweet=>{
            if((tweet.text).includes(searchedText)){
                return tweet;
            }
        })
        this.setState({
            filterTweets : filteredTweets
        },()=>{
            console.log('filter By Text',this.state.filterTweets);
        })
    }
    filterByLength=(tweetLength)=>{
        var filterTweets=this.state.tweets;
        var filteredTweets=filterTweets.filter((tweet)=>{
            console.log("tweet Length "+tweet.length+" search tweet length "+tweetLength );
            if(tweet.length==tweetLength){
                return tweet;
            }
        })
        console.log('filterTweet',filteredTweets);
        this.setState({
            filterTweets : filteredTweets
        })
    }
    componentDidMount(){
        this.getMyServerTweets();
    }
    getTweetsLength=()=>{
        var tweetsArray=[];
        this.state.tweets.forEach(tweet=>{
            tweet.length=(tweet.text).length;
            tweetsArray.push(tweet);
        })
        this.setState({
            tweets : tweetsArray,
            filterTweets : tweetsArray
        },()=>{
            console.log(this.state.tweets);
        })
    }
    getMyServerTweets=(userName='Shakti2397')=>{
        Axios.get('http://localhost:8080/tweets/'+userName)
        .then(response=>{
            console.log(response);
            this.setState({
                tweets : response.data,
                filterTweets : response.data
            },()=>{
                console.log(this.state.tweets);
                this.getTweetsLength();
            })
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="mainContainer">
                    <Header/>
                    <div className="container">
                        <FilterTweets searchValue={this.state.searchValue} searchTweets={this.searchTweets} clientSideValidation={this.state.clientSideValidation} filterName={this.state.filterName} handleChange={this.handleChange}/>
                        <DisplayTweet tweets={this.state.filterTweets}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Main;