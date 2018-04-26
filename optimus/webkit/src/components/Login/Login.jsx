/**
 * 登录组件
 * User: gaogy
 * Date: 2017/04/18
 * Time: 11:23
 */
import React from 'react';
import styles from './login.css'
import Particle from 'zhihu-particle';
import { connect } from 'react-redux';

@connect(
    ({ login, router }) => ({login, router}),
    require('ACTION/login').default
) class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // 生成粒子浮动背景
        new Particle(document.getElementById('background'), {
                atomColor: '#96cffd',
                interactive: true,
                density: 'low'
            }
        );
    }

    /**
     * 登录事件
     * @private
     */
    _loginHandler = () => {
        let loginInfo = {
            username: this.props.login.username,
            pwd: this.props.login.pwd
        };
        this.props.userLogin(loginInfo);
    };

    /**
     * 用户名change事件
     * @param e
     * @private
     */
    _changeUsername = (e) => {
        this.props.usernameChange(e.target.value);
    };

    /**
     * 登录密码change事件
     * @param e
     * @private
     */
    _changePwd = (e) => {
        this.props.pwdChange(e.target.value);
    };

    render() {
        return (
            <div id="login">
                <div id='background' className={styles.background}></div>
                <div className={styles.main}>
                    <form noValidate>
                        <div className={styles.inputGroups}>
                            <input value={this.props.login.username} onChange={this._changeUsername}
                                   className={styles.input} placeholder="手机号或邮箱" />
                            <input type='password' value={this.props.login.pwd} onChange={this._changePwd}
                                   className={styles.input} placeholder="密码" />
                        </div>
                        <button onClick={this._loginHandler} className={styles.btn}>
                            登录
                        </button>
                        <div className={styles.extra}>
                            <button className={styles.phoneLogin}>
                                手机验证码登录
                            </button>
                            <button className={`${styles.link} ${styles.fr}`}>
                                无法登录？
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
