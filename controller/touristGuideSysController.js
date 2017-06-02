/**
 * Created by zhanghongyuan on 2017/4/27.
 */

var eventProxy = require('eventproxy');
var restFactory = require('./../libs/restFactory');
var https = require('https');
var fs = require('fs');
var util = require('util');


exports.touristGuideSysFun = function (req, res, next) {
    var ep = eventProxy.create();
    //错误处理
    ep.fail(function (err) {
        console.log("touristGuideSysFun error:" + util.inspect(err));
        res.send(null, err)
    });

    // 翻译 调用 language_translator 进行 日语->英语转换
    var inputText = req.body.inputText;
    var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

    var language_translator = new LanguageTranslatorV2({
        username: '7863b206-9171-404f-a2b2-74ee80f7bc7c',
        password: 'rHc4upnnbAAL',
        url: 'https://gateway.watsonplatform.net/language-translator/api/'
    });

    language_translator.translate({
            text: inputText, source: 'ja', target: 'en'
        },
        function (err, translation) {
            if (err) {
                ep.throw("language_translator error:");
                console.log('error:', err);
            }
            else {
                var tranInputText = translation.translations[0].translation;
                console.log(tranInputText);
                ep.emit("after_tranInputText", tranInputText);
            }
        });
    // 调用conversion进行语义分析 返回调用方法
    var ConversationV1 = require('watson-developer-cloud/conversation/v1');

    var conversation = new ConversationV1({
        username: '73b447c1-07e7-4e6e-8f14-41fa96fc2ad2',
        password: 'w2Bi3yyfzjDb',
        version_date: ConversationV1.VERSION_DATE_2017_02_03
    });
    ep.once("after_tranInputText", function (tranInputText) {
        conversation.message({
            input: {text: 'start'},
            workspace_id: '14efc62b-f7a7-4b1b-98b5-11bcd5be377c'
        }, function (err, response) {
            if (err) {
                ep.throw("conversation error:");
                console.error("conversation error:" + err);
            } else {
                ep.emit("after_conversationStart", response, tranInputText);
            }
        });
    })
    ep.once("after_conversationStart", function (res, tranInputText) {
        conversation.message({
            input: {text: tranInputText},
            context: res.context,
            workspace_id: '14efc62b-f7a7-4b1b-98b5-11bcd5be377c'
        }, function (err, response) {
            if (err) {
                ep.throw("conversation error:");
                console.error("conversation error:" + err);
            } else {
                var weatherInputTextObj = response.output;
                ep.emit("after_conversation", weatherInputTextObj,tranInputText);
            }
        });
    })
    // 根据返回的内容来获取天气情况
    ep.once("after_conversation", function (weatherInputTextObj,tranInputText) {
        //模拟HTTP Get请求
        var username = "c5a9b9c1-0790-4197-94c3-6723cb6874f6" ;
        var password = "A2WIaFyQ3A" ;
        var lat = weatherInputTextObj.lat;
        var lng = weatherInputTextObj.lng;
        var month = weatherInputTextObj.month;
        var ConversationOutputText = weatherInputTextObj.text[0];
        var options = {
            host: 'twcservice.mybluemix.net',
            port: 443,
            path: '/api/weather/v1/geocode/'+lat+'/'+lng+'/almanac/monthly.json?start=' + month,
            // authentication headers
            headers: {
                'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
            }
        };
        //this is the call
        var request = https.get(options, function (res) {
            var body = "";
            res.on('data', function (data) {
                body += data;
            });
            res.on('end', function () {
                //here we have the full response, html or json object
                var outputObj = JSON.parse(body);
                var tranOutputText = ConversationOutputText + outputObj.almanac_summaries[0].avg_lo;
                ep.emit("after_getAvgTemp",tranOutputText,tranInputText);
            })
            res.on('error', function (e) {
                console.log("Got error: " + e.message);
            });
        });
    })

    // 转换英语->日语
    ep.once('after_getAvgTemp',function(tranOutputText,tranInputText){
        language_translator.translate({
                text: tranOutputText, source: 'en', target: 'ja'
            },
            function (err, translation) {
                if (err) {
                    ep.throw("language_translator error:")
                    console.log('error:', err);
                }
                else {
                    var outputText = translation.translations[0].translation;
                    console.log(outputText);
                    var result = {
                        code : 0 ,
                        tranInputText:tranInputText,
                        tranOutputText:tranOutputText,
                        outputText:outputText
                    }
                    res.send(result);
                    //ep.emit("after_tranOutputText", outputText);
                }
            });
    })

    // text to speech
    ep.once('after_tranOutputText',function(outputText){
        var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
        var text_to_speech = new TextToSpeechV1({
            username: '1af07afb-d53d-411a-b25c-ef369fc122c8',
            password: 'IYdVpG2OLsPQ'
        });
        console.log("translator output text : " + outputText);
        var params = {
            text:"ロサンゼルスの五月の平均気温は57度です" ,
            voice: 'ja-JP_EmiVoice', // Optional voice
            accept: 'audio/wav'
        }
        // Pipe the synthesized text to a file
        text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));
        console.log('success');
    })
}
