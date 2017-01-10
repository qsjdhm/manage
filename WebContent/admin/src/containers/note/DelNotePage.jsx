/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getSortList,
    selectedSortChange,
    selectedPageChange,
	hasSelectedChange,
	selectedRowKeysChange,
    delNoteList,
	loadingChange
} from '../../actions/note/delNote';

import { Popconfirm, Button, message } from 'antd';

import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

import '../../css/note.less';

export class DelNotePage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        // 获取笔记的分类列表
        this.props.dispatch( getSortList() );
    }


    // 渲染笔记分类下拉框
    renderSortSelect () {
        if( this.props.sortList.length !== 0 ) {
            return <SelectComponent
                defaultValue={this.props.sortList[0].id}
                data={this.props.sortList}
                selected={this.sortChangeHandler.bind(this)}/>
        }
    }

    sortChangeHandler (sortId) {
        this.props.dispatch(selectedSortChange(sortId));
    }

    // 渲染分页条
    renderPaginationList() {
        return <PaginationComponent
            count={this.props.noteCount}
            pageSize={10}
            pageed={this.paginationClickHandler.bind(this)}/>
    }

    paginationClickHandler(pageId) {
        this.props.dispatch(selectedPageChange(pageId));
    }

    // 渲染数据表格
    renderTableList() {
        if (document.getElementById("container")){
            const self = this;
			const totalWidth     = document.getElementById("container").offsetWidth - 45;
			const totalHeight    = document.getElementById("container").offsetHeight - 170;
            const idWidth        = totalWidth * 0.0749;
            const titleWidth     = totalWidth * 0.3465;
            const sortWidth      = totalWidth * 0.1737;
            const recomWidth     = totalWidth * 0.0637;
            const readWidth      = totalWidth * 0.0637;
            const dateWidth      = totalWidth * 0.1766;
            const operationWidth = totalWidth * 0.0656;

            let tableColumns = [
                { title: 'ID', width: idWidth, dataIndex: 'Article_ID', key: 'Article_ID' },
                { title: '名称', width: titleWidth, dataIndex: 'Article_Title', key: 'Article_Title' },
                { title: '分类', width: sortWidth, dataIndex: 'Sort_Name', key: 'Sort_Name' },
                { title: '推荐量', width: recomWidth, dataIndex: 'Recommend_Num', key: 'Recommend_Num' },
                { title: '点击量', width: readWidth, dataIndex: 'Read_Num', key: 'Read_Num' },
                { title: '时间', width: dateWidth, dataIndex: 'Article_Date', key: 'Article_Date' }
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
                            title="确定要删除当前笔记吗？"
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
                tableData={this.props.noteList}
                selectedRowKeys={this.props.selectedRowKeys}
                checkboxSelected={this.checkboxSelectedHandler.bind(this)}
				expandedRowRender={false}
                scroll={scroll}/>

        }
    }

    operationClickHandler (index, item) {
        // 删除笔记
        this.props.dispatch(delNoteList(item.Article_ID.toString()));
    }

    // 选中笔记
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
		this.props.dispatch(delNoteList(selectStr));
	}


    render() {
        return (
            <div id="page" className="page del-note-page">
                { this.renderSortSelect() }
                <div className="del-button">
                    <span>{this.props.hasSelected ? `选择了 ${this.props.selectedRowKeys.length} 篇笔记` : ''}</span>
                    <Popconfirm title="确定要删除选中的笔记吗？" placement="topRight" onConfirm={this.deleteClickHandler.bind(this)}>
                        <Button type="primary"
                                disabled={!this.props.hasSelected}
                                loading={this.props.loading}
                                icon="delete"
                                size="large">
                            删除笔记
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
    return Object.assign({}, state.delNote);
}

export default connect( mapStateToProps )( DelNotePage );



