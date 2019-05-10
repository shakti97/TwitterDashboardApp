import React, { Component } from 'react';
import Twitter from 'twitter';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName : ''
        };
    }
    componentDidMount(){
        this.getTweets();
    }
    getTweets=()=>{
        var client = new Twitter({
            consumer_key: 'FNOvdUa4h5QCrwxJ4GhF9kRVG',
            consumer_secret: 'J18izC0u1cFU653DUxLgedxwFBIAGd9kbocx6Doqf82OPRMwtj',
            access_token_key: '',
            access_token_secret: ''
        });
           
        var params = {q: 'Shakti2397'};
        client.get('search/tweets', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
        });
    }
    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        );
    }
}

export default Main;