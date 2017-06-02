//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var Twitter = require('twitter-node-client').Twitter;

//Get this data from your twitter apps dashboard
 var config = {
    "consumerKey": 'Llf6A41zujyX4H4iUOlpI21Hc',
    consumerSecret: '37fWgos9cHyfOXvwWHANxCW1aaFn83YrujHgiHtRYXIiSNnCDv',
    accessToken: '850186954725634048-4aHlydIWfiWE4kjlDx2IcumSjzju07y',
    accessTokenSecret: 'hnVqj1cOPKp3GB74dU3fqFYeurNT8lIXC93HOGfibmsxe',
    "callBackUrl": "http://bidder.sosoqipei.com/#/home"
}

exports.getUserInfo = function(req,res,next){

    var twitter = new Twitter(config);
    console.log(11)
    twitter.getUserTimeline({ screen_name: 'BoyCook', count: '10'}, function(err){
        console.log(err);
    }, function(rows){
        console.log(rows);
    });

    // twitter.getMentionsTimeline({ count: '10'}, error, success);
    //
    // twitter.getHomeTimeline({ count: '10'}, error, success);
    //
    // twitter.getReTweetsOfMe({ count: '10'}, error, success);
    //
    // twitter.getTweet({ id: '1111111111'}, error, success);
    //
    //
    // twitter.getSearch({'q':'#haiku','count': 10}, error, success);
    //
    // twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 10, 'result\_type':'popular'}, error, success);
}