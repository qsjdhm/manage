
// 新增笔记路由
module.exports = {
    path: 'addNote',
    sort: '笔记管理',
    name: '新增笔记',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/note/AddNotePage').default)
        })
    }
};
