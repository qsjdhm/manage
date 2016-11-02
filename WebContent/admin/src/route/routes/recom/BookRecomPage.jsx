
// 图书推荐量路由
module.exports = {
    path: 'bookRecom',
    sort: '推荐管理',
    name: '图书推荐量',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/recom/BookRecomPage').default)
        })
    }
};
