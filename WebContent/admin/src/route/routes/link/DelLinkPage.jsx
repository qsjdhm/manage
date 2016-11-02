
// 删除外链路由
module.exports = {
    path: 'delLink',
    sort: '外链管理',
    name: '删除外链',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/link/DelLinkPage').default)
        })
    }
};
