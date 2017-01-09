import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    SET_ID,
    SET_NAME,
    SET_CONTENT,
    SET_PAGE_LOADING
} from '../../actions/comment/detailComment';


export default combineReducers({
    // 设置评论id
    id: cr(0, {
        [SET_ID](state, {data}){return data}
    }),
    // 设置评论人
    name: cr('', {
        [SET_NAME](state, {data}){return data}
    }),
    // 设置评论内容
    content: cr('', {
        [SET_CONTENT](state, {data}){return data}
    }),

    // 页面获取数据前，是模糊等待状态
    pageLoading: cr(true, {
        [SET_PAGE_LOADING](state, {data}){return data}
    })
});
