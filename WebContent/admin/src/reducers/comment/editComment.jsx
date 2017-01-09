import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
	SET_COMMENT_COUNT,
	SET_SELECTED_PAGE,
	SET_COMMENT_LIST,

    // 弹出层所使用的初始数据
	SET_MODEL_VISIBLE,
    SET_MODEL_SELECTED_COMMENT,
    SET_MODEL_SAVE_REPLY_CONTENT
} from '../../actions/comment/editComment';


export default combineReducers({
    // 设置评论总数
    commentCount: cr(0, {
        [SET_COMMENT_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置评论列表
    commentList: cr([], {
        [SET_COMMENT_LIST](state, {data}){
			let commentArray = [];
			for( let item of data ){
				item.key = item.Comment_ID;
                commentArray.push(item);
			}
			return commentArray;
		}
    }),

    // 设置弹出层显示状态
    modelVisible: cr(false, {
        [SET_MODEL_VISIBLE](state, {data}){return data}
    }),
    // 设置当前回复评论
    modelSelectedComment: cr(false, {
        [SET_MODEL_SELECTED_COMMENT](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台内容
    modelSaveReplyContent: cr('', {
        [SET_MODEL_SAVE_REPLY_CONTENT](state, {data}){return data}
    }),
});
