const express= require('express');
const bodyParser = require('body-parser');
const cors=require('./middlewares/cors.js');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

var Twitter=require('twitter');
var client = new Twitter({
    consumer_key: 'FNOvdUa4h5QCrwxJ4GhF9kRVG',
    consumer_secret: 'J18izC0u1cFU653DUxLgedxwFBIAGd9kbocx6Doqf82OPRMwtj',
    access_token_key: '',
    access_token_secret: ''
});
// getTweets=()=>{
//     var client = new Twitter({
//         consumer_key: 'FNOvdUa4h5QCrwxJ4GhF9kRVG',
//         consumer_secret: 'J18izC0u1cFU653DUxLgedxwFBIAGd9kbocx6Doqf82OPRMwtj',
//         access_token_key: '',
//         access_token_secret: ''
//     });
       
//     var params = {q: 'Shakti2397'};
//     client.get('search/tweets', params, function(error, tweets, response) {
//     if (!error) {
//         console.log(tweets);
//         tweetsObjectArray=tweets;
//     }
//     });
// }
app.get('/tweets/:userName',(req,res)=>{
    // console.log('hi request coming',request.params.userName);
    var params={screen_name: req.params.userName , count : 10}
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
            res.send(tweets);
        }
        else{
            console.log('error',error);
            res.send({
                error : true
            })
        }
    });
})


app.listen(process.env.PORT || 8080,()=>{
    console.log('Server Started');
})