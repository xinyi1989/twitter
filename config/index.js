/**
 * Created by Justin on 2015/8/2.
 */
var logger = require('swishlog').logger(__filename);
var config = {
    local:require('./local'),
    development: require('./development'),
    test:require('./test'),
    production: require('./production')
};

logger.debug("order service NODE_ENV: " + process.env.NODE_ENV );
var envConfig = config[process.env.NODE_ENV || 'development'];

function initConfig() {
    this.dbConfig = envConfig.dbConfig ;
    // 系统配置
    this.sysConfig = {
        "rec_deal":["PAID","DELIVERED","FINISH"],
        "his_deal":["COMPLETED"],
        "soudou_register":"200",
        "soudou_status":{
            NORMAL:'NORMAL', //正常
            FREEZE:'FREEZE'  //冻结
        },
        itemtype:{
            BID:'BID',  //抢单
            PAY:'PAY'  //充值
        },
        // 钱包钱流向 1:流入/2:支出
        record_direction: {
            in: '1',
            out: '2',
            other: '3'
        },
        // trade_way  1：采购/2：退货/3：其他
        trade_way: {
            purchase: '1',
            returned_purchase: '2',
            other: '3'
        },
        trade_type: {
            wallet_recharge: '1',
            wallet_withdraw: '2',
            order_pay: '3',
            order_receive: '4',
            wallet_refund: '5',
            soudou_pay: '6',
            sys_present: '7',
            integral_discount: '8'
        },
        Channel: {
            "wx_pub": "wechat",
            "wx": "wechat",
            "wx_pub_qr":"wechat",
            "alipay_pc_direct":"Alipay",
            "upacp_pc": "bankcard"
        },

        buyerAppID: "app_aXfLGSXvbDu1DOWD",
        sellerAppID: "app_OKGyv544K0C40urn",
        ApiKey: envConfig.ApiKey,
        pay_interval:1
    };
}

var configInfo = new initConfig();
exports.configInfo = configInfo;