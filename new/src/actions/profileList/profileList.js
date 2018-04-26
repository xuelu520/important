//todo mock数据
import "../../mock/common/global";

//todo mock数据
import "../../mock/profileList/profileList";

import React from 'react';
import reqwest from 'reqwest';



//汇总和明细
import {
	getTableData
} from './getTableData';

//单渠道请求
import {
	overviewOut
} from './overviewOut';

//获取表格数据
import {
	getTable
} from './getTable';

//设置每页显示多少条
import {
	setLimit
} from './setLimit';

//单渠道组件调用函数
import {
	channelDetail
} from './channelDetail';

//分页调用模块
import {
	setPagination
} from './setPagination';

//type 表头信息和请求设置调用模块
import {
	setType
} from './setType';

//切换tab
import {
	clickTab
} from './clickTab';

//echarts 数据
import {
	chartsResult
} from './chartsResult';

//切换操作系统
import {
	changeOs
} from './changeOs';

//切换线上线下
import {
	changeChannelCategory
} from './changeChannelCategory';

//获取渠道组列表
import {
	getGroupList
} from './getGroupList';

//选择渠道组
import {
	clickGroupList
} from './clickGroupList';

import {
	getChannelList
} from './getChannelList';

//设置时间 
import {
	setDate
} from './setDate';

const getDownLoadData = (data) => {
	return function(dispatch) {

		console.log("###下载表格参数###", data);


		if (data.type == 1 || data.type == 2) {
			//发送请求
			reqwest({
				url: '/data/overview/list.do?type=' + data.type,
				method: 'post',
				data: data,
				type: 'json'
			}).then((msg) => {

				console.log("---下载表格参数---", msg);

				if (msg.status) {
					dispatch({
						type: "PROFILE_LIST_EXCEL",
						payload: msg.data
					})
				} else {
					if (msg.code == -1) {
						window.location.href = "/"
					}
				}
			});
		} else {
			//发送请求
			reqwest({
				url: '/data/overview/out.do',
				method: 'post',
				data: data,
				type: 'json',
			}).then((msg) => {
				if (msg.status) {
					dispatch({
						type: "PROFILE_LIST_EXCEL",
						payload: msg.data
					})

				} else {
					if (msg.code == -1) {
						alert(-1);
						window.location.href = "/"
					}
				}
			});
		}


	}
};



export {
	//表格渲染
	getTable,
	//分页
	setPagination,
	//汇总和明细
	setType,
	//点击渠道链接
	channelDetail,
	// 一页显示多少条 
	setLimit,
	//切换tab
	clickTab,
	//获取charts数据
	chartsResult,
	//操作系统切换
	changeOs,
	//线上线下
	changeChannelCategory,
	//获取渠道组列表
	getGroupList,
	//选择渠道组
	clickGroupList,
	//渠道列表
	getChannelList,
	//设置时间
	setDate,
	//表格数据获取
	getTableData,
	//单渠道数据获取
	overviewOut,
	getDownLoadData
}