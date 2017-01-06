/* Populated by react-webpack-redux:action */

import React from 'react';
import ReactDOM from 'react-dom';
import { notification, Button, Icon }         from 'antd';


import fetchComponent      from '../components/fetch/js/fetchComponent';
import { cac }             from "../utils/index";

export const SET_MENU_LIST = "SET_MENU_LIST";
export const SET_MANAGE_NAME = "SET_MANAGE_NAME";
export const SET_UNREAD_NUMBER = "SET_UNREAD_NUMBER";

// 如果有数据需要变化，在action中调用此方法
export const setMenuList = cac( SET_MENU_LIST, "value" );
export const setManageName = cac( SET_MANAGE_NAME, "value" );
export const setUnreadNumber = cac( SET_UNREAD_NUMBER, "value" );

// 系统路由改变事件
// 如果contaniners中用户行为发生操作，相对应需要在contaniners中调用此方法
export function menuListChange (menuList) {
    return (dispatch, getState) => {
        dispatch( setMenuList(menuList) );
    }
}

export function manageNameChange (manageName) {
    return (dispatch, getState) => {
        dispatch( setManageName(manageName) );
    }
}

// 获取未读评论个数
export function getUnreadCount () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/commentAction/getUnreadCommentLength";
        const method = "POST";
        const body = {};
        const errInfo = "请求未读评论个数连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            const key = `open${Date.now()}`;
            const btnClick = function () {
                // 隐藏提醒框
                notification.close(key);
                window.location.href = '#/home/editComment';
            };
            const btn = (
                <Button type="primary" size="small" onClick={btnClick}>
                    带我去看看
                </Button>
            );

            notification.open({
                message: '系统提示',
                icon: <Icon type="notification" style={{ color: '#3BB4F2' }} />,
                description: '目前您有 '+data.data+' 条评论，请注意查看！',
                duration: null,
                btn,
                key,
                onClose: close,
            });

            dispatch( setUnreadNumber(data.data) );
        });
    }
}
