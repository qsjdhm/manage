/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getCommentCount,
	selectedPageChange,
    selectedCommentChange,
	modelVisibleChange,
    modelSaveReplyContentChange,
    replyComment
} from '../../actions/comment/editComment';

import { Modal, Form, Input, message, Badge } from 'antd';

import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

import '../../css/comment.less';

export class EditCommentPage extends React.Component {
	constructor (props) {
		super(props);
	}

    componentDidMount () {
        // 获取评论的分类列表
        this.props.dispatch( getCommentCount() );
    }

    // 渲染分页条
    renderPaginationList() {
        return <PaginationComponent
            count={this.props.commentCount}
            pageSize={10}
            pageed={this.paginationClickHandler.bind(this)}/>
    }

    paginationClickHandler(pageId) {
        this.props.dispatch( selectedPageChange(pageId) );
    }

    // 渲染数据表格
	renderTableList() {
        if (document.getElementById("container")){
			const totalWidth     = document.getElementById("container").offsetWidth - 45;
			const totalHeight    = document.getElementById("container").offsetHeight - 140;
            const idWidth        = totalWidth * 0.0749;
            const contentWidth   = totalWidth * 0.3465;
            const articleWidth   = totalWidth * 0.3037;
            const userWidth      = totalWidth * 0.1740;
            const operationWidth = totalWidth * 0.0656;

            const self = this;
            let tableColumns = [];
            tableColumns.push(
                { title: 'ID', width: idWidth, dataIndex: 'Comment_ID', key: 'Comment_ID' },
                {
                    title: '内容',
                    width: contentWidth,
                    dataIndex: 'Comment_Content',
                    key: 'Comment_Content',
                    render(index, item) {
                        if (item.Comment_Read === 0) {
                            return <a href='javascript:void(0)' onClick={self.detailClick.bind(self, index, item)}><Badge status="error" />{item.Comment_Content}</a>
                        } else {
                            return <a href='javascript:void(0)' onClick={self.detailClick.bind(self, index, item)}>{item.Comment_Content}</a>
                        }
                    }
                },
                { title: '对应文章', width: articleWidth, dataIndex: 'Comment_ArticleTitle', key: 'Comment_ArticleTitle' },
                { title: '评论用户', width: userWidth, dataIndex: 'Comment_Person_Name', key: 'Comment_Person_Name' },
                {
                    title: '操作',
                    width: operationWidth,
                    dataIndex: 'operation',
                    key: 'operation',
                    render(index, item) {
                        return <a href='javascript:void(0)' onClick={self.operationClick.bind(self, index, item)}>回复</a>
                    }
                }
            );

			// 表格的配置
			const expandedRowRender = record => <p>{record.Comment_Content}</p>;
			const scroll = { y: totalHeight, x: totalWidth };

			return <TableComponent
				tableColumns={tableColumns}
				tableData={this.props.commentList}
				expandedRowRender={expandedRowRender}
				selectedRowKeys={false}
				rowSelection={null}
				checkboxSelected={false}
				scroll={scroll}/>
		}
	}

    detailClick (index, item) {
        window.location.href = '#/home/editComment/'+item.Comment_ID;
    }

	operationClick (index, item) {
		this.props.dispatch( selectedCommentChange(item) );
	}

    handleOk () {
		this.props.dispatch( replyComment() );
    }

    handleCancel () {
		this.props.dispatch( modelVisibleChange(false) );
    }

	modelContentChangeHandler (e) {
		this.props.dispatch( modelSaveReplyContentChange(e.target.value) );
	}


	render() {
		const FormItem = Form.Item;

		return (
            <div id="page" className="page edit-comment-page">
                { this.renderTableList() }
                { this.renderPaginationList() }

                <Modal title="回复用户评论"
                       visible={this.props.modelVisible}
                       onOk={this.handleOk.bind(this)}
                       onCancel={this.handleCancel.bind(this)}>
                    <Form horizontal>
                        <FormItem
                            label="回复内容">
                            <Input value={this.props.modelSaveReplyContent} onChange={this.modelContentChangeHandler.bind(this)} type="textarea" rows="3" placeholder="" size="large"/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
		);
	}
};




function mapStateToProps ( state ) {
	return Object.assign({}, state.editComment);
}

export default connect( mapStateToProps )( EditCommentPage );



