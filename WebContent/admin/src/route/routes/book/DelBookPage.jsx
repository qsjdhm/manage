
// 删除图书路由
module.exports = {
    path: 'delBook',
    sort: '图书管理',
    name: '删除图书',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/book/DelBookPage').default)
        })
    }
};
