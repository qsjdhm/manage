/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import { Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

import '../css/breadcrumb.less';

export default class BreadcrumbComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const breadcrumbItems = this.props.data.map((item, index) => {
            if (item.path == undefined || item.name == undefined ) {
                // 添加个空的span
                return <span key={index}></span>;
            } else {
                if (item.path === 'home') {  // 系统首页
                    return <Breadcrumb.Item key={index} href={'#/'+item.path}> {item.name} </Breadcrumb.Item>;
                } else if (item.path.split(':id').length > 1) {  // 有详情的模式
                    return (
                        <span>
                            <Breadcrumb.Item key={index} href={'#/home/'+item.path.split('/:id')[0]}>{item.name}</Breadcrumb.Item>
                            <span className='crumb-item-separator'>/</span>
                            <span className='crumb-item-details'>详情</span>
                        </span>
                    );
                } else {  // 正常菜单
                    return <Breadcrumb.Item key={index} href={'#/home/'+item.path}> {item.name} </Breadcrumb.Item>;
                }
            }
        });

        return (
            <div className="breadcrumb-component">
                <Breadcrumb separator="/">
                    {breadcrumbItems}
                </Breadcrumb>
            </div>
        );
    }
};
