/**
 * 登录组件
 * User: gaogy
 * Date: 2017/07/05
 * Time: 11:23
 */
import loginService from 'SERVICE/loginService'

// Action Type
const USERNAME_CHANGE = 'USERNAME_CHANGE';
const PWD_CHANGE = 'PWD_CHANGE';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Action Creator
const usernameChange = (username) => {
    return {
        type: 'USERNAME_CHANGE',
        payload: {
            username: username
        }
    }
};

const pwdChange = (pwd) => {
    return {
        type: 'PWD_CHANGE',
        payload: {
            pwd: pwd
        }
    }
};

const userLogin = (userInfo) => {
    return {
        type: 'LOGIN',
        payload: {
            loginInfo: loginService.login(userInfo)
        }
    }
};

const userLogout = (userName) => {
    return {
        type: 'LOGOUT',
        payload: {
            logoutInfo: loginService.logout(userName)
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    usernameChange, pwdChange, userLogin, userLogout
}

// Action handlers for Reducer
export const ACTION_HANDLERS = {
    [USERNAME_CHANGE]: (login, { payload }) => Object.assign({}, login, { username: payload.username }),
    [PWD_CHANGE]: (login, { payload }) => Object.assign({}, login, { pwd: payload.pwd }),
    [LOGIN]: (login, { payload }) => Object.assign({}, login, { loginInfo: payload.loginInfo }),
    [LOGOUT]: (login, { payload }) => Object.assign({}, login, { loginInfo: payload.loginInfo })
};
