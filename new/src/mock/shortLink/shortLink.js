import Mock from 'mockjs';


if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {

    // 渠道链列表
    Mock.mock("/manage/getLink.do", "post", {
        "msg": "返回成功",
        "data|20": [{
            'appCode|1': ['24', '27'],
            'channelCategory|1': ['1', '2'],
            channelDescribe: '@string',
            channelGroup: '@string',
            channelName: '@string',
            channelTypeId: '@integer',
            customUrl: '@string',
            flag: 1,
            id: '@integer',
            isFree: 0,
            link: '@string',
            programId: 3
        }],
        "status": true
    });

    //表格
    Mock.mock("/manage/link/index.do", "post", {
        "msg": "返回成功",
        "data|100": [{
            'appCode|1': ['24', '27'],
            'channelCategory|1': ['1', '2'],
            channelDescribe: '@string',
            channelGroup: '@string',
            channelName: '@string',
            channelTypeId: '@integer',
            channelType: '@string',
            customUrl: '@url',
            flag: 1,
            id: '@integer',
            isFree: 0,
            link: '@url',
            programId: 3
        }],
        "status": true,
        total: "@natural(100, 200)"
    });

    //新建
    Mock.mock("/manage/link/add.do", "post", {
        "status": true,
        "msg": "修改成功"
    });
}