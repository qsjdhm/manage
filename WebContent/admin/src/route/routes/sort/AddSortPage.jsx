
// 新增分类路由
module.exports = {
    path: 'addSort',
    sort: '分类管理',
    name: '新增分类',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/sort/AddSortPage').default)
        })
    }
};
