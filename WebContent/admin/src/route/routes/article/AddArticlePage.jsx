
// 新增文章路由
module.exports = {
    path: 'addArticle',
    sort: '文章管理',
    name: '新增文章',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/article/AddArticlePage').default)
        })
    }
};
