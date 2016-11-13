import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    SET_SORT_LIST,
	SET_SELECTED_SORT,
	SET_ARTICLE_COUNT,
	SET_SELECTED_PAGE,
	SET_ARTICLE_LIST
} from '../../actions/article/editArticle';


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
    // 设置当前选中的分类ID
    selectedSort: cr('', {
        [SET_SELECTED_SORT](state, {data}){return data}
    }),
    // 设置文章总数
    articleCount: cr(0, {
        [SET_ARTICLE_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置文章列表
    articleList: cr([], {
        [SET_ARTICLE_LIST](state, {data}){
			let articleArray = [];
			for( let item of data ){
				item.key = item.Article_ID;
                articleArray.push(item);
			}
			return articleArray;
		}
    })
});
