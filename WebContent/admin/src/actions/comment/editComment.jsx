/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_COMMENT_COUNT = 'SET_COMMENT_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_COMMENT_LIST = 'SET_COMMENT_LIST';

// 给弹出层中的组件设置默认数据的事件
export const SET_MODEL_VISIBLE = 'SET_MODEL_VISIBLE';
export const SET_MODEL_SELECTED_COMMENT = 'SET_MODEL_SELECTED_COMMENT';
export const SET_MODEL_SAVE_REPLY_CONTENT = 'SET_MODEL_SAVE_REPLY_CONTENT';


const setCommentCount = cac(SET_COMMENT_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setCommentList = cac(SET_COMMENT_LIST, 'data');

const setModelVisible = cac(SET_MODEL_VISIBLE, 'data');
const setModelSelectedComment = cac(SET_MODEL_SELECTED_COMMENT, 'data');
const setModelSaveReplyContent = cac(SET_MODEL_SAVE_REPLY_CONTENT, 'data');


// 获取评论总数
export function getCommentCount () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/commentAction/getCommentCount";
        const method = "POST";
        const body = {};
        const errInfo = "请求评论总个数连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            dispatch(setCommentCount(data.data));
            dispatch(selectedPageChange(1));
        });
    }
}

// 分页切换事件
export function selectedPageChange (pageId) {
    return (dispatch, getState) => {
        dispatch(setSelectedPage(pageId));
        dispatch(getCommentList());
    }
}

// 获取评论列表
export function getCommentList () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/commentAction/getCommentList";
        const method = "POST";
        const body = {
            "page" : getState().editComment.selectedPage,
            "size" : 10
        };
        const errInfo = "请求评论列表连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            dispatch(setCommentList(data.data));
        });
    }
}

// 设置当前被回复的评论
export function selectedCommentChange (comment) {
    return (dispatch, getState) => {
        dispatch(modelVisibleChange(true));
        dispatch(setModelSaveReplyContent(''));
        dispatch(setModelSelectedComment(comment));
    }
}

// 设置弹出层是否显示事件
export function modelVisibleChange (visible) {
	return (dispatch, getState) => {
		dispatch(setModelVisible(visible));
	}
}

// 设置弹出层中评论人改变事件
export function modelSaveReplyContentChange (content) {
    return (dispatch, getState) => {
        dispatch(setModelSaveReplyContent(content));
    }
}

// 回复评论
export function replyComment () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/commentAction/addComment";
		const method = "POST";
		const body = {
			"fCommentID"   : getState().editComment.modelSelectedComment.Comment_ID,
			"name"         : encodeURI(encodeURI('不拽注定被甩~')),
            "email"        : encodeURI(encodeURI('qsjdhm@163.com')),
			"content"      : encodeURI(encodeURI(getState().editComment.modelSaveReplyContent)),
            "articleID"    : getState().editComment.modelSelectedComment.Comment_ArticleID,
            "articleTitle" : encodeURI(encodeURI(getState().editComment.modelSelectedComment.Comment_ArticleTitle))
		};
		const errInfo = "回复评论连接出错！";
		fetchComponent.send(self, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getCommentList());
			dispatch(setModelVisible(false));
		});
	}
}