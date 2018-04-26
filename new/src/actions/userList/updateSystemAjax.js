import reqwest from 'reqwest';
import React from 'react';

import {
	notification
} from 'antd';

const updateSystemAjax = (data, callback) => {
	console.log('###获取用户权限参数###', data);

	return function(dispatch) {
		//发送请求
		reqwest({
			url: '/system/user.do',
			// url: '../../mock/userList/systemUser.json',
			method: 'post',
			data: data,
			type: 'json',
			cache: true,
			header: {
				"aaa": "bbb"
			}
		}).then((msg) => {
			console.log(msg, '### 获取用户权限响应 ###');
			if (msg.status) {
				// ;
				window.userInfo.data.auth = msg.data.auth;
				window.userInfo.data.name = msg.data.name;
				window.userInfo.data.userName = msg.data.userName;

				callback(true);
			} else {
				notification['error']({
					message: '获取系统权限失败',
					description: msg.msg,
				});
			}

			if (msg.code == -1) {
				window.location.href = "/"
			}
		});
	}

}

export {
	updateSystemAjax
};