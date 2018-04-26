/**
 * 项目入口文件
 * User: gaogy
 * Date: 2016/11/25
 * Time: 14:58
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store, { history } from 'STORE';
import App from './components/App';
import routes from 'ROUTE';

import 'ASSET/css/normalize.css';
import 'ASSET/css/base.css';
import 'ASSET/css/layout.css';

/**
 * 检测不必要的重新渲染
 */
if (__DEV__ && __WHY_DID_YOU_UPDATE__) {
    const { whyDidYouUpdate } = require('why-did-you-update');
    whyDidYouUpdate(React);
}
if (__DEV__) {
    console.info('[当前环境] 开发环境');
}
if (__PROD__) {
    console.info('[当前环境] 生产环境');
}

// 子路由封装
const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
    // 把子路由向下传递来达到嵌套
    <route.component {...props} routes={route.routes}/>
  )}/>
);

// 将根组件挂载到 DOM
const MOUNT_NODE = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App>
                { routes.map((route, i) => {
                    return <RouteWithSubRoutes key={i} {...route} />
                }) }
            </App>
        </Router>
    </Provider>,
    MOUNT_NODE
);
