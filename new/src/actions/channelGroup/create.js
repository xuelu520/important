import reqwest from 'reqwest';
/**
 * 创建
 * @method create
 * @param param {Object} 参数
 * @param id {String} 参数
 * @return {Function}
 */
const create = (data) => {

    return function(dispatch) {

        console.log('###add请求参数###',data);

        reqwest({
            url: '/manage/channel/add.do',
            method: 'post',
            data: data,
            type: 'json'
        }).then((msg) => {
            console.log('---add请返回---',msg);
            window.location.href = '/#/manager/channelGroup';
        });
    }
}

export {
    create
}