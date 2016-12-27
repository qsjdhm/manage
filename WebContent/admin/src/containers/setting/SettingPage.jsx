/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


import { Input, Button, notification, message, Row, Col } from 'antd';


export class SettingPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {

    }



    render() {
        return (
            <div id="page" className="page setting-page">
				setting
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.Setting);
}

export default connect( mapStateToProps )( SettingPage );



