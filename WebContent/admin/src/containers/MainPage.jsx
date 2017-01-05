/**
 * Created by a1 on 2016/5/5.
 */




import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { getUnreadCount } from '../actions/common';

import { Row, Col, notification } from 'antd';

import MenuComponent       from '../components/menu/js/MenuComponent';
import SearchComponent     from '../components/search/js/SearchComponent';
import ToolBarComponent    from '../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../components/breadcrumb/js/BreadcrumbComponent';

export class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        this.props.dispatch( getUnreadCount() );
    }

    renderUnreadTip () {
        console.info(this.props);
        if (this.props.common.unreadTip) {
            //alert('true');
            //notification.open({
            //    message: '这是标题',
            //    description: '这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案',
            //    duration: 0
            //})
        }
    }

    aa (v) {
        alert(v);
    }

    render() {
        return (
            <div id="main_page">
                <div>
                    { this.renderUnreadTip() }
                    <MenuComponent
                        openSubMenu={this.props.routes[2].sort}
                        selectedMenu={this.props.routes[2].name}
						menuList={this.props.common.menuList}
					/>
                    <div className="ant-layout-main">
                        <div className="ant-layout-header">
                            <Row>
                                <Col span={4}>
                                    <SearchComponent
                                        placeholder="快速菜单入口"
                                        style={{ width: 230 }}
                                        menuList={this.props.common.menuList}
                                    />
                                </Col>
                                <Col span={12} offset={8}>
                                    {/*因为登录的时候已经把用户名写到本地数据库了，所以这里只需要获取就行了*/}
                                    <ToolBarComponent manageName={localStorage["manageTokenName"]}
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

                            {/* 渲染子页面 */}
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
    return Object.assign({}, state);
}

export default connect( mapStateToProps )( MainPage );


