/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getUserCount,
	selectedPageChange,
    getUser,
	modelVisibleChange,
    modelSaveNameChange,
    modelSavePasswordChange,
    modelSaveEmailChange,
	updateUser
} from '../../actions/user/editUser';

import { Modal, Form, Input, message } from 'antd';

import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

import '../../css/user.less';

export class EditUserPage extends React.Component {
	constructor (props) {
		super(props);
	}

    componentDidMount () {
        // 获取评论的分类列表
        this.props.dispatch( getUserCount() );
    }

    // 渲染分页条
    renderPaginationList() {
        return <PaginationComponent
            count={this.props.userCount}
            pageSize={10}
            pageed={this.paginationClickHandler.bind(this)}/>
    }

    paginationClickHandler(pageId) {
        this.props.dispatch( selectedPageChange(pageId) );
    }

    // 渲染数据表格
	renderTableList() {
        const container_pack = document.getElementById("container");
        if (document.getElementById("container")){
            const self           = this;
            const totalWidth     = container_pack.offsetWidth - 45;
            const totalHeight    = container_pack.offsetHeight - 140;
            const idWidth        = totalWidth * 0.0749;
            const titleWidth     = totalWidth * 0.3537;
            const urlWidth       = totalWidth * 0.4705;
            const operationWidth = totalWidth * 0.0656;

            let tableColumns = [
                { title: 'ID', width: idWidth, dataIndex: 'User_ID', key: 'User_ID' },
                { title: '名称', width: titleWidth, dataIndex: 'User_Account', key: 'User_Account' },
                { title: '邮箱', width: urlWidth, dataIndex: 'User_Email', key: 'User_Email' },
                //, { title: '操作', width: operationWidth, dataIndex: '', key: 'operation', render: (index, item) => <a href='javascript:void(0)' onClick={self.openEditModel.bind(null, index, item)}>修改</a> },
            ];

			// 设置表格操作列配置
			tableColumns.push({
				title: '操作',
				width: operationWidth,
				dataIndex: 'operation',
				key: 'operation',
				render(index, item) {
					return <a href='javascript:void(0)' onClick={self.operationClick.bind(self, index, item)}>修改</a>
				}
			});

			// 表格的配置
			const expandedRowRender = record => <p>{record.User_Account}</p>;
			const scroll = { y: totalHeight, x: totalWidth };

			return <TableComponent
				tableColumns={tableColumns}
				tableData={this.props.userList}
				expandedRowRender={expandedRowRender}
				selectedRowKeys={false}
				rowSelection={null}
				checkboxSelected={false}
				scroll={scroll}/>
		}
	}

	operationClick (index, item) {
		this.props.dispatch( getUser(item.User_ID) );
	}

    handleOk () {
		this.props.dispatch( updateUser() );
    }

    handleCancel () {
		this.props.dispatch( modelVisibleChange(false) );
    }

    modelNameChangeHandler (e) {
        this.props.dispatch( modelSaveNameChange(e.target.value) );
    }

    modelPasswordChangeHandler (e) {
        this.props.dispatch( modelSavePasswordChange(e.target.value) );
    }

    modelEmailChangeHandler (e) {
		this.props.dispatch( modelSaveEmailChange(e.target.value) );
	}



	render() {
		const FormItem = Form.Item;

		return (
            <div id="page" className="page edit-user-page">
                { this.renderTableList() }
                { this.renderPaginationList() }

                <Modal title="修改用户详细信息"
                       visible={this.props.modelVisible}
                       onOk={this.handleOk.bind(this)}
                       onCancel={this.handleCancel.bind(this)}>
                    <Form horizontal>
                        <FormItem
                            label="用户名称">
                            <Input value={this.props.modelSaveName} onChange={this.modelNameChangeHandler.bind(this)} placeholder="" size="large"/>
                        </FormItem>
                        <FormItem
                            label="用户密码">
                            <Input value={this.props.modelSavePassword} onChange={this.modelPasswordChangeHandler.bind(this)} placeholder="" size="large"/>
                        </FormItem>
                        <FormItem
                            label="用户邮箱">
                            <Input value={this.props.modelSaveEmail} onChange={this.modelEmailChangeHandler.bind(this)} placeholder="" size="large"/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
		);
	}
};




function mapStateToProps ( state ) {
	return Object.assign({}, state.editUser);
}

export default connect( mapStateToProps )( EditUserPage );



