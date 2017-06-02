/**
 * Created by zhanghongyuan on 2017/3/28.
 */
var twitterAPI = require('node-twitter-api');
var session = require('express-session');
var restFactory = require('./../service/restFactory.js');
var request = require('request');

var twitter = new twitterAPI({
    consumerKey: '4tXw0VLMJoKCYbTDrUyYcOmZN',
    consumerSecret: '3fGnezgtX4pHL1cHdGGXEPWFI6V9kXL1eWQJBgLFhwT6J7S9CI',
    callback: ' http://www.chehoubang.com/'
});
var token = {requrestToken:'',requrestTokenSecret:''};


// Getting a request token
twitter.getRequestToken(function (error, requestToken, requestTokenSecret, results) {
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } else {
        token.requrestToken = requestToken ;
        token.requrestTokenSecret = requestTokenSecret ;
        var url = twitter.getAuthUrl(token.requrestToken);
        console.log(url);
    }
});

//Getting an Access Token
exports.getTwitterAccessToken = function(req,res,next){
    var oauth_verifier = req.query.oauth_verifier ;
    console.log(oauth_verifier);
    twitter.getAccessToken(token.requrestToken,token.requrestTokenSecret, oauth_verifier,function(error, accessToken, accessTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            twitter.verifyCredentials(accessToken, accessTokenSecret, {}, function(error, data, response) {
                if (error) {
                    //something was wrong with either accessToken or accessTokenSecret
                    //start over with Step 1
                } else {
                    console.log(data["screen_name"]);


                    //查看某人的twitter信息   id是这个人的id  查看自己的查看不成功
                    // twitter.statuses("lookup", {id:results.user_id},
                    //     accessToken,
                    //     accessTokenSecret,
                    //     function(error, data, response) {
                    //         if (error) {
                    //             console.log("update error");
                    //         } else {
                    //             console.log("update success");
                    //         }
                    //     }
                    // );

                    // twitter.statuses("update", {
                    //         status: "Hello world, hello china !"
                    //     },
                    //     accessToken,
                    //     accessTokenSecret,
                    //     function(error, data, response) {
                    //         if (error) {
                    //             console.log("update error");
                    //         } else {
                    //             console.log("update success");
                    //         }
                    //     }
                    // );
                }
            });
        }
    });
}

