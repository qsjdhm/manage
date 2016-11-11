/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';
import jQuery              from 'jquery';

// 页面所使用的事件
export const SET_SORT_LIST = 'SET_SORT_LIST';
export const SET_TAG_LIST = 'SET_TAG_LIST';
export const SET_DEFAULT_SELECTED_SORT_ID = 'SET_DEFAULT_SELECTED_SORT_ID';
export const SET_SELECTED_SORT_ID = 'SET_SELECTED_SORT_ID';
export const SET_SELECTED_SORT_NAME = 'SET_SELECTED_SORT_NAME';
export const SET_ID = 'SET_ID';
export const SET_TITLE = 'SET_TITLE';
export const SET_CONTENT = 'SET_CONTENT';
export const SET_SELECTED_TAG = 'SET_SELECTED_TAG';
export const SET_PAGE_LOADING = 'SET_PAGE_LOADING';

const setSortList = cac(SET_SORT_LIST, 'data');
const setTagList = cac(SET_TAG_LIST, 'data');
const setDefaultSelectedSortId = cac(SET_DEFAULT_SELECTED_SORT_ID, 'data');
const setSelectedSortId = cac(SET_SELECTED_SORT_ID, 'data');
const setSelectedSortName = cac(SET_SELECTED_SORT_NAME, 'data');
const setId = cac(SET_ID, 'data');
const setTitle = cac(SET_TITLE, 'data');
const setContent = cac(SET_CONTENT, 'data');
const setSelectedTag = cac(SET_SELECTED_TAG, 'data');
const setPageLoading = cac(SET_PAGE_LOADING, 'data');


// 根据文章ID获取文章全部信息
export function getArticle () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/articleAction/getArticle";
        const method = "POST";
        const body = {
            "selectId" : getState().detailArticle.id
        };
        const errInfo = "请求文章信息连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            // 设置页面元素内容
            dispatch(setDefaultSelectedSortId(data.sortId));
			dispatch(setSelectedSortId(data.sortId));
            dispatch(setSelectedSortName(data.sortName));
            dispatch(setTitle(data.title));
            dispatch(setContent(data.content));
            dispatch(setSelectedTag(data.tag));

            // 页面内容渲染完成后设置可编辑
            dispatch(setPageLoading(false));
        });
    }
}

// 获取文章分类列表
export function getSortList () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/sortAction/byTypeGetSort";
        const method = 'POST';
        const body = {
            'type' : 'article'
        };
        const errInfo = '请求文章分类连接出错！';
        fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setSortList(data.data));
        });
    }
}

// 获取标签列表
export function getTagList () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/sortAction/byTypeGetSort";
        const method = "POST";
        const body = {
            "type" : "tag"
        };
        const errInfo = "请求文章标签连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            dispatch(setTagList(data.data));
        });
    }
}

// 分类ID切换事件
export function selectedSortIdChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedSortId(sortId));
	}
}

// 分类NAME切换事件
export function selectedSortNameChange (sortName) {
    return (dispatch, getState) => {
        dispatch(setSelectedSortName(sortName));
    }
}


// 文章ID改变事件
export function idChange (id) {
    return (dispatch, getState) => {
        dispatch(setId(id));
        dispatch(getArticle());
    }
}

// 文章名称改变事件
export function titleChange (title) {
    return (dispatch, getState) => {
        dispatch(setTitle(title));
    }
}

// 文章内容改变事件
export function contentChange (content) {
    return (dispatch, getState) => {
        dispatch(setContent(content));
    }
}

// 标签选中改变事件
export function selectedTagChange (tag) {
    return (dispatch, getState) => {
        dispatch(setSelectedTag(tag));
    }
}

// 新增文章
export function addArticle () {
    return (dispatch, getState) => {
        dispatch(setPageLoading(true));
        jQuery.ajax({
            url: ENV.baseUrl + "/articleAction/addArticle",
            type: "POST",
            data: {
                "sortId"   : getState().addArticle.selectedSortId,
                "sortName" : encodeURI(encodeURI(getState().addArticle.selectedSortName)),
                "title"    : encodeURI(encodeURI(getState().addArticle.title)),
                "content"  : getState().addArticle.content,
                "tags"     : encodeURI(encodeURI(getState().addArticle.selectedTag.join(",")))
            },
            dataType: "json",
            success: (data)=>{
                message.success(data.msg+"！", 3);
                dispatch(setPageLoading(false));
            }
        });
    }
}



// 设置删除按钮的等待事件
export function pageLoadingChange (loading) {
	return (dispatch, getState) => {
		dispatch(setPageLoading(loading));
	}
}




