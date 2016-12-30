/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_BACKUP_COUNT = 'SET_BACKUP_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_BACKUP_LIST = 'SET_BACKUP_LIST';
export const SET_SELECTED_ROW_KEYS = 'SET_SELECTED_ROW_KEYS';
export const SET_HAS_SELECTED = 'SET_HAS_SELECTED';
export const SET_LOADING = 'SET_LOADING';

const setBackupCount = cac(SET_BACKUP_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setBackupList = cac(SET_BACKUP_LIST, 'data');
const setSelectedRowKeys = cac(SET_SELECTED_ROW_KEYS, 'data');
const setHasSelected = cac(SET_HAS_SELECTED, 'data');
const setLoading = cac(SET_LOADING, 'data');


// 获取备份总数
export function getBackupCount (pageChange) {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/backupAction/getBackupCount";
        const method = "POST";
        const body = {
            "sort" : getState().delBackup.selectedSort
        };
        const errInfo = "请求文章总个数连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            dispatch(setBackupCount(data.data));
            if (pageChange) {
                dispatch(selectedPageChange(1));
            }
        });
    }
}

// 分页切换事件
export function selectedPageChange (pageId) {
    return (dispatch, getState) => {
        dispatch(setSelectedPage(pageId));
        dispatch(getBackupList());
    }
}

// 获取备份列表
export function getBackupList () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/backAction/getBackupList";
        const method = "POST";
        const body = {
            "sort" : getState().delBackup.selectedSort,
            "page" : getState().delBackup.selectedPage,
            "size" : 10
        };
        const errInfo = "请求文章列表连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            console.info(data);
            dispatch(setBackupList(data.data));
        });
    }
}

// 是否有选中备份切换事件
export function hasSelectedChange (has) {
    return (dispatch, getState) => {
        dispatch(setHasSelected(has));
    }
}

// 选中备份切换事件
export function selectedRowKeysChange (selectList) {
    return (dispatch, getState) => {
        dispatch(setSelectedRowKeys(selectList));
    }
}

// 设置删除按钮的等待事件
export function loadingChange (loading) {
    return (dispatch, getState) => {
        dispatch(setLoading(loading));
    }
}

// 删除备份
export function delBackupList (selectStr) {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/backupAction/delBackup";
        const method = "POST";
        const body = {
            "selectId" : selectStr
        };
        const errInfo = "删除备份列表连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            message.success(data.msg+"！", 3);
            dispatch(getBackupCount(false));
            dispatch(getBackupList());
            dispatch(loadingChange(false));
            dispatch(setSelectedRowKeys([]));
            dispatch(setHasSelected(false));
        });
    }
}

