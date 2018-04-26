/**
 * 页面头部组件
 * User: gaogy
 * Date: 2017/07/05
 * Time: 16:23
 */
import React from 'react';
import styles from './header.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * 注销事件
     * @private
     */
    _logoutHandler = () => {
        sessionStorage.removeItem('username');
        window.location.reload();
    };

    render() {
        return (
            <header className={styles.mainHeader}>
                <a href="javascript:void(0);" className={styles.logo}>
                    <span className={styles.logoLg}>LOGO</span>
                </a>

                <nav className={styles.navbar}>
                    <div className={styles.logout}>
                        欢迎您，{sessionStorage.getItem('username')}&nbsp;&nbsp;
                        <a href="javascript:void(0);" onClick={this._logoutHandler}>
                            <span title="注销">注销</span>
                        </a>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;
