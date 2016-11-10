/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getSortList,
    selectedSortIdChange,
    selectedSortNameChange,
    idChange,
    titleChange,
    contentChange,
    selectedTagChange,
    addArticle,
    loadingChange
} from '../../actions/article/detailArticle';

import { Modal, Input, Popconfirm, Button, message } from 'antd';

import SelectComponent     from '../../components/select/js/SelectComponent';
import UeditorComponent    from '../../components/ueditor/js/UeditorComponent';
import TagComponent        from '../../components/tag/js/TagComponent';

import '../../css/article.less';

// 编辑文章详情页
export class DetailArticlePage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        // 获取当前文章内容
        this.props.dispatch( idChange(this.props.params.id) );

        // 获取文章的分类列表
        this.props.dispatch( getSortList() );
    }


    // 渲染文章分类下拉框
    renderSortSelect () {
        if( this.props.sortList.length !== 0 && this.props.selectedSortId !== '' ) {
            return <SelectComponent
                defaultValue={this.props.selectedSortId}
                data={this.props.sortList}
                selected={this.sortChangeHandler.bind(this)}/>
        }
    }

    sortChangeHandler (sortId) {
        let nowSort = {
            sortId   : sortId,
            sortName : ""
        };
        const sorts = this.props.sortList;
        for(let sort of sorts){
            if(sort.id === sortId) {
                nowSort.sortName = sort.name;
                break;
            }
        }

        this.props.dispatch(selectedSortIdChange(nowSort.sortId));
        this.props.dispatch(selectedSortNameChange(nowSort.sortName));
    }


    titleChangeHandler (e) {
        this.props.dispatch(titleChange(e.target.value));
    }

    // 渲染文章标签下拉框
    renderTag () {
        if( this.props.tagList.length !== 0 ) {
            return <TagComponent
                width={820}
                data={this.props.tagList}
                selected={this.tagChangeHandler.bind(this)}
            />
        }
    }

    tagChangeHandler (tag) {
        this.props.dispatch(selectedTagChange(tag));
    }

    submitClickHandler () {
        const content = UE.getEditor("content").getContent();
        this.props.dispatch(contentChange(content));
        this.props.dispatch(addArticle());
    }

    render() {
        return (
            <div id="page" className="page add-article-page">
                { this.renderSortSelect() }
                <Input defaultValue={this.props.title} value={this.props.title} onChange={this.titleChangeHandler.bind(this)} style={{ width: 470 }} size="large" placeholder="文章名称"/>
                <UeditorComponent
                    id="content"
                    width="820"
                    height="400"
                />
                { this.renderTag() }
                <Button
                    onClick={this.submitClickHandler.bind(this)}
                    loading={this.props.loading}
                    type="primary"
                    icon="cloud-upload-o"
                    size="large">
                    提交文章
                </Button>
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.detailArticle);
}

export default connect( mapStateToProps )( DetailArticlePage );



