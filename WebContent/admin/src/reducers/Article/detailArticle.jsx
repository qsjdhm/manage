import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    SET_SORT_LIST,
    SET_TAG_LIST,
    SET_COMMENT_LIST,
	SET_DEFAULT_SELECTED_SORT_ID,
    SET_SELECTED_SORT_ID,
    SET_SELECTED_SORT_NAME,
    SET_ID,
    SET_TITLE,
    SET_CONTENT,
	SET_DEFAULT_SELECTED_TAG,
    SET_SELECTED_TAG,
    SET_PAGE_LOADING
} from '../../actions/article/detailArticle';


export default combineReducers({
    // 设置分类列表
    sortList: cr([], {
        [SET_SORT_LIST](state, {data}){
            let sortArray = [];
            for ( let item of data ) {
                sortArray.push( {'id' : item.Sort_ID, 'name' : item.Sort_Name} );
            }
            return sortArray;
        }
    }),
    // 设置所有文章的标签列表
    tagList: cr([], {
        [SET_TAG_LIST](state, {data}){
            let tagArray = [];
            for(let item of data){
                tagArray.push( {'id' : item.Sort_ID, 'name' : item.Sort_Name} );
            }
            return tagArray;
        }
    }),
    // 设置当前文章的评论
    commentList: cr([], {
        [SET_COMMENT_LIST](state, {data}){
            let commentArray = [];
			if (data.length !== 0) {
				for(let item of data){
					commentArray.push( {
						'id' : item.id,
						'userName' : item.userName,
						'time' : item.time,
						'content' : item.content
					} );
				}
			}
            return commentArray;
        }
    }),
	// select组件特殊，要多留一个default值赋给defaultValue属性
	defaultSelectedSortId: cr('', {
		[SET_DEFAULT_SELECTED_SORT_ID](state, {data}){
			return data;
		}
	}),
    // 设置当前选中的分类ID
    selectedSortId: cr('', {
        [SET_SELECTED_SORT_ID](state, {data}){return data}
    }),
    // 设置当前选中的分类NAME
    selectedSortName: cr('', {
        [SET_SELECTED_SORT_NAME](state, {data}){return data}
    }),
    // 设置文章id
    id: cr(0, {
        [SET_ID](state, {data}){return data}
    }),
    // 设置文章标题
    title: cr('', {
        [SET_TITLE](state, {data}){return data}
    }),
    // 设置文章内容
    content: cr('', {
        [SET_CONTENT](state, {data}){return data}
    }),
	defaultSelectedTag: cr('', {
		[SET_DEFAULT_SELECTED_TAG](state, {data}){return data}
	}),
    // 设置文章选中的标签
    selectedTag: cr('', {
        [SET_SELECTED_TAG](state, {data}){return data}
    }),

    // 页面获取数据前，是模糊等待状态
    pageLoading: cr(true, {
        [SET_PAGE_LOADING](state, {data}){return data;}
    })
});
