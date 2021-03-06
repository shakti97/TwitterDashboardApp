import React, { Component } from 'react';
import './DisplayTweet.css';

const DisplayTweet=(props)=>{
    return (
        <React.Fragment>
            {props.tweets.map((tweet,index)=>{
                return (
                    <div className='tweet' key={index}>{tweet.text}</div>
                )
            })
            }
        </React.Fragment>
    );
}

export default DisplayTweet;