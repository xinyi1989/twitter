/**
 * Created by zhanghongyuan on 2017/4/27.
 */

exports.interviewPostFun = function(req,res,next){
    var testA = req.body.testA;
    var testB = req.body.testB;
    var data ;
    if(testA == testB){
        console.log("testA is equal testB")
        data = 1 ;
    }
    else{
        console.log("testA is not equal testB");
        data = 0 ;
    }
    res.send({result:data})
}

exports.interviewGetFun = function(req,res,next){
    var testA = req.query.testA;
    var testB = req.query.testB;
    var data ;
    if(testA == testB){
        console.log("testA is equal testB")
        data = 1 ;
    }
    else{
        console.log("testA is not equal testB");
        data = 0 ;
    }
    res.send({result:data})
}