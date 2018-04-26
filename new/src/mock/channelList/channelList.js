import Mock from 'mockjs';


if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {

    // 渠道类型
    Mock.mock("/manage/channelType.do", "post", {
        "msg": "返回成功",
        "data": [{
            "name": "渠道类型1",
            "id": 1
        }],
        "status": true
    });

    // 数据列表
    Mock.mock("/manage/list/index.do", "post", {
        "status": true,
        "msg": "返回成功",
        "data|10": [{
            "appCode|1": ['24', '27'],
            "channelCategory|1":  ['1', '2'],
            "channelDescribe":   "@cword(3,5)",
            "channelGroup":   "@string",
            "channelName":   "@string",
            "channelType":   "@string",
            "channelTypeId":   "integer",
            "flag":   "@float(10, 10.0, 2, 2)",
            "id":   "@natural(1000, 10000)",
            "isFree|1":  ['0', '1'],
            "programId":   "@natural(1000, 10000)",
            "showCol":   "@natural(1000, 10000)"
        }],
        "total": "@natural(100, 999)"
    });

    // 新建|编辑->组列表
    Mock.mock("/manage/channel/groupList.do", "post", {
        "status": true,
        "msg": "返回成功",
        "data|10": [{
            "appCode": "@natural(1000, 10000)",
            "channelCategory":   "@natural(1000, 10000)",
            "channelDescribe":   "@datetime('yyyy-MM-dd')",
            "channelGroup":   "@natural(1000, 10000)",
            "channelName":   "@string",
            "channelTypeId":   "@natural(1000, 10000)",
            "flag":   "@float(10, 10.0, 2, 2)",
            "id":   "@natural(1000, 10000)",
            "isFree":   "@natural(1000, 10000)",
            "programId":   "@natural(1000, 10000)",
            "showCol":   "@natural(1000, 10000)"
        }]
    });

    // 新建|编辑->更换渠道组名称时
    Mock.mock("/manage/get.do", "post", {
        "status": true,
        "msg": "返回成功",
        "data": {
            "appCode|1": [27, 24],
            "channelCategory|1": [1, 2],
            "channelDescribe":   "@string",
            "channelGroup":   "@string",
            "channelName":   "@string",
            "channelType":   "@string",
            "channelTypeId":   1,
            "flag":   "@integer",
            "id":   "@integer",
            "isFree|1":   [0, 1],
            "programId":   "@integer",
            "showCol":   "1",
            "reduce|1": [0, 10, 20, 30, 55]
        }
    });

    //编辑
    Mock.mock("/manage/channel/update.do", "post", {
        "status": true,
        "msg": "修改成功"
    });

    //新建
    Mock.mock("/manage/channel/add.do", "post", {
        "status": true,
        "msg": "修改成功"
    });

    //新建->校验名称
    Mock.mock("/manage/channel/nameCheck.do", "post", {
        ok: "",
        state: "success"
    });
}