
// 新增外链路由
module.exports = {
    path: 'addLink',
    sort: '外链管理',
    name: '新增外链',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/link/AddLinkPage').default)
        })
    }
};
