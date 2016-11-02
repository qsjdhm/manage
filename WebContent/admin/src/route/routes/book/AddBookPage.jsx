
// 新增图书路由
module.exports = {
    path: 'addBook',
    sort: '图书管理',
    name: '新增图书',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/book/AddBookPage').default)
        })
    }
};
