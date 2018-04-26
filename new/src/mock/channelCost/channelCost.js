import Mock from 'mockjs';

if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {



    // 渠道链列表
    Mock.mock("/manage/channel/costList.do", "post", {
        "msg": "返回成功",
        "data|20": [{
            'appCode|1': ['24', '27'],
            channelGroup: '@string',
            channelName: '@string',
            day: '@datetime("yyyy-MM-dd")',
            'os|1': ['iOS', 'Android'],
            unitPrice: '@float(0,1000)'
        }],
        "status": true
    });

    // 文件上传
    Mock.mock("/manage/channel/upload.do", "post", {
        "msg": "导入成功",
        "status": true
    });

}