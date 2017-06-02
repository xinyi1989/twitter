// /**
//  * Created by zhanghongyuan on 2017/4/7.
//  */
// var watson = require('watson-developer-cloud');
// var fs     = require('fs');
//
// var dialog_service = watson.dialog({
//     username: '2ef984d1-0d23-4591-b193-4b2008658bf4',
//     password: 'bEECyEiLZRu9',
//     version: 'v1'
// });
//
// //Getting discovery service
// exports.getDialog = function(req,res,next){
//     dialog_service.getDialogs({}, function(err, dialogs) {
//         if (err)
//             console.log(err);
//         else
//             console.log(dialogs);
//     });
// }
//
//
// var params = {
//     name: 'my-dialog-zhy',
//     file: fs.createReadStream('./json/test.xml')
// };
//
// dialog_service.createDialog(params, function(err, dialog) {
//     if (err)
//         console.log(err)
//     else
//         console.log(dialog);
// });
//
//
//
// //创建和查询对话
// exports.getConverstion = function () {
//     var params = {
//         conversation_id: '',
//         dialog_id: '9fbb5dad-8f37-4b66-bc15-d2751a9dbeb7',
//         client_id: '123',
//         input:'1'
//     };
//
//     dialog_service.conversation(params, function(err, conversation) {
//         if (err)
//             console.log(err)
//         else
//             console.log(conversation);
//     });
// }
//
// // 获取profile
// exports.getProfile = function () {
//     var params = {
//         dialog_id: 'ae7e4e62-afc2-4d72-990f-b7e90faa91a1',
//         client_id: '4435',
//         name: ''
//     };
//
//     dialog_service.getProfile(params, function(err, profile) {
//         if (err)
//             console.log(err)
//         else
//             console.log(profile);
//     });
// }
//
// var xml2js = require('xml2js');
// var fs  = require("fs");
//
// // fs.readFile('./json/test.xml', 'utf8', function(err, data){
// //     xml2js.parseString(data, {explicitArray : false}, function(err, json) {
// //         console.log(json);
// //     });
// //
// // });
