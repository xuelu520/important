/**
 * 登录组件
 * User: gaogy
 * Date: 2017/07/05
 * Time: 11:23
 */

// Action Type
const OPEN_MENU = 'OPEN_MENU';
const SELECT_MENU = 'SELECT_MENU';

// Action Creator
const openMenu = (menuId) => {
    return {
        type: 'OPEN_MENU',
        payload: {
            openMenuId: menuId
        }
    }
};

const selectMenu = (menuId) => {
    return {
        type: 'SELECT_MENU',
        payload: {
            activeMenuId: menuId
        }
    }
};

/* default 导出所有 Actions Creator */
export default {
    openMenu, selectMenu
}

// Action handlers for Reducer
export const ACTION_HANDLERS = {
    [OPEN_MENU]: (sidebar, { payload }) => Object.assign({}, sidebar, { openMenuId: payload.openMenuId }),
    [SELECT_MENU]: (sidebar, { payload }) => Object.assign({}, sidebar, { activeMenuId: payload.activeMenuId })
};
