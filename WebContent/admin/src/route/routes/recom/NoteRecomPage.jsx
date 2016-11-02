
// 笔记推荐量路由
module.exports = {
    path: 'noteRecom',
    sort: '推荐管理',
    name: '笔记推荐量',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/recom/NoteRecomPage').default)
        })
    }
};
