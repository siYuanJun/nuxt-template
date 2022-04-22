export default (axios) => ({
    columnList(id, limit) {
        id = id ?? 0
        return axios.$get(`/api/v1/web/column/list/${id}?limit=${limit}`)
    },
    columnDetails(id) {
        return axios.$get(`/api/v1/web/column/details/${id}`)
    },
    infoList(id, params) {
        return axios.$get(`/api/v1/web/info/list/${id}`, {params})
    },
    adDetails(params) {
        return axios.$get(`/api/v1/web/ad/details`, {params})
    },
    home(params) {
        return axios.$get(`/api/v1/web/home`, {params})
    },
})
