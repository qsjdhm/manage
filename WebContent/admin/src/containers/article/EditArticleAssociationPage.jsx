/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Modal, Input, Popconfirm, Button, message } from 'antd';

import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import UeditorComponent    from '../../components/ueditor/js/UeditorComponent';
import TagComponent        from '../../components/tag/js/TagComponent';

import '../../css/article.less';

// 每一条文章的关联表
export class EditArticleAssociationPage extends React.Component {
    constructor (props) {
        super(props);
    }


    render() {
        return (
            <div id="page" className="page edit-article-page">
                Association
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.editArticle);
}

export default connect( mapStateToProps )( EditArticleAssociationPage );



