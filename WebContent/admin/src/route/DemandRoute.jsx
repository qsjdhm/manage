/**
 * Created by a1 on 2016/5/5.
 */

import React             from 'react';
import ReactDOM          from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import useBasename       from 'history/lib/useBasename';
import auth              from '../utils/auth';
import LoginPage         from '../containers/LoginPage';
import MainPage          from '../containers/MainPage';
import HomePage          from '../containers/HomePage';
import NotFound          from '../containers/NotFound';

function redirectToLogin(nextState, replace) {
    // 如果没有登录就跳转登录页
    if (!auth.loggedIn()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

function redirectToHome(nextState, replace) {
    // 如果已经登录就直接跳转到home页
    if (auth.loggedIn()) {
        replace('/home');
    }
}

// 导出的这个类中的key都会在props中的routes中存在
const rootRoute = {
    component: 'div',
    childRoutes: [
        {
            onEnter: redirectToHome,
            name: '登录页',
            path: '/',
            component: LoginPage
        },
        {
            // 主架构页面
            onEnter: redirectToLogin,
            name: '系统首页',
            path: 'home',
            component: MainPage,
            indexRoute: {
                // 系统欢迎页
                name: '系统首页',
                //path: 'home',
                component:  HomePage
            },
            childRoutes: [
                // 这里的子路由是在框架内切换页面，每个子路由里面再有子路由是在子路由里面切换页面
                require('./routes/article/AddArticlePage'),
                require('./routes/article/EditArticlePage'),
				require('./routes/article/DetailArticlePage'),
                require('./routes/article/DelArticlePage'),

                require('./routes/note/AddNotePage'),
                require('./routes/note/EditNotePage'),
                require('./routes/note/DelNotePage'),

                require('./routes/book/AddBookPage'),
                require('./routes/book/EditBookPage'),
                require('./routes/book/DelBookPage'),

                require('./routes/comment/EditCommentPage'),
                require('./routes/comment/DelCommentPage'),

                require('./routes/link/AddLinkPage'),
                require('./routes/link/EditLinkPage'),
                require('./routes/link/DelLinkPage'),

                require('./routes/sort/AddSortPage'),
                require('./routes/sort/EditSortPage'),
                require('./routes/sort/DelSortPage'),

                require('./routes/recom/ArticleRecomPage'),
                require('./routes/recom/NoteRecomPage'),
                require('./routes/recom/BookRecomPage'),

                require('./routes/user/AddUserPage'),
                require('./routes/user/EditUserPage'),
                require('./routes/user/DelUserPage'),
            ]
        },{
            path: '*',
            component: NotFound
        }
    ]
};



function withExampleBasename(history, dirname) {
    return useBasename(() => history)({ basename: `/${dirname}` })
}


export default class DemandRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router history={withExampleBasename(hashHistory, __dirname)} routes={rootRoute} />
		);
	}
};











