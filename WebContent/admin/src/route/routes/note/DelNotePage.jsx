
// 删除笔记路由
module.exports = {
    path: 'delNote',
    sort: '笔记管理',
    name: '删除笔记',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            // webpack不支持es6模块，所以要加上default
            cb(null, require('../../../containers/note/DelNotePage').default)
        })
    }
};
