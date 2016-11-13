/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_SORT_LIST = 'SET_SORT_LIST';
export const SET_SELECTED_SORT = 'SET_SELECTED_SORT';
export const SET_ARTICLE_COUNT = 'SET_ARTICLE_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST';


const setSortList = cac(SET_SORT_LIST, 'data');
const setSelectedSort = cac(SET_SELECTED_SORT, 'data');
const setArticleCount = cac(SET_ARTICLE_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setArticleList = cac(SET_ARTICLE_LIST, 'data');


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
			dispatch(selectedSortChange(data.data[0].Sort_ID));
        });
    }
}

// 分类切换事件
export function selectedSortChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedSort(sortId));
		dispatch(getArticleCount());
	}
}

// 获取文章总数
export function getArticleCount () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/articleAction/getArticleCount";
		const method = "POST";
		const body = {
			"sort" : getState().editArticle.selectedSort
		};
		const errInfo = "请求文章总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setArticleCount(data.data));
			dispatch(selectedPageChange(1));
		});
	}
}

// 分页切换事件
export function selectedPageChange (pageId) {
	return (dispatch, getState) => {
		dispatch(setSelectedPage(pageId));
		dispatch(getArticleList());
	}
}

// 获取文章列表
export function getArticleList () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/articleAction/getArticleList";
		const method = "POST";
		const body = {
			"sort" : getState().editArticle.selectedSort,
			"page" : getState().editArticle.selectedPage,
			"size" : 10
		};
		const errInfo = "请求文章列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setArticleList(data.data));
		});
	}
}