/**
 * Created by Justin on 2015/6/30.
 * 公用的工具类
 */
var moment=require('moment');
/**
 * MM月DD日HH:mm 日期格式化
 * @param date
 * @returns {*}
 */
exports.dateFormat = function (date) {
    return moment(date).format('MM月DD日HH:mm');
}

/**
 * 时间转义
 * @param date
 */
exports.dateFormatMean=function(dateStr){
    var dateTimeStamp=Date.parse(dateStr.replace(/-/gi,"/"));
    return getDateDiff(dateTimeStamp);
}

/**
 * 获取from到to之间的随机正整数
 * @param from
 * @param to
 */
exports.getRandomInt=function(from,to){
    var c = from-to+1;
    return Math.floor(Math.random() * c + to);
}

/**
 * 日期的人性化显示
 * 定时刷新日期显示
 */
function getDateDiff(dateTimeStamp){
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    if(monthC>=1){
        result= parseInt(monthC) + "个月前";
    }
    else if(weekC>=1){
        result= parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
        result= parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
        result= parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
        result= parseInt(minC) +"分钟前";
    }else
        result="刚刚";

    return result;
}

/**
 * 获取当前linux时间戳
 */
exports.getLinuxTimeStamp =  function(date){
    if (typeof(date) == 'undefined')
        return Date.parse(new Date())/1000;
    else
        return Date.parse(new Date(date))/1000;
}

/**
 * 取下一个月份
 */
exports.getNexMonth=function(month){
    var arr = month.split('-');
	//kevin 2015-12-23 修改月份为12月的时候bug,当前年增加1 start
    var year;
    var month2 = parseInt(arr[1]) + 1;
    if (parseInt(month2) >=13) {
        month2 = 1;
        year=parseInt(arr[0])+1;
    } else {
        year=parseInt(arr[0]);
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    return year + '-' + month2;
	//kevin 2015-12-23 修改月份为12月的时候bug,当前年增加1 end
}

/**
 * 判断是否是符合YYYY-mm格式的日期
 */
exports.isMonth = function(str){
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})$/);
    if(r==null)return false;
    var d= new Date(r[1], r[3]-1);
    return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]);
}
