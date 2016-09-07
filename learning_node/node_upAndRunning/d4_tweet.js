/**
 * Created by hzy on 16/9/6.
 */
var express = require('express')
var bodyParser = require('body-parser')

var app = express();
app.listen(8000)

var tweets = [];

app.get('/', function (req, res) {
   res.send('Welcome to Node Twitter'); 
});

app.post('/send', bodyParser(), function (req, res) {
    if( req.body && req.body.tweet){
        tweets.push(req.body.tweet);
        res.send({status:"ok", message:"Tweet received"});
    } else {
        res.send({status:"nok", message:"No Tweet received"});
        
    }
})


app.get('/tweets', function (req, res) {
    res.send(tweets);
});