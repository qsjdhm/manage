/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */

import { combineReducers } from "redux";
import { cr } from "../utils/index";
import {
    SET_MENU_LIST
} from "../actions/common";

export default combineReducers ( {
    menuList : cr( [
        {"path":"/home/",                "name":"系统首页"},
        {"path":"/home/addArticle",      "name":"新增文章"},
        {"path":"/home/editArticle",     "name":"编辑文章"},
        {"path":"/home/delArticle",      "name":"删除文章"},
        {"path":"/home/addNote",         "name":"新增笔记"},
        {"path":"/home/editNote",        "name":"编辑笔记"},
        {"path":"/home/delNote",         "name":"删除笔记"},
        {"path":"/home/addBook",         "name":"新增图书"},
        {"path":"/home/editBook",        "name":"编辑图书"},
        {"path":"/home/delBook",         "name":"删除图书"},
        {"path":"/home/editComment",     "name":"编辑评论"},
        {"path":"/home/delComment",      "name":"删除评论"},
        {"path":"/home/addLink",         "name":"新增外链"},
        {"path":"/home/editLink",        "name":"编辑外链"},
        {"path":"/home/delLink",         "name":"删除外链"},
        {"path":"/home/addSort",         "name":"新增分类"},
        {"path":"/home/editSort",        "name":"编辑分类"},
        {"path":"/home/delSort",         "name":"删除分类"},
        {"path":"/home/articleRecom",    "name":"文章推荐量"},
        {"path":"/home/noteRecom",       "name":"笔记推荐量"},
        {"path":"/home/bookRecom",       "name":"图书推荐量"},
        {"path":"/home/addUser",         "name":"新增用户"},
        {"path":"/home/editUser",        "name":"编辑用户"},
        {"path":"/home/delUser",         "name":"删除用户"}
    ], {
        [SET_MENU_LIST]( state, { value } ){ return value; }
    } )
} );


