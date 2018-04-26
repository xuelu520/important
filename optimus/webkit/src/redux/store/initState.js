/**
 *  整个应用状态结构树 及其 初始值
 * User: gaogy
 * Date: 2016/11/25
 * Time: 15:05
 */
export default {
    login: {
        username: '',
        pwd: '',
        loginData: {},
        logoff: {}
    },
    sidebar: {
        menuList: [
            {
                id: '01',
                path: '/menu1',
                children: [
                    {
                        id: '011',
                        path: '/menu1/menu1_1',
                        icon: 'fa fa-circle-o',
                        name: '菜单1.1'
                    },
                    {
                        id: '012',
                        path: '/menu1/menu1_2',
                        icon: 'fa fa-circle-o',
                        name: '菜单1.2'
                    }],
                icon: 'fa fa-files-o',
                name: '菜单一'
            },
            {
                id: '02',
                path: '/menu2',
                icon: 'fa fa-files-o',
                name: '菜单二'
            }
        ],
        openMenuId: '01',
        activeMenuId: '011'
    }
}
