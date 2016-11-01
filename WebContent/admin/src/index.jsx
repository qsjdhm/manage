
import React          from 'react';
import { render }     from 'react-dom';
import { Provider }   from 'react-redux';
import configureStore from './stores/index';
//var configureStore = require('./stores/index');
//import OrdinaryRoute  from './route/OrdinaryRoute';  // 普通的路由
import DemandRoute    from './route/DemandRoute';  // 按需加载路由

import 'antd/dist/antd.css';
import './css/layout.less';

const store = configureStore();

render(
    <Provider store={store}>
        <DemandRoute />
    </Provider>,
    document.getElementById('root_page')
);
