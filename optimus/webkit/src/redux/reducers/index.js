/**
 * reducer入口
 * User: gaogy
 * Date: 2016/11/28
 * Time: 14:58
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import store from 'STORE';
import loginReducer from 'REDUCER/login';
import sidebarReducer from 'REDUCER/sidebar';

// ================================
// 同步的 Reducers（即应用初始化所必需的）
// ================================
const syncReducers = {
    router: routerReducer,
    login: loginReducer,
    sidebar: sidebarReducer
};

// ================================
// 异步加载的 Reducers（Code Splitting 按需加载的）
// ================================
const asyncReducers = {};

/**
 * @return {Function} rootReducer
 */
export function createRootReducer() {
    return combineReducers({
        ...syncReducers,
        ...asyncReducers
    });
}

/**
 * 按需加载时，立即注入对应的 Reducer
 * @param  {String}   key
 * @param  {Function} reducer
 */
export function injectReducer(key, reducer) {
    asyncReducers[key] = reducer;
    store.replaceReducer(createRootReducer()); // 替换当前的 rootReducer
}
