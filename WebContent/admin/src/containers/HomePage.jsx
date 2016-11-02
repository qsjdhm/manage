/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CardComponent       from '../components/card/js/CardComponent';


export class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page" className="page home-page">
                <CardComponent
                />
            </div>
        );
    }
};



function mapStateToProps ( state ) {
    return Object.assign({}, state);
}

export default connect( mapStateToProps )( HomePage );




