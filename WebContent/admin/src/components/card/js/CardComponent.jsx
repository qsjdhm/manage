/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import '../css/card.less';

export default class CardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

	renderCard () {
		const cardItems = this.props.menuList.map((item, index) => {
			// 先处理子对象，组织好了在return到ul中
			let cardItem = item.subMenu.map((subItem, subIndex) => {
				return (
					<li>
						<Link to={subItem.path}>{subItem.name}</Link>
					</li>
				);
			});

			return (
				<li className="m-function-item">
					<div>
						<div className="m-f-menu-header">
							<span className="m-f-menu-tip">{item.name}</span>
						</div>
						<div className="m-f-menu-list">
							<ul className="block__list block__list_words">
								{cardItem}
							</ul>
						</div>
					</div>
				</li>
			);
		});

		return cardItems;
	}

    render() {
        return (
            <div className="card-package">
                <div className="m-function-list">
                    <ul>
						{this.renderCard()}
                    </ul>
                </div>
            </div>
        );
    }
};
