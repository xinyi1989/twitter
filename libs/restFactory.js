
var rest = require("restler");

/**
 * GET类型REST请求方法工厂
 * @param baseUrl
 * @param subUrl
 * @returns {Function}
 */
var createRestGetFunc = function (baseUrl, subUrl) {
    return function (addUrl, callback) {
        var reqUrl = baseUrl + subUrl;
        if (addUrl) {
            reqUrl += addUrl;
        }
        console.log("reqUrl: [" + reqUrl + "]");

        // GET 请求
        var headers = {
            'Authorization': 'Basic ' + new Buffer("c5a9b9c1-0790-4197-94c3-6723cb6874f6" + ':' + "A2WIaFyQ3A").toString('base64')
        }
        reqUrl.headers = headers ;
        rest.get(reqUrl)

            // 调用成功正确返回的场合
            .on('success', function (result, res) {
                //logger.debug(JSON.stringify(result));
                callback(null, result, res);
            })

            // 调用成功，http返回code为4xx的场合
            .on('fail', function (result, res) {
                console.log(JSON.stringify(result));
                callback({
                    errHttpCode: res.statusCode,
                    errMessage: res.statusMessage
                });
            })

            // 调用发生错误的场合
            .on('error', function (err, res) {
                console.log(JSON.stringify(err));
                callback(err);
            })

            // 请求超时的场合
            .on('timeout', function (ms) {
                callback({
                    errCode: "ETIMEOUT",
                    errMessage: "Didn't return within " + ms + "ms"
                });
            });
    };
};

/**
 * POST类型REST请求方法工厂
 * @param baseUrl
 * @param subUrl
 * @returns {Function}
 */
var createRestPostFunc = function (baseUrl, subUrl) {
    return function (addUrl, data, callback) {
        var reqUrl = baseUrl + subUrl;
        if (addUrl) {
            reqUrl += addUrl;
        }
        console.log("reqUrl: " + reqUrl );

        // POST 请求
        rest.post(reqUrl, {data: data})

            // 调用成功正确返回的场合
            .on('success', function (result) {
                //logger.debug(JSON.stringify(result));
                callback(null, result);
            })

            // 调用成功，http返回code为4xx的场合
            .on('fail', function (result, res) {
                logger.error(JSON.stringify(result));
                callback({
                    errHttpCode: res.statusCode,
                    errMessage: res.statusMessage
                });
            })

            // 调用发生错误的场合
            .on('error', function (err, res) {
                logger.error(JSON.stringify(err));
                callback(err);
            })

            // 请求超时的场合
            .on('timeout', function (ms) {
                callback({
                    errCode: "ETIMEOUT",
                    errMessage: "Didn't return within " + ms + "ms"
                });
            });
    };
};
exports.createRestPostFunc = createRestPostFunc ;
exports.createRestGetFunc = createRestGetFunc;

// // 导入力洋vin数据
// exports.vinDataImport = createRestPostFunc();

// 根据城市ID获取商圈
exports.getLocation = createRestGetFunc("http://maps.google.com/maps/api/geocode/json","?address=");


exports.getTemp = createRestGetFunc("https://twcservice.mybluemix.net/api/weather/v1/geocode/33.40/-83.42/almanac/monthly.json","?start=02");


