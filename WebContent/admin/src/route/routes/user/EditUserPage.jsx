
// 编辑用户路由
module.exports = {
    path: 'editUser',
    sort: '用户管理',
    name: '编辑用户',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/user/EditUserPage').default)
        })
    }
};
