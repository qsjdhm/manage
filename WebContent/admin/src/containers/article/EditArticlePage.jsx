/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getSortList,
    getTagList,
    selectedSortChange,
    selectedPageChange,
    getArticle,
    modelVisibleChange,
    modelSaveSortIdChange,
    modelSaveSortNameChange,
    modelSaveTitleChange,
    modelSaveContentChange,
    modelSaveTagChange,
    updateArticle,
    delArticle
} from '../../actions/article/editArticle';


import { Modal, Popconfirm, message, Tooltip, Tag, Row, Col, Input, DatePicker, Button, Dropdown, Menu, Icon } from 'antd';

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

    componentDidMount () {
        // 获取文章的分类列表
        this.props.dispatch( getSortList() );
        // 获取文章的标签列表
        this.props.dispatch( getTagList() );
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
        return <PaginationComponent
            count={this.props.articleCount}
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
            const titleWidth     = totalWidth * 0.3465;
            const tagWidth       = totalWidth * 0.1737;
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
							return <Tag>{tagItem}</Tag>
						});
						return tags;
					}
				},
                {
                    title: '推荐量',
                    width: recomWidth,
                    dataIndex: 'Recommend_Num',
                    key: 'Recommend_Num',
                    sorter: (a, b) => a.Recommend_Num - b.Recommend_Num,
                    render(index, item) {
                        if (item.Recommend_Num > 1000) {
                            return <span style={{color:'red'}}>{item.Recommend_Num}</span>;
                        } else {
                            return <span>{item.Recommend_Num}</span>;
                        }
                    }
                },
                {
                    title: '点击量',
                    width: readWidth,
                    dataIndex: 'Read_Num',
                    key: 'Read_Num',
                    sorter: (a, b) => a.Read_Num - b.Read_Num,
                    render(index, item) {
                        //return item.Read_Num > 1000 ? <span style={{color:'red'}}>{item.Read_Num}</span> : <span>{item.Read_Num}</span>;
                        if (item.Read_Num > 1000) {
                            return <span style={{color:'red'}}>{item.Read_Num}</span>
                        } else {
                            return <span>{item.Read_Num}</span>;
                        }
                    }
                },
				{
                    title: '时间',
                    width: dateWidth,
                    dataIndex: 'Article_Date',
                    key: 'Article_Date',
                },
				{
					title: '操作',
					width: operationWidth,
					dataIndex: 'operation',
					key: 'operation',
					render(index, item) {
                        const menu = (
                            <Menu>
                                <Menu.Item>
                                    <a href='javascript:void(0)' onClick={self.editClick.bind(self, index, item)}>
                                        <Icon type="edit" />
                                        <span>修改文章</span>
                                    </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a href='javascript:void(0)' onClick={self.delClick.bind(self, index, item)}>
                                        <Icon type="delete" />
                                        <span>删除文章</span>
                                    </a>
                                </Menu.Item>
                            </Menu>
                        );
						return (
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link">
                                    <span>更多</span><Icon type="down"/>
                                </a>
                            </Dropdown>
                        );

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
	}

    editClick (index, item) {
        this.props.dispatch(getArticle(item.Article_ID));
    }

    delClick (index, item) {
        this.props.dispatch(delArticle([item.Article_ID]));
    }


    // 渲染弹出层的分类
    renderModelSortList () {
        if(this.props.sortList.length !== 0 && this.props.modelDefaultSortId !== '') {
            return <SelectComponent
                defaultValue={this.props.modelDefaultSortId}
                data={this.props.sortList}
                selected={this.modelSortChangeHandler.bind(this)}/>
        }
    }

    modelSortChangeHandler (sortId) {
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

        this.props.dispatch(modelSaveSortIdChange(nowSort.sortId));
        this.props.dispatch(modelSaveSortNameChange(nowSort.sortName));
    }

    modelTitleChangeHandler (e) {
        this.props.dispatch(modelSaveTitleChange(e.target.value));
    }

    // 渲染弹出层的富文本
    renderModelUeditor () {
        if(this.props.modelSaveContent !== '') {
            return <UeditorComponent
                value={this.props.modelSaveContent}
                id='mContent'
                width='805'
                height='280'
            />
        }
    }

    // 渲染弹出层的标签
    renderModelTag () {
        if(this.props.tagList.length !== 0 && this.props.modelDefaultTag !== '') {
            return  <TagComponent
                width={806}
                data={this.props.tagList}
                defaultValue={this.props.modelDefaultTag}
                selected={this.modelTagChangeHandler.bind(this)}
            />
        }
    }

    modelTagChangeHandler (tag) {
        this.props.dispatch(modelSaveTagChange(tag.join(",")));
    }

    handleOk () {
        // 富文本特殊不能实时变化数据，所以就在这里设置一次
        const content = UE.getEditor("mContent").getContent();
        this.props.dispatch(modelSaveContentChange(content));
        this.props.dispatch(updateArticle());
    }

    handleCancel () {
        this.props.dispatch(modelVisibleChange(false));
    }

    render() {
        return (
            <div id="page" className="page edit-article-page">
				<Row>
					<Col span={24}>
                        {/*如果不想栅格等分的话就写一个col，然后用div包裹每个dom*/}
                        <div className="gutter-box">
                            { this.renderSortSelect() }
                        </div>
                        <div className="gutter-box">
                            <Input style={{width: '218px'}} size="large" placeholder="请输入名称、标签、内容" />
                        </div>
                        <div className="gutter-box">
                            日期：
                            <DatePicker.RangePicker size="large" style={{ width: 250 }}  />
                        </div>
                        <div className="gutter-box">
                            <Button type="primary" size="large" icon="search">搜索</Button>
                        </div>
					</Col>
				</Row>
                { this.renderTableList() }
                { this.renderPaginationList() }
                {/* 渲染子页面 */}
                {this.props.children}

                <Modal title="修改文章详细信息"
                       width="840"
                       style={{ top: 20 }}
                       visible={this.props.modelVisible}
                       onOk={this.handleOk.bind(this)}
                       onCancel={this.handleCancel.bind(this)}>

                    { this.renderModelSortList() }
                    <Input value={this.props.modelSaveTitle} onChange={this.modelTitleChangeHandler.bind(this)}  style={{ width: 430 }} size="large" placeholder=""/>
                    { this.renderModelUeditor() }
                    { this.renderModelTag() }
                </Modal>
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.editArticle);
}

export default connect( mapStateToProps )( EditArticlePage );



