/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getSortList,
    selectedSortChange,
    selectedPageChange
} from '../../actions/article/editArticle';


import { Tooltip, Tag, Row, Col, Input, DatePicker, Button } from 'antd';

import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import UeditorComponent    from '../../components/ueditor/js/UeditorComponent';
import TagComponent        from '../../components/tag/js/TagComponent';

import '../../css/article.less';

export class EditArticlePage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        // 获取文章的分类列表
        this.props.dispatch( getSortList() );
    }


    // 渲染文章分类下拉框
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
        if(this.props.articleCount.length !== 0) {
            return <PaginationComponent
                count={this.props.articleCount}
                pageSize={10}
                pageed={this.paginationClickHandler.bind(this)}/>
        }
    }

    paginationClickHandler(pageId) {
        this.props.dispatch(selectedPageChange(pageId));
    }

    // 渲染数据表格
    renderTableList() {
        if (this.props.articleList.length !== 0){
            const self = this;
            const totalWidth     = document.getElementById("page").offsetWidth - 45;
			const totalHeight    = document.getElementById("container").offsetHeight - 170;
            const idWidth        = totalWidth * 0.0749;
            const titleWidth     = totalWidth * 0.3465;
            const tagWidth      = totalWidth * 0.1737;
            const recomWidth     = totalWidth * 0.0637;
            const readWidth      = totalWidth * 0.0637;
            const dateWidth      = totalWidth * 0.1766;
            const operationWidth = totalWidth * 0.0656;

			// 设置表格操作列配置
			let tableColumns = [
				{ title: 'ID', width: idWidth, dataIndex: 'Article_ID', key: 'Article_ID' },
				{
					title: '名称',
					width: titleWidth,
					dataIndex: 'Article_Title',
					key: 'Article_Title',
					render(index, item) {
						return (
							<Tooltip title="查看文章详情">
								<a href='javascript:void(0)' onClick={self.detailClick.bind(self, index, item)}>{item.Article_Title}</a>
							</Tooltip>
						);
					}
				},
				{
					title: '标签',
					width: tagWidth,
					dataIndex: 'Article_Tag',
					key: 'Article_Tag',
					render(index, item) {
						const tags = item.Article_Tag.split(',').map((tagItem, tagIndex) => {
							return <Tag color="#fff">{tagItem}</Tag>
						});
						return tags;
					}
				},
				{ title: '推荐量', width: recomWidth, dataIndex: 'Recommend_Num', key: 'Recommend_Num' },
				{ title: '点击量', width: readWidth, dataIndex: 'Read_Num', key: 'Read_Num' },
				{ title: '时间', width: dateWidth, dataIndex: 'Article_Date', key: 'Article_Date' },
				{
					title: '操作',
					width: operationWidth,
					dataIndex: 'operation',
					key: 'operation',
					render(index, item) {
						return <a href='javascript:void(0)' onClick={self.operationClick.bind(self, index, item)}>修改</a>
					}
				}
			];


            // 设置表格操作列配置
            tableColumns.push();

            // 表格的配置
            const expandedRowRender = record => <p>{record.Article_Content}</p>;
            const scroll = { y: totalHeight, x: totalWidth };

            return <TableComponent
                tableColumns={tableColumns}
                tableData={this.props.articleList}
                expandedRowRender={expandedRowRender}
                selectedRowKeys={false}
                rowSelection={null}
                checkboxSelected={false}
                scroll={scroll}/>
        }
    }

	detailClick (index, item) {
		window.location.href = '#/home/editArticle/'+item.Article_ID;
		//this.props.dispatch(getArticle(item.Article_ID));
	}

    operationClick (index, item) {
        //this.props.dispatch(getArticle(item.Article_ID));
        //window.location.href = '#/home/editArticle/'+item.Article_ID;
		window.location.href = '#/home/editArticle/association/'+item.Article_ID;
    }

    render() {
        return (
            <div id="page" className="page edit-article-page">
				<Row type="flex" align="middle" gutter={16}>
					<Col className="gutter-row" span={6}>
						{ this.renderSortSelect() }
					</Col>
					<Col className="gutter-row" span={6}>
						<Input style={{width: '218px'}} size="large" placeholder="请输入名称、标签、内容" />
					</Col>
					<Col className="gutter-row" span={8}>
						日期：
						<DatePicker.RangePicker size="large" style={{ width: 250 }}  />
					</Col>
					<Col className="gutter-row" span={4}>
						<Button type="primary" size="large" icon="search">搜索</Button>
					</Col>
				</Row>
                { this.renderTableList() }
                { this.renderPaginationList() }
                {/* 渲染子页面 */}
                {this.props.children}
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.editArticle);
}

export default connect( mapStateToProps )( EditArticlePage );



