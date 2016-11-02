/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    selectedSortIdChange,
    nameChange,
    addSort,
    loadingChange
} from '../../actions/sort/addSort';

import { Form, Input, Button, message } from 'antd';

import SelectComponent     from '../../components/select/js/SelectComponent';


import '../../css/sort.less';

export class AddSortPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {

    }


    // 渲染笔记分类下拉框
    renderSortSelect () {
        const sortList = [
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
            defaultValue={sortList[0].id}
            data={sortList}
            selected={this.sortChangeHandler.bind(this)}/>
    }

    sortChangeHandler (sortId) {
        this.props.dispatch(selectedSortIdChange(sortId));
    }

    nameChangeHandler (e) {
        this.props.dispatch(nameChange(e.target.value));
    }

    submitClickHandler () {
        this.props.dispatch(addSort());
    }


    render() {
        const FormItem = Form.Item;

        return (
            <div id="page" className="page add-sort-page">
                <Form horizontal>
                    <FormItem
                        label="所属分类">
                        { this.renderSortSelect() }
                    </FormItem>

                    <FormItem
                        label="分类名称">
                        <Input onChange={this.nameChangeHandler.bind(this)} placeholder="" size="large"/>
                    </FormItem>
                    <FormItem
                        label="">
                        <Button
                            onClick={this.submitClickHandler.bind(this)}
                            loading={this.props.loading}
                            type="primary"
                            icon="cloud-upload-o"
                            size="large">
                            提交分类
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.addSort);
}

export default connect( mapStateToProps )( AddSortPage );



