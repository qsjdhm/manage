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
                        <Menu.SubMenu key="文章管理" title={<span><Icon type="file-text" />文章管理</span>}>
                            <Menu.Item key="新增文章"><Link to="/home/addArticle">新增文章</Link></Menu.Item>
                            <Menu.Item key="编辑文章"><Link to="/home/editArticle">编辑文章</Link></Menu.Item>
                            <Menu.Item key="删除文章"><Link to="/home/delArticle">删除文章</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="笔记管理" title={<span><Icon type="copy" />笔记管理</span>}>
                            <Menu.Item key="新增笔记"><Link to="/home/addNote">新增笔记</Link></Menu.Item>
                            <Menu.Item key="编辑笔记"><Link to="/home/editNote">编辑笔记</Link></Menu.Item>
                            <Menu.Item key="删除笔记"><Link to="/home/delNote">删除笔记</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="图书管理" title={<span><Icon type="book" />图书管理</span>}>
                            <Menu.Item key="新增图书"><Link to="/home/addBook">新增图书</Link></Menu.Item>
                            <Menu.Item key="编辑图书"><Link to="/home/editBook">编辑图书</Link></Menu.Item>
                            <Menu.Item key="删除图书"><Link to="/home/delBook">删除图书</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="评论管理" title={<span><Icon type="message" />评论管理</span>}>
                            <Menu.Item key="编辑评论"><Link to="/home/editComment">编辑评论</Link></Menu.Item>
                            <Menu.Item key="删除评论"><Link to="/home/delComment">删除评论</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="外链管理" title={<span><Icon type="export" />外链管理</span>}>
                            <Menu.Item key="新增外链"><Link to="/home/addLink">新增外链</Link></Menu.Item>
                            <Menu.Item key="编辑外链"><Link to="/home/editLink">编辑外链</Link></Menu.Item>
                            <Menu.Item key="删除外链"><Link to="/home/delLink">删除外链</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="分类管理" title={<span><Icon type="appstore-o" />分类管理</span>}>
                            <Menu.Item key="新增分类"><Link to="/home/addSort">新增分类</Link></Menu.Item>
                            <Menu.Item key="编辑分类"><Link to="/home/editSort">编辑分类</Link></Menu.Item>
                            <Menu.Item key="删除分类"><Link to="/home/delSort">删除分类</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="推荐管理" title={<span><Icon type="like" />推荐管理</span>}>
                            <Menu.Item key="文章推荐量"><Link to="/home/articleRecom">文章推荐量</Link></Menu.Item>
                            <Menu.Item key="笔记推荐量"><Link to="/home/noteRecom">笔记推荐量</Link></Menu.Item>
                            <Menu.Item key="图书推荐量"><Link to="/home/bookRecom">图书推荐量</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="用户管理" title={<span><Icon type="user" />用户管理</span>}>
                            <Menu.Item key="新增用户"><Link to="/home/addUser">新增用户</Link></Menu.Item>
                            <Menu.Item key="编辑用户"><Link to="/home/editUser">编辑用户</Link></Menu.Item>
                            <Menu.Item key="删除用户"><Link to="/home/delUser">删除用户</Link></Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </aside>
            </div>
        );
    }
};
