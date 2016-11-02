/**
 * Created by a1 on 2016/5/5.
 */




import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    //currentRoutesChange
} from '../actions/main';


import { Row, Col } from 'antd';

import MenuComponent       from '../components/menu/js/MenuComponent';
import SearchComponent     from '../components/search/js/SearchComponent';
import ToolBarComponent    from '../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../components/breadcrumb/js/BreadcrumbComponent';

export class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div id="main_page">
                <div>
                    <MenuComponent
                        openSubMenu={this.props.routes[2].sort}
                        selectedMenu={this.props.routes[2].bpath} />
                    <div className="ant-layout-main">
                        <div className="ant-layout-header">
                            <Row>
                                <Col span={4}>
                                    <SearchComponent
                                        placeholder="快速菜单入口"
                                        style={{ width: 230 }}
                                    />
                                </Col>
                                <Col span={12} offset={8}>
                                    <ToolBarComponent
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div id="container" className="ant-layout-container">
                            <div className="ant-layout-content">
                                <BreadcrumbComponent
                                    data={this.props.routes}
                                />
                            </div>

                            {/* 渲染子组件 */}
                            {this.props.children}

                        </div>
                        <div className="ant-layout-footer">
                            52DOIT 版权所有 © 2016 由不拽注定被甩~技术支持
                        </div>
                    </div>
                </div>
	        </div>
        );
    }
};



function mapStateToProps ( state ) {
    return Object.assign({}, state.main);
}

export default connect( mapStateToProps )( MainPage );


