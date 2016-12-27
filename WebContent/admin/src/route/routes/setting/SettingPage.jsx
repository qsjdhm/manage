
// 新增文章路由
module.exports = {
    path: 'setting',
    sort: '系统管理',  // 根据sort设置menu的哪个分类打开
    name: '系统设置',  // 根据name设置menu的哪个菜单选中
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/setting/SettingPage').default)
        })
    }
};