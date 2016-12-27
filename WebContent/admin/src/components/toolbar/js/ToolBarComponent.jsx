/**
 * Created by zhangyan on 2016/1/12.
 */

import 'antd/dist/antd.css';
import '../css/toolbar.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Dropdown, Menu, Icon } from 'antd';
import auth from '../../../utils/auth';


export default class ToolBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    logout() {
        auth.logout();
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
					<Link to="/home/setting">
						<Icon type="user" />
						<span>用户中心</span>
					</Link>
                </Menu.Item>
                <Menu.Item>
                    <a href="https://github.com/qsjdhm">
                        <Icon type="phone" />
                        <span>帮助</span>
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.logout.bind(this)}>
                        <Icon type="logout" />
                        <span>退出</span>
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="toolbar-component">
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                        <span>{this.props.manageName}</span>
                        <Icon type="down"/>
                    </a>
                </Dropdown>
            </div>
        );
    };
};
