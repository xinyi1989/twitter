// /**
//  * Created by zhanghongyuan on 2017/4/3.
//  */
//
//
// //Getting discovery service
// exports.getDiscovery = function(req,res,next){
//     var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
//
//     var discovery = new DiscoveryV1({
//         username: '5009190c-6fb8-4e61-9795-d213b5100d02',
//         password: 'KGBGEEc7nWUy',
//         version_date: DiscoveryV1.VERSION_DATE_2016_12_15
//     });
//
//     discovery.query({
//         environment_id: '36138421-5eca-44bc-ae65-79cfcf3ca0ed',
//         collection_id: '7d400de2-d816-4da9-89db-c56be64cdd37',
//         query:'123123132'
//     }, function(err, response) {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(JSON.stringify(response, null, 2));
//         }
//     });
// }
//
// var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
// var personality_insights = new PersonalityInsightsV3({
//     username: '1460614f-c21d-4925-9ca1-a0a62ae5762f',
//     password: 'HRiB8dNBLxXr',
//     version_date: '2016-10-20'
// });
//
// var params = {
//     // Get the content items from the JSON file.
//     content_items: require('./../json/profile.json').contentItems,
//     consumption_preferences: true,
//     raw_scores: true,
//     headers: {
//         'accept-language': 'en',
//         'accept': 'application/json'
//     }
// };
// // personality_insights.profile(params, function(error, response) {
// //         if (error)
// //             console.log('Error:', error);
// //         else
// //             console.log(JSON.stringify(response, null, 2));
// //     }
// // );
// //
// // personality_insights.profile({
// //         text: 'Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...Enter more than 100 unique words here...',
// //         consumption_preferences: true
// //     },
// //     function (err, response) {
// //         if (err)
// //             console.log('error:', err);
// //         else
// //             console.log(JSON.stringify(response, null, 2));
// //     });