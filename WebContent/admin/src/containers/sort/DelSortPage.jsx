/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    selectedSortIdChange,
    selectedPageChange,
	hasSelectedChange,
	selectedRowKeysChange,
    delSortList,
	loadingChange
} from '../../actions/sort/delSort';

import { Popconfirm, Button, message } from 'antd';

import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

import '../../css/sort.less';

export class DelSortPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.props.dispatch(selectedSortIdChange('3'));
    }


    // 渲染父分类下拉框
    renderFSortSelect () {
        const fSortList = [
            {
                "id" : 3,
                "name" : "图书分类"
            },
            {
                "id" : 8,
                "name" : "笔记分类"
            },
            {
                "id" : 4,
                "name" : "标签分类"
            }
        ];
        return <SelectComponent
            defaultValue={fSortList[0].id}
            data={fSortList}
            selected={this.sortChangeHandler.bind(this)}/>
    }

    sortChangeHandler (sortId) {
        this.props.dispatch(selectedSortIdChange(sortId));
    }

    // 渲染分页条
    renderPaginationList() {
        return <PaginationComponent
            count={this.props.sortCount}
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
            const totalHeight    = container_pack.offsetHeight - 170;
            const idWidth        = totalWidth * 0.0749;
            const titleWidth     = totalWidth * 0.3537;
            const urlWidth       = totalWidth * 0.4705;
            const operationWidth = totalWidth * 0.0656;

            let tableColumns = [
                { title: 'ID', width: idWidth, dataIndex: 'Sort_ID', key: 'Sort_ID' },
                { title: '名称', width: titleWidth, dataIndex: 'Sort_Name', key: 'Sort_Name' },
                { title: '所属父类', width: urlWidth, dataIndex: 'F_Sort', key: 'F_Sort' },
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
                            title="确定要删除当前分类吗？"
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
                tableData={this.props.sortList}
                selectedRowKeys={this.props.selectedRowKeys}
                checkboxSelected={this.checkboxSelectedHandler.bind(this)}
				expandedRowRender={false}
                scroll={scroll}/>

        }
    }

    operationClickHandler (index, item) {
        // 删除分类
        this.props.dispatch(delSortList(item.Sort_ID.toString()));
    }

    // 选中分类
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
		this.props.dispatch(delSortList(selectStr));
	}


    render() {
        return (
            <div id="page" className="page del-sort-page">
                { this.renderFSortSelect() }
                <div className="del-button">
                    <span>{this.props.hasSelected ? `选择了 ${this.props.selectedRowKeys.length} 个分类` : ''}</span>
                    <Popconfirm title="确定要删除选中的分类吗？" placement="topRight" onConfirm={this.deleteClickHandler.bind(this)}>
                        <Button type="primary"
                                disabled={!this.props.hasSelected}
                                loading={this.props.loading}
                                icon="delete"
                                size="large">
                            删除分类
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
    return Object.assign({}, state.delSort);
}

export default connect( mapStateToProps )( DelSortPage );



