/**
 * 对应后端涉及的 API
 * User: gaogy
 * Date: 2017/04/18
 * Time: 17:26
 */

import xhr from './xhr/';

class ReportService {

    /**
     * 用户登录
     * @returns {{}}
     */
    login(userInfo) {
        let loginInfo = {};
        xhr({
            url: '/login',
            async: false,
            data: {username: userInfo.username, password: userInfo.pwd},
            success: function (data) {
                if (data.code == '1') {
                    loginInfo = data;
                    sessionStorage.setItem('username', userInfo.username);
                }
            }
        });
        return loginInfo;
    }
    /**
     * 用户注销
     * @returns {{}}
     */
    logout(userName) {
        xhr({
            url: '/logout.do',
            type: 'GET',
            async: false
        });
    }
}

// 导出实例化对象
export default new ReportService()
