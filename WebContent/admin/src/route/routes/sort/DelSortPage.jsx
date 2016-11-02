
// 删除分类路由
module.exports = {
    path: 'delSort',
    sort: '分类管理',
    name: '删除分类',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/sort/DelSortPage').default)
        })
    }
};
