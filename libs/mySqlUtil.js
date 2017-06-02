/**
 * Created by T410 on 2015/6/2.
 * 数据库访问层（单粒模式）
 */

var mysql=require("mysql"),
    config=require("./../config/index"),
    // 记录日志相关
    util=require('util'),
    searchLogger=require('swishlog').logger(__filename);

var mysqlpool=null;

/**
 * 初始化mysqlpool
 */
function initMysqlPool()
{
    mysqlpool=mysql.createPool(config.configInfo.dbConfig);
}

/**
 * 执行SQL语句
 * @param sqlReq    SQL语句
 * @param callback  回调函数
 */
exports.query=function(sqlReq,callback){
    //searchLogger.debug("参数&执行SQL:"+util.inspect(sqlReq));
    if(!mysqlpool){
        initMysqlPool();
    }
    if(!sqlReq){
        searchLogger.error("sqlReq 查询对象为空!");
        return callback(new Error("sqlReq 查询对象为空!"),null);
    }
    var sql_pattern=sqlReq.sql||"";
    if(sql_pattern.length==0){
        searchLogger.error("SQL 语句为空!");
        return callback(new Error("SQL 语句为空!"),null);
    }

    mysqlpool.getConnection(function(err,connection){
        if(err){
            searchLogger.error("mysql数据库连接错误："+util.inspect(err));
            callback(err,null);
        }
        else
        {
            // 探测connection可用性
            connection.ping(function(err){
                if(err)
                {
                    searchLogger.error("获取的connection连接不可用,err："+util.inspect(err));

                    // 直接销毁
                    connection.destory();
                    return callback(err,null);
                }
                else {
                    //searchLogger.debug("获取可用connection数据库连接成功!");
                    connection.config.queryFormat=function(query,values){
                        if(!values){
                            return query;
                        }
                        return query.replace(/\:(\w+)/g,function(txt,key){
                            if(values.hasOwnProperty(key)){
                                return this.escape(values[key]);
                            }
                            return txt;
                        }.bind(this));
                    };
                    // 执行查询
                    //searchLogger.debug("执行SQL查询:::开始!");
                    connection.query(sql_pattern,sqlReq.params,function(err,rows){
                        connection.release();
                        //searchLogger.debug("执行SQL查询:::结束!");
                        callback(err,rows);
                    });
                }
            });
        }
    });
};

/**
 * 执行事务
 * @param callback 回调函数
 */
exports.processTransaction = function (callback) {
    if (!mysqlpool) {
        initMysqlPool();
    }

    mysqlpool.getConnection(function (err, connection) {

        if (err) {
            searchLogger.error("从连接池中获取mysql数据库连接发生错误err："+util.inspect(err));
            return callback(null);
        }
        else
        {
            // 探测connection可用性
            connection.ping(function(err){
                if(err)
                {
                    searchLogger.error("获取的connection连接不可用,err："+util.inspect(err));

                    // 直接销毁
                    connection.destory();
                    return callback(null);
                }
                else
                {
                    searchLogger.debug("获取connection数据库连接成功!");
                    connection.config.queryFormat = function (query, values) {
                        if (!values) return query;
                        return query.replace(/\:(\w+)/g, function (txt, key) {
                            if (values.hasOwnProperty(key)) {
                                return this.escape(values[key]);
                            }
                            return txt;
                        }.bind(this));
                    };
                    callback(connection);
                }
            });
        }
    });
};


/**
 * One sql statement store multiple record.
 * @param sqlReq
 * @param callback
 * @returns {*}
 */
exports.batchinsert=function(sqlReq,callback){
    // logger.debug("Query request object:"+util.inspect(sqlReq));
    if(!mysqlpool){
        initMysqlPool();
    }
    if(!sqlReq){
        logger.error("Query request object is empty, the query does not perform!");
        return callback(new Error("Query request object is empty, the query does not perform!"),null);
    }
    var sql_pattern=sqlReq.sql||"";
    if(sql_pattern.length==0){
        logger.error("Query SQL statements is empty, the query does not perform!");
        return callback(new Error("Query SQL statements is empty, the query does not perform!"),null);
    }

    mysqlpool.getConnection(function(err,connection){
        if(err){
            logger.error("get connection error:"+util.inspect(err));
            callback(err,null);
        }
        else
        {
            connection.ping(function(err){
                if(err)
                {
                    logger.error("The connection is not available,err："+util.inspect(err));

                    connection.destory();
                    return callback(err,null);
                }
                else {
                    connection.config.queryFormat='';
                    connection.query(sql_pattern,sqlReq.params,function(err,rows){
                        connection.release();
                        callback(err,rows);
                    });
                }
            });
        }
    });
};