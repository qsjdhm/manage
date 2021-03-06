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
    coverChange,
    titleChange,
    heightChange,
    pathChange,
    addBook,
    loadingChange
} from '../../actions/book/addBook';

import { Form, Upload, Input, Button, Icon, message } from 'antd';

import SelectComponent     from '../../components/select/js/SelectComponent';



import '../../css/book.less';

export class AddBookPage extends React.Component {
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

    // 上传成功的回调方法
    uploaderSuccessHandler (info) {
        message.success(`${info.file.name} 上传成功。`);
        this.props.dispatch(coverChange(info.file.response));
    }

    // 上传失败的回调方法
    uploaderErrorHandler (info) {
        message.error(`${info.file.name} 上传失败。`);
    }

    titleChangeHandler (e) {
        this.props.dispatch(titleChange(e.target.value));
    }

    heightChangeHandler (e) {
        this.props.dispatch(heightChange(e.target.value));
    }

    pathChangeHandler (e) {
        this.props.dispatch(pathChange(e.target.value));
    }

    submitClickHandler () {
        this.props.dispatch(addBook());
    }


    render() {
        const self = this;
        const FormItem = Form.Item;
        const updateProps = {                // 图书路径
            name: 'file',
            action: ENV.baseUrl + "/UniversalUploadAction",
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    self.uploaderSuccessHandler(info);
                } else if (info.file.status === 'error') {
                    self.uploaderErrorHandler(info);
                }
            }
        };

        return (
            <div id="page" className="page add-book-page">
                <Form horizontal>
                    <FormItem
                        label="图书封面">
                        <Upload {...updateProps}>
                            <Button className="uploader-btn" type="ghost">
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                    </FormItem>
                    <FormItem
                        label="图书分类">
                        { this.renderSortSelect() }
                    </FormItem>

                    <FormItem
                        label="图书名称">
                        <Input onChange={this.titleChangeHandler.bind(this)} placeholder="" size="large"/>
                    </FormItem>
                    <FormItem
                        label="图书高度">
                        <Input onChange={this.heightChangeHandler.bind(this)} placeholder="" size="large"/>
                    </FormItem>
                    <FormItem
                        label="下载路径">
                        <Input onChange={this.pathChangeHandler.bind(this)} type="textarea" rows="3" size="large"/>
                    </FormItem>
                    <FormItem
                        label="">
                        <Button
                            onClick={this.submitClickHandler.bind(this)}
                            loading={this.props.loading}
                            type="primary"
                            icon="cloud-upload-o"
                            size="large">
                            提交图书
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.addBook);
}

export default connect( mapStateToProps )( AddBookPage );



