/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    idChange,
    nameChange,
    contentChange,
    updateComment,
    pageLoadingChange
} from '../../actions/comment/detailComment';

import { Spin, Tabs, Icon, Form, Input, Button, message } from 'antd';

import '../../css/comment.less';

// 编辑文章详情页
export class DetailCommentPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        // 获取当前文章内容
        this.props.dispatch( idChange(this.props.params.id) );
    }

    // 页面销毁时，重置当前状态
    componentWillMount () {
        this.props.dispatch( pageLoadingChange(true) );
	}

    nameChangeHandler (e) {
        this.props.dispatch(nameChange(e.target.value));
    }

    contentChangeHandler (e) {
        this.props.dispatch(contentChange(e.target.value));
    }

    submitClickHandler () {
        this.props.dispatch(updateComment());
    }

    replyClickHandler () {
        this.props.dispatch(updateComment());
    }

    render() {
        const FormItem = Form.Item;
        return (
            <div id="page" className="page detail-comment-page">
                <Spin size="large" spinning={this.props.pageLoading}>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab={<span><Icon type="file-text" />评论详情</span>} key="1">
                            <Form horizontal>
                                <FormItem
                                    label="评论用户">
                                    <Input value={this.props.name} onChange={this.nameChangeHandler.bind(this)} style={{width:'470px'}} placeholder="" size="large"/>
                                </FormItem>
                                <FormItem
                                    label="评论内容">
                                    <Input value={this.props.content} onChange={this.contentChangeHandler.bind(this)} style={{width:'600px'}} type="textarea" rows="6" size="large"/>
                                </FormItem>
                                <FormItem
                                    label="">
                                    <Button
                                        onClick={this.replyClickHandler.bind(this)}
                                        type="primary"
                                        icon="message"
                                        size="large">
                                        回复
                                    </Button>
                                    <Button
                                        onClick={this.submitClickHandler.bind(this)}
                                        type="primary"
                                        icon="cloud-upload-o"
                                        size="large">
                                        保存修改
                                    </Button>
                                </FormItem>
                            </Form>
                        </Tabs.TabPane>
                    </Tabs>
                </Spin>
            </div>
        );
    }
};


function mapStateToProps ( state ) {
    return Object.assign({}, state.detailComment);
}

export default connect( mapStateToProps )( DetailCommentPage );



