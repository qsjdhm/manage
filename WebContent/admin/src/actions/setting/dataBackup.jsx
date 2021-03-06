/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件


export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_BACKUP_COUNT = 'SET_BACKUP_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_BACKUP_LIST = 'SET_BACKUP_LIST';
export const SET_SELECTED_ROW_KEYS = 'SET_SELECTED_ROW_KEYS';
export const SET_HAS_SELECTED = 'SET_HAS_SELECTED';
export const SET_LOADING = 'SET_LOADING';

const setStartDate = cac(SET_START_DATE, 'data');
const setEndDate = cac(SET_END_DATE, 'data');
const setBackupCount = cac(SET_BACKUP_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setBackupList = cac(SET_BACKUP_LIST, 'data');
const setSelectedRowKeys = cac(SET_SELECTED_ROW_KEYS, 'data');
const setHasSelected = cac(SET_HAS_SELECTED, 'data');
const setLoading = cac(SET_LOADING, 'data');


// 获取备份列表
export function getBackupList () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/backupAction/getBackupList";
        const method = "POST";
        const body = {
            "startDate" : getState().dataBackup.startDate,
            "endDate" : getState().dataBackup.endDate,
            "page" : getState().dataBackup.selectedPage,
            "size" : 10
        };
        const errInfo = "请求文章列表连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setBackupCount(data.count));
			dispatch(setBackupList(data.data));
			dispatch(loadingChange(false));
			dispatch(setSelectedRowKeys([]));
			dispatch(setHasSelected(false));
        });
    }
}

// 恢复备份
export function recoverBackup (selectStr) {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/backupAction/recoverBackup";
        const method = "POST";
        const body = {
            "selectId" : selectStr
        };
        const errInfo = "恢复备份列表连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            message.success(data.msg+"！", 3);
            dispatch(getBackupList());
            dispatch(loadingChange(false));
            dispatch(setSelectedRowKeys([]));
            dispatch(setHasSelected(false));
        });
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
            dispatch(getBackupList());
            dispatch(loadingChange(false));
            dispatch(setSelectedRowKeys([]));
            dispatch(setHasSelected(false));
        });
    }
}


// 日期切换事件
export function dateChange (startDate, endDate) {
    return (dispatch, getState) => {
        let startDateStr = '';
        let endDateStr = '';
        if (startDate !== null && startDate !== '') {
            let startDateArray = startDate.split('-');
            let endDateArray = endDate.split('-');
            startDateStr = startDateArray[0] + startDateArray[1] + startDateArray[2];
            endDateStr = endDateArray[0] + endDateArray[1] + endDateArray[2];
        }
        dispatch(setStartDate(startDateStr));
        dispatch(setEndDate(endDateStr));
    }
}

// 结束日期切换事件
export function endDateChange (date) {
    return (dispatch, getState) => {
        dispatch(setEndDate(date));
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

// 分页切换事件
export function selectedPageChange (pageId) {
	return (dispatch, getState) => {
		dispatch(setSelectedPage(pageId));
		dispatch(getBackupList());
	}
}

// 设置删除按钮的等待事件
export function loadingChange (loading) {
    return (dispatch, getState) => {
        dispatch(setLoading(loading));
    }
}

