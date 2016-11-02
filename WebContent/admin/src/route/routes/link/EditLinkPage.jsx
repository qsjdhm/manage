
// 编辑外链路由
module.exports = {
    path: 'editLink',
    sort: '外链管理',
    name: '编辑外链',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/link/EditLinkPage').default)
        })
    }
};
