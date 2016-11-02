
// 删除文章路由
module.exports = {
    path: 'delArticle',
    sort: '文章管理',
    name: '删除文章',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/article/DelArticlePage').default)
        })
    }
};
