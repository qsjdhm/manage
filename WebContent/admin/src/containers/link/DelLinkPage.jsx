/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getLinkCount,
    selectedPageChange,
	hasSelectedChange,
	selectedRowKeysChange,
    delLinkList,
	loadingChange
} from '../../actions/link/delLink';

import { Popconfirm, Button, message } from 'antd';

import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

import '../../css/link.less';

export class DelLinkPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        // 获取外链的分类列表
        this.props.dispatch( getLinkCount(true) );
    }

    // 渲染分页条
    renderPaginationList() {
        return <PaginationComponent
            count={this.props.linkCount}
            pageSize={10}
            pageed={this.paginationClickHandler.bind(this)}/>
    }

    paginationClickHandler(pageId) {
        this.props.dispatch(selectedPageChange(pageId));
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
                { title: 'ID', width: idWidth, dataIndex: 'Link_ID', key: 'Link_ID' },
                { title: '名称', width: titleWidth, dataIndex: 'Link_Name', key: 'Link_Name' },
                { title: 'URL', width: urlWidth, dataIndex: 'Link_Url', key: 'Link_Url' },
                //, { title: '操作', width: operationWidth, dataIndex: '', key: 'operation', render: (index, item) => <a href='javascript:void(0)' onClick={self.openEditModel.bind(null, index, item)}>修改</a> },
            ];


            // 设置表格操作列配置
            tableColumns.push({
                title: '操作',
                width: operationWidth,
                dataIndex: 'operation',
                key: 'operation',
                render(index, item) {
                    return (
                        <Popconfirm
                            title="确定要删除当前外链吗？"
                            placement="topRight"
                            onConfirm={self.operationClickHandler.bind(self, index, item)}>

                            <a href='javascript:void(0)'>删除</a>
                        </Popconfirm>
                    );
                }
            });


            // 表格的配置
            const scroll = { y: totalHeight, x: totalWidth };

            return <TableComponent
                tableColumns={tableColumns}
                tableData={this.props.linkList}
                selectedRowKeys={this.props.selectedRowKeys}
                checkboxSelected={this.checkboxSelectedHandler.bind(this)}
				expandedRowRender={false}
                scroll={scroll}/>

        }
    }

    operationClickHandler (index, item) {
        // 删除外链
        this.props.dispatch(delLinkList(item.Link_ID.toString()));
    }

    // 选中外链
    checkboxSelectedHandler (selectedRowKeys) {
        const hasSelected = selectedRowKeys.length > 0;
		this.props.dispatch(hasSelectedChange(hasSelected));
		this.props.dispatch(selectedRowKeysChange(selectedRowKeys));
    }

	// 删除
	deleteClickHandler () {
		this.props.dispatch(loadingChange(true));
		const selectStr = this.props.selectedRowKeys.join(";");
		// 删除文章
		this.props.dispatch(delLinkList(selectStr));
	}


    render() {
        return (
            <div id="page" className="page del-link-page">
                <div className="del-button">
                    <span>{this.props.hasSelected ? `选择了 ${this.props.selectedRowKeys.length} 篇外链` : ''}</span>
                    <Popconfirm title="确定要删除选中的外链吗？" placement="topRight" onConfirm={this.deleteClickHandler.bind(this)}>
                        <Button type="primary"
                                disabled={!this.props.hasSelected}
                                loading={this.props.loading}
                                icon="delete"
                                size="large">
                            删除外链
                        </Button>
                    </Popconfirm>
                </div>
                { this.renderTableList() }
                { this.renderPaginationList() }
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.delLink);
}

export default connect( mapStateToProps )( DelLinkPage );



