
// 新增用户路由
module.exports = {
    path: 'addUser',
    sort: '用户管理',
    name: '新增用户',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/user/AddUserPage').default)
        })
    }
};
