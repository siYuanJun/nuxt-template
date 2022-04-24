export default (axios) => ({
    // 栏目列表
    columnList(id, limit) {
        id = id ?? 0
        return axios.$get(`/api/v1/web/column/list/${id}?limit=${limit}`)
    },
    // 栏目详情
    columnDetails(id) {
        return axios.$get(`/api/v1/web/column/details/${id}`)
    },
    // 文章列表
    infoList(id, params) {
        return axios.$get(`/api/v1/web/info/list/${id}`, {params})
    },
    // 文章详情
    infoDetails(id) {
        return axios.$get(`/api/v1/web/info/details/${id}`)
    },
    // 碎片详情
    adDetails(params) {
        return axios.$get(`/api/v1/web/ad/details`, {params})
    },
    // 首页接口
    home(params) {
        return axios.$get(`/api/v1/web/home`, {params})
    },
    // 栏目菜单
    columnMenu(params) {
        return axios.$get(`/api/v1/web/column/columnMenu`, {params})
    },
    // 栏目及栏目文章
    columnInfoList(params) {
        return axios.$get(`/api/v1/web/column/columnInfoList`, {params})
    },
    // 友情链接
    linkIndex(params) {
        return axios.$get(`/api/v1/web/link/index`, {params})
    },
})
