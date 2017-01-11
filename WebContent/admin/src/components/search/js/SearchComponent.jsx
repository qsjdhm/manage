/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import { Input, Select, Button, Icon } from 'antd';
import classNames from 'classnames';
//import 'antd/dist/antd.css';
import '../css/search.less';


export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            focus: false
        };
        // 遇到方法中使用this的都需要在这里绑定
        this.handleChange    = this.handleChange.bind(this);
        this.handleSelect    = this.handleSelect.bind(this);
    }

    handleChange(value) {
        window.location.href = value;
    }

    handleSelect(value, option) {
        console.info(value);
    }

	renderOptGroup () {
		const optionGroup = this.props.menuList.map((item, index) => {

			let optionItem = item.subMenu.map((subItem, subIndex) => {
				return (
					<Select.Option key={'#'+subItem.path} >{subItem.name}</Select.Option>
				);
			});

			return (
				<Select.OptGroup label={item.name}>
					{optionItem}
				</Select.OptGroup>
			);
		});
		return optionGroup;
	}

    render() {
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim()
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus
        });
        return (
            <div className="ant-search-input-wrapper search-package" style={this.props.style}>
                <Input.Group className={searchCls}>
                    <Select
                        showSearch
                        size="large"
                        style={this.props.style}
                        placeholder={this.props.placeholder}
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onSelect={this.handleSelect}
                        onChange={this.handleChange}>
                        {this.renderOptGroup()}
                    </Select>
                    <div className="ant-input-group-wrap">
                        <Button size="large" className={btnCls} onClick={this.handleSubmit}>
                            <Icon type="search" />
                        </Button>
                    </div>
                </Input.Group>
            </div>
        );

    }
};
