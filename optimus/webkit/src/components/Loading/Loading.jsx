/**
 * 登录组件
 * User: gaogy
 * Date: 2017/04/18
 * Time: 11:23
 */
import React from 'react';
import styles from './loading.css'

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.globalMask}>
                <div className={styles.maskInner}>
                    <div>
                        <span className={styles.loadingImg}></span>
                        <span className={styles.loadingText}>加载中...</span>
                        <div style={{clear: 'both'}}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loading;
