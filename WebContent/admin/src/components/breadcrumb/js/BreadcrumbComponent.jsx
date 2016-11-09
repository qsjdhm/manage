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
			console.info(item);
            if (item.path == undefined) {
                // 添加个空的span
                return <span key={index}></span>;
            } else {
                return <Breadcrumb.Item key={index} href={'#/'+item.path}> {item.name} </Breadcrumb.Item>;
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
