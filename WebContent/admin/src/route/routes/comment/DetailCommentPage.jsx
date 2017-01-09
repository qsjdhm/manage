
// 编辑文章路由
module.exports = {
    path: 'editComment/:id',
    sort: '评论管理',
    name: '编辑评论',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/comment/DetailCommentPage').default)
        })
    }
};
