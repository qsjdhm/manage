/* Populated by react-webpack-redux:action */

import fetchComponent      from "../components/fetch/js/fetchComponent";
import { cac }             from "../utils/index";

export const SET_CURRENT_ROUTES = "SET_CURRENT_ROUTES";

// 如果有数据需要变化，在action中调用此方法
export const setCurrentRoutes = cac( SET_CURRENT_ROUTES, "value" );


// 系统路由改变事件
// 如果contaniners中用户行为发生操作，相对应需要在contaniners中调用此方法
export function currentRoutesChange (routes) {
    return (dispatch, getState) => {
        dispatch( setCurrentRoutes(routes) );
    }
}
