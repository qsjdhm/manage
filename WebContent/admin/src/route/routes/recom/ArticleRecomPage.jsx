
// 文章推荐量路由
module.exports = {
    path: 'articleRecom',
    sort: '推荐管理',
    name: '文章推荐量',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/recom/ArticleRecomPage').default)
        })
    }
};
