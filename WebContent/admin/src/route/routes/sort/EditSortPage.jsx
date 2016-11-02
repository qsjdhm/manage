
// 编辑分类路由
module.exports = {
    path: 'editSort',
    sort: '分类管理',
    name: '编辑分类',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/sort/EditSortPage').default)
        })
    }
};
