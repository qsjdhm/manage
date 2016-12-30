/**
 * Created by zhangyan on 2016/1/12.
 */

import 'antd/dist/antd.css';
import '../css/menu.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';


export default class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
    }

	renderMenus () {
		const menus = this.props.menuList.map((item, index) => {

			let menuItem = item.subMenu.map((subItem, subIndex) => {
				return (
					<Menu.Item key={subItem.name}>
						<Link to={subItem.path}>{subItem.name}</Link>
					</Menu.Item>
				);
			});

			return (
				<Menu.SubMenu key={item.name} title={<span><Icon type={item.icon} />{item.name}</span>}>
					{menuItem}
				</Menu.SubMenu>
			);

		});
		return menus;
	}

    render() {
        return (
            <div className="ant-layout-aside">
                <aside className="ant-layout-sider">
                    <div className="ant-layout-logo">
                        <img src={require("../img/logo.png")} />
                        <span>MANAGE</span>
                    </div>
                    <Menu
	                    mode="inline"
	                    theme="dark"
                        openKeys={[this.props.openSubMenu]}
                        selectedKeys={[this.props.selectedMenu]}>
                        <Menu.Item key="系统首页"><Icon type="desktop" /><Link style={{display: "inline-block",width: "100%"}} to="/home">系统首页</Link></Menu.Item>

						{this.renderMenus()}
                    </Menu>
                </aside>
            </div>
        );
    }
};
