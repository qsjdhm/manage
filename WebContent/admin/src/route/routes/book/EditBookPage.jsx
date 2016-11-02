
// 编辑图书路由
module.exports = {
    path: 'editBook',
    sort: '图书管理',
    name: '编辑图书',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/book/EditBookPage').default)
        })
    }
};
