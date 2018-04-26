/**
 * 路由表配置
 * User: gaogy
 * Date: 2017/07/05
 * Time: 10:09
 */
import React from 'react';
import Bundle from '../components/Bundle';
import Loading from '../components/Loading/Loading';
import Home from 'bundle-loader?lazy&name=customTable!../components/Home/Home';
import Page from 'bundle-loader?lazy&name=customTable!../components/Page/Page';

// 组件按需加载
const createComponent = (component) =>() => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Loading /> : <Loading/>
        }
    </Bundle>
);

export default [
    {
        path: '/menu1/menu1_1',
        component: createComponent(Home)
    },
    {
        path: '/menu2',
        component: createComponent(Page)
    }
];
