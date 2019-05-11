import React, { Component } from 'react';
import Twitter from 'twitter';
import Axios from 'axios';
import DisplayTweet from '../Components/DisplayTweets/DisplayTweet';
import FilterTweets from '../Components/FilterTweets/FilterTweets';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName : '',
            tweets : [],
            filterTweets : []
        };
    }
    handleChange=(event)=>{
        event.preventDefault();
        var targetName=event.target.name;
        this.setState({
            [event.target.name] : event.target.value
        },()=>{
            if(targetName==='filterName'){

            }
        })
    }
    componentDidMount(){
        this.getMyServerTweets();
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
            })
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <FilterTweets searchValue={this.state.searchValue} filterName={this.state.filterName} handleChange={this.handleChange}/>
                    <DisplayTweet tweets={this.state.filterTweets}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Main;