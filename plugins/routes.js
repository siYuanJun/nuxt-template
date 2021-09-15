import Vue from 'vue'

const apiPrefix = '/api'

export const routeApi = {
    api_index: '/index',
}

for (const key in routeApi) {
    routeApi[key] = apiPrefix + routeApi[key]
}

export default ({ app, store }) => {
    Vue.prototype.$routeApi = app.$routeApi = routeApi
}
