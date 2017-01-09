/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_ID = 'SET_ID';
export const SET_NAME = 'SET_NAME';
export const SET_CONTENT = 'SET_CONTENT';
export const SET_PAGE_LOADING = 'SET_PAGE_LOADING';

const setId = cac(SET_ID, 'data');
const setName = cac(SET_NAME, 'data');
const setContent = cac(SET_CONTENT, 'data');
const setPageLoading = cac(SET_PAGE_LOADING, 'data');


// 根据文章ID获取文章全部信息
export function getComment () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/commentAction/getComment";
        const method = "POST";
        const body = {
            "selectId" : getState().detailComment.id
        };
        const errInfo = "请求评论信息连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            // 设置页面元素内容
            dispatch(setName(data.userName));
            dispatch(setContent(data.content));

            // 页面内容渲染完成后设置可编辑
            dispatch(setPageLoading(false));
        });
    }
}

// 评论ID改变事件
export function idChange (id) {
    return (dispatch, getState) => {
        dispatch(setId(id));
        dispatch(getComment());
    }
}

// 评论人改变事件
export function nameChange (name) {
    return (dispatch, getState) => {
        dispatch(setName(name));
    }
}

// 评论内容改变事件
export function contentChange (content) {
    return (dispatch, getState) => {
        dispatch(setContent(content));
    }
}

// 更新评论
export function updateComment () {
	return (dispatch, getState) => {
        const url = ENV.baseUrl + "/commentAction/updateComment";
        const method = 'POST';
        const body = {
            "id"       : getState().detailComment.id,
            "userName" : encodeURI(encodeURI(getState().detailComment.name)),
            "content"  : encodeURI(encodeURI(getState().detailComment.content))
        };
        const errInfo = '更新评论连接出错！';
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            message.success(data.msg+"！", 3);
            dispatch(setPageLoading(false));
        });
	}
}

// 设置删除按钮的等待事件
export function pageLoadingChange (loading) {
	return (dispatch, getState) => {
		dispatch(setPageLoading(loading));
	}
}


