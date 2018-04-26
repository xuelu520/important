/**
 * 消息提示
 * User: gaogy
 * Date: 2017/05/16
 * Time: 10:47
 */
import { notification } from 'antd';

/**
 * 异常提示
 * @param msg
 */
function error(msg) {
    notification.error({
        placement: 'bottomRight',
        message: msg,
        className: 'error-msg'
    });
}

/**
 * 成功提示
 * @param msg
 */
function success(msg) {
    notification.success({
        placement: 'bottomRight',
        duration: 30,
        message: msg,
        style: {
            color: 'red!important'
        },
        className: 'success-msg'
    });
}

/**
 * 警告提示
 * @param msg
 */
function warning(msg) {
    notification.warning({
        placement: 'bottomRight',
        message: msg,
        className: 'warning-msg'
    });
}

/**
 * 详情提示
 * @param msg
 */
function info(msg) {
    notification.info({
        placement: 'bottomRight',
        message: msg,
        className: 'info-msg'
    });
}

// 导出实例化对象
export { error, success, info, warning }
