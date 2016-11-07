/* Populated by react-webpack-redux:action */

import { cac }             from "../utils/index";

export const SET_MENU_LIST = "SET_MENU_LIST";
export const SET_MANAGE_NAME = "SET_MANAGE_NAME";

// 如果有数据需要变化，在action中调用此方法
export const setMenuList = cac( SET_MENU_LIST, "value" );
export const setManageName = cac( SET_MANAGE_NAME, "value" );


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
