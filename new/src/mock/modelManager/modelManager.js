import Mock from 'mockjs';

if (window.location.search.indexOf("debug") > 0 || window.location.search.indexOf("web_ci") > 0) {


    // 厂商列表
    Mock.mock("/common/firm.do", "post", {
        "msg": "返回成功",
        "data|20": [{
            id: '@integer',
            firm: '@string'
        }],
        "status": true
    });

    // 品牌列表
    Mock.mock("/common/brand.do", "post", {
        "msg": "返回成功",
        "data|20": [{
            id: '@integer',
            firm: '@string',
            brand: '@string'
        }],
        "status": true
    });

    Mock.mock("/os/model/table.do", "post", {
        "msg": "返回成功",
        "data|20": [{
            'appCode|1': ['24', '27'],
            brand: '@string',
            deviceModel: '@string',
            firm: '@string',
            id: '@increment',
            'os|1': ['Android', 'IOS']
        }],
        "status": true,
        "total": 20
    });

    //创建
    Mock.mock("/os/firm/add.do", "post", {
        "data": "操作成功",
        "state": "success"
    });

    //编辑
    Mock.mock("/os/model/updateFirm.do", "post", {
        "data": "操作成功",
        "state": "success"
    });

    //check
    Mock.mock("/os/firm/check.do", "post", {
        "emptyIdentifier": 1,
        "state": "error",
        "error": "名称重复"
    });
}