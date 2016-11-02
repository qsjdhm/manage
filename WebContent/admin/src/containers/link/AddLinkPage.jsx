/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    nameChange,
    urlChange,
    addLink,
    loadingChange
} from '../../actions/link/addLink';

import { Form, Input, Button, notification, message } from 'antd';

import '../../css/link.less';

export class AddLinkPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {

    }

    nameChangeHandler (e) {
        this.props.dispatch(nameChange(e.target.value));
    }

    urlChangeHandler (e) {
        this.props.dispatch(urlChange(e.target.value));
    }

    submitClickHandler () {
        this.props.dispatch( addLink() );
    }

    render() {
        const FormItem = Form.Item;
        return (
            <div id="page" className="page add-link-page">
                <Form horizontal>
                    <FormItem
                        label="链接名称">
                        <Input onChange={this.nameChangeHandler.bind(this)} placeholder="" size="large"/>
                    </FormItem>
                    <FormItem
                        label="链接地址">
                        <Input onChange={this.urlChangeHandler.bind(this)} placeholder="" size="large"/>
                    </FormItem>
                    <FormItem
                        label="">
                        <Button
                            onClick={this.submitClickHandler.bind(this)}
                            loading={this.props.loading}
                            type="primary"
                            icon="cloud-upload-o"
                            size="large">
                            提交外链
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.addLink);
}

export default connect( mapStateToProps )( AddLinkPage );



