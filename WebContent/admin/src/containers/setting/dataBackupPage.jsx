/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


import { Input, Button, notification, message, Row, Col } from 'antd';


export class dataBackupPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {

    }



    render() {
        return (
            <div id="page" className="page data-backup-page">
				settingasd
            </div>
        );
    }
};




function mapStateToProps ( state ) {
    return Object.assign({}, state.dataBackup);
}

export default connect( mapStateToProps )( dataBackupPage );



