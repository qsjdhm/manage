
// 编辑文章路由
module.exports = {
    path: 'editArticle/:id',
    sort: '文章管理',
    name: '编辑文章',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/article/DetailArticlePage').default)
        })
    }
};
