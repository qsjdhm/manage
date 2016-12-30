/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Popconfirm, message, Row, Col, Input, DatePicker, Button, Icon } from 'antd';


import '../../css/setting.less';

export class dataBackupPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {

    }


    // 删除
    deleteClickHandler () {
        this.props.dispatch(loadingChange(true));
        const selectStr = this.props.selectedRowKeys.join(";");
        // 删除文章
        this.props.dispatch(delBackupList(selectStr));
    }


    render() {
        return (
            <div id="page" className="page data-backup-page">
                <Row>
                    <Col span={24}>
                        {/*如果不想栅格等分的话就写一个col，然后用div包裹每个dom*/}
                        <div className="gutter-box">
                            日期区间：
                            <DatePicker.RangePicker size="large" style={{ width: 250 }}  />
                        </div>
                        <div className="gutter-box">
                            <Button type="primary" size="large" icon="search">搜索</Button>
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

            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.dataBackup);
}

export default connect( mapStateToProps )( dataBackupPage );



