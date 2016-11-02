
// 删除用户路由
module.exports = {
    path: 'delUser',
    sort: '用户管理',
    name: '删除用户',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/user/DelUserPage').default)
        })
    }
};
