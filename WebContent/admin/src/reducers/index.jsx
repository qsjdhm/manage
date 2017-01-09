
import common              from './common';

import login               from './login';

import addArticle          from './article/addArticle';
import editArticle         from './article/editArticle';
import detailArticle       from './article/detailArticle';
import delArticle          from './article/delArticle';

import addNote             from './note/addNote';
import editNote            from './note/editNote';
import delNote             from './note/delNote';

import addBook             from './book/addBook';
import editBook            from './book/editBook';
import delBook             from './book/delBook';

import editComment         from './comment/editComment';
import detailComment       from './comment/detailComment';
import delComment          from './comment/delComment';

import addLink             from './link/addLink';
import editLink            from './link/editLink';
import delLink             from './link/delLink';

import addSort             from './sort/addSort';
import editSort            from './sort/editSort';
import delSort             from './sort/delSort';

import articleRecom        from './recom/articleRecom';
import noteRecom           from './recom/noteRecom';
import bookRecom           from './recom/bookRecom';

import addUser             from './user/addUser';
import editUser            from './user/editUser';
import delUser             from './user/delUser';

import dataBackup          from './setting/dataBackup';

import { combineReducers } from 'redux';

const reducers = {
    common,

    login,

    addArticle,
    editArticle,
    detailArticle,
    delArticle,

    addNote,
    editNote,
    delNote,

    addBook,
    editBook,
    delBook,

    editComment,
    detailComment,
    delComment,

    addLink,
    editLink,
    delLink,

    addSort,
    editSort,
    delSort,

    articleRecom,
    noteRecom,
    bookRecom,

    addUser,
    editUser,
    delUser,

    dataBackup
};

//module.exports = combineReducers(reducers);
export default combineReducers(reducers);
