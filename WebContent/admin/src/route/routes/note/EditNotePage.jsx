
// 编辑笔记路由
module.exports = {
    path: 'editNote',
    sort: '笔记管理',
    name: '编辑笔记',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/note/EditNotePage').default)
        })
    }
};
