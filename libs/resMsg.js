/**
 * Copyright (c) 2016-present Sosoqipei.com
 * Created by Justin on 2016/4/6.
 * Version:V.1.0.0
 * Account information server.
 * Message information handler.
 */
var messageInfo = require("./codeMsg");

/**
 * The message constructor
 * @param msgName
 * @param msgResult
 * @param msgDesc
 * @constructor
 */
function Message(msgName,msgResult,msgDesc){

    // Singleton pattern
    if (!(this instanceof Message))
        return new Message(msgName,msgResult,msgDesc);
    var msgObj=messageInfo[msgName]||messageInfo["InternalError"];
    this.code=msgObj.code;
    var msgStr=msgDesc||"";
    this.message = "["+messageInfo["server_name"] +"] "+ msgObj.message + msgStr;
    msgName==="success"?this.result = msgResult||{}:this.stack=(msgResult && msgResult.stack) || msgResult||{};
}

module.exports = Message;