/**
 * 侧边栏组件
 * User: gaogy
 * Date: 2017/07/05
 * Time: 16:23
 */
import React from 'react';
import styles from './sidebar.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

@connect(
    ({ sidebar, router }) => ({sidebar, router}),
    require('ACTION/sidebar').default
) class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * 菜单选择事件
     * @param e
     * @private
     */
    _menuClickHandler = (e) => {
        e.stopPropagation();
        this.props.selectMenu(e.currentTarget.id);
    };

    /**
     * 展开二级菜单事件
     * @param e
     * @private
     */
    _openMenuHandler = (e) => {
        e.stopPropagation();
        let openMenuId = '';

        // 不同时展开
        if (e.currentTarget.id != this.props.sidebar.openMenuId) {
            openMenuId = e.currentTarget.id;
        }
        this.props.selectMenu('');
        this.props.openMenu(openMenuId);
    };

    render() {
        // 构建菜单模板
        let menuListTpl = [];
        menuListTpl = this.props.sidebar.menuList.map((item, index) => {
            let menuTpl = '';
            let liClass = '';

            if (item.children) {
                // 存在子菜单的情况
                liClass = styles.treeview;
                let angleClass = 'fa fa-angle-left pull-right';
                // 子菜单模板
                let subMenuTpl = item.children.map((subItem, subIndex) => {
                    let subLiClass = '';
                    if (subItem.id === this.props.sidebar.activeMenuId) {
                        subLiClass = styles.active;
                    }
                    return <li key={subItem.id} id={subItem.id} onClick={this._menuClickHandler} className={subLiClass}><Link to={subItem.path}><i className={subItem.icon}></i><span>{subItem.name}</span></Link></li>;
                });

                if (item.id === this.props.sidebar.openMenuId) {
                    angleClass = 'fa fa-angle-down pull-right';
                    liClass = styles.treeview + ' ' + styles.menuOpen + ' ' + styles.active;
                }
                menuTpl = <li key={item.id} onClick={this._openMenuHandler} id={item.id} className={liClass}>
                            <Link to={item.path}>
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                                    <span className={styles.pullRightContainer}>
                                          <i className={angleClass}></i>
                                    </span>
                            </Link>
                            <ul className={styles.treeviewMenu}>{subMenuTpl}</ul>
                        </li>;
            } else {
                // 不存在子菜单的情况
                if (item.id === this.props.sidebar.openMenuId) {
                    liClass = styles.active;
                }

                menuTpl = <li key={item.id} id={item.id} onClick={this._openMenuHandler} className={liClass}><Link to={item.path}><i className={item.icon}></i><span>{item.name}</span></Link></li>;
            }
            return menuTpl;
        });

        return (
            <aside className={styles.mainSidebar}>
                <section className={styles.sidebar} style={{ height: 'auto' }}>
                    <ul className={styles.sidebarMenu + ' ' + styles.tree} data-widget="tree">
                        <li className={styles.header}>MAIN NAVIGATION</li>
                        {menuListTpl}
                    </ul>
                </section>
            </aside>
        )
    }
}

export default Sidebar;
