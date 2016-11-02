
// 删除评论路由
module.exports = {
    path: 'delComment',
    sort: '评论管理',
    name: '删除评论',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/comment/DelCommentPage').default)
        })
    }
};
