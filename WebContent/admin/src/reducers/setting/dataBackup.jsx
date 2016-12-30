import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
    SET_BACKUP_COUNT,
    SET_SELECTED_PAGE,
    SET_BACKUP_LIST,
    SET_SELECTED_ROW_KEYS,
    SET_HAS_SELECTED,
    SET_LOADING
} from '../../actions/setting/dataBackup';

export default combineReducers({
    // 设置备份总数
    articleCount: cr(0, {
        [SET_BACKUP_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置文章列表
    backupList: cr([], {
        [SET_BACKUP_LIST](state, {data}){
            let backupArray = [];
            for( let item of data ){
                item.key = item.Backup_ID;
                backupArray.push(item);
            }
            return backupArray;
        }
    }),
    // 设置当前选中备份的key
    selectedRowKeys: cr([], {
        [SET_SELECTED_ROW_KEYS](state, {data}){
            return data;
        }
    }),
    // 设置当前表格是否有选中
    hasSelected : cr(false, {
        [SET_HAS_SELECTED](state, {data}){
            return data;
        }
    }),
    // 删除按钮是否等待
    loading : cr(false, {
        [SET_LOADING](state, {data}){
            return data;
        }
    }),
});