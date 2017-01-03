/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    dateChange,
	getBackupList,
    recoverBackup,
    delBackupList,
	selectedPageChange,
	hasSelectedChange,
	selectedRowKeysChange,
	loadingChange
} from '../../actions/setting/dataBackup';

import { Popconfirm, message, Row, Col, Input, DatePicker, Button, Icon } from 'antd';

import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

import '../../css/setting.less';

export class dataBackupPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
		// 获取备份列表
		this.props.dispatch( getBackupList() );
    }

	// 渲染分页条
	renderPaginationList() {
		if(this.props.backupCount.length !== 0) {
			return <PaginationComponent
				count={this.props.backupCount}
				pageSize={2}
				pageed={this.paginationClickHandler.bind(this)}/>
		}
	}

	paginationClickHandler(pageId) {
		this.props.dispatch(selectedPageChange(pageId));
	}

	// 渲染数据表格
	renderTableList() {
		if (this.props.backupList.length !== 0){
			const self = this;

			const totalWidth     = document.getElementById("page").offsetWidth - 45;
			const totalHeight    = document.getElementById("container").offsetHeight - 170;

			const nameWidth      = totalWidth * 0.3465;
			const sizeWidth      = totalWidth * 0.3465;
			const recoverWidth   = totalWidth * 0.1358;
			const delWidth       = totalWidth * 0.1358;

			let tableColumns = [
				{ title: '名称', width: nameWidth, dataIndex: 'Backup_Name', key: 'Backup_Name' },
				{ title: '大小', width: sizeWidth, dataIndex: 'Backup_Size', key: 'Backup_Size' },
			];


			// 设置表格操作列配置
			tableColumns.push(
				{
					title: '恢复',
					width: recoverWidth,
					dataIndex: 'recover',
					key: 'recover',
					render(index, item) {
						return (
							<Popconfirm
								title="确定要恢复到当前节点吗？"
								placement="topRight"
								onConfirm={self.recoverClickHandler.bind(self, index, item)}>

								<a href='javascript:void(0)'>恢复</a>
							</Popconfirm>
						);
					}
				},
				{
					title: '删除',
					width: delWidth,
					dataIndex: 'operation',
					key: 'operation',
					render(index, item) {
						return (
							<Popconfirm
								title="确定要删除当前文章吗？"
								placement="topRight"
								onConfirm={self.operationClickHandler.bind(self, index, item)}>

								<a href='javascript:void(0)'>删除</a>
							</Popconfirm>
						);
					}
				}
			);

			// 表格的配置
			const scroll = { y: totalHeight, x: totalWidth };

			return <TableComponent
				tableColumns={tableColumns}
				tableData={this.props.backupList}
				selectedRowKeys={this.props.selectedRowKeys}
				checkboxSelected={this.checkboxSelectedHandler.bind(this)}
				expandedRowRender={false}
				scroll={scroll}/>
		}
	}

	recoverClickHandler (index, item) {
		// 恢复备份
		this.props.dispatch(recoverBackup(item.Backup_Name.toString()));
	}

	operationClickHandler (index, item) {
		// 删除备份
		this.props.dispatch(delBackupList(item.Backup_Name.toString()));
	}

	// 选中文章
	checkboxSelectedHandler (selectedRowKeys) {
		const hasSelected = selectedRowKeys.length > 0;
		this.props.dispatch(hasSelectedChange(hasSelected));
		this.props.dispatch(selectedRowKeysChange(selectedRowKeys));
	}

    // 删除
    deleteClickHandler () {
        this.props.dispatch(loadingChange(true));
        const selectStr = this.props.selectedRowKeys.join(";");
        // 删除备份
        this.props.dispatch(delBackupList(selectStr));
    }

    // 时间改变
    dateChangeHandler (value, dateString) {

        this.props.dispatch(dateChange(dateString[0], dateString[1]));

        console.log('From: ', value[0], ', to: ', value[1]);
        console.log('From: ', dateString[0], ', to: ', dateString[1]);
    }

    // 搜索按钮点击
    searchClickHandler () {
        this.props.dispatch(selectedPageChange(1));
    }


    render() {
        return (
            <div id="page" className="page data-backup-page">
                <Row>
                    <Col span={24}>
                        {/*如果不想栅格等分的话就写一个col，然后用div包裹每个dom*/}
                        <div className="gutter-box">
                            日期区间：
                            <DatePicker.RangePicker onChange={this.dateChangeHandler.bind(this)} size="large" style={{ width: 250 }}  />
                        </div>
                        <div className="gutter-box">
                            <Button onClick={this.searchClickHandler.bind(this)} type="primary" size="large" icon="search">搜索</Button>
                        </div>

                        <div className="gutter-box gutter-box-right">
                            <div className="del-button">
                                <span>{this.props.hasSelected ? `选择了 ${this.props.selectedRowKeys.length} 个备份` : ''}</span>
                                <Popconfirm title="确定要删除选中的备份吗？" placement="topRight" onConfirm={this.deleteClickHandler.bind(this)}>
                                    <Button type="primary"
                                            disabled={!this.props.hasSelected}
                                            loading={this.props.loading}
                                            icon="delete"
                                            size="large">
                                        删除备份
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>
                    </Col>
                </Row>
				{ this.renderTableList() }
				{ this.renderPaginationList() }
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.dataBackup);
}

export default connect( mapStateToProps )( dataBackupPage );



