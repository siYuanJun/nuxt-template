export const NAV_PATH = '/gw/get-nav?gw_type=myy'

export const state = () => {
    return {
        fetching: false,
        data: [
            {
                id: '',
                name: '首页',
                router: null,
                path: '/',
                children: [],
                products_info: [],
            },
            {
                id: '',
                name: '解决方案',
                router: null,
                path: '/solution',
                children: [],
                products_info: [],
            },
            {
                id: '',
                name: '产品',
                router: null,
                path: '/product',
                children: [],
                products_info: [],
            },
            {
                id: '',
                name: '客户案例',
                router: null,
                path: '/case',
                children: [],
                products_info: [],
            },
            {
                id: '',
                name: '服务与支持',
                router: null,
                path: '/service',
                children: [],
                products_info: [],
            },
            {
                id: '',
                name: '明源研究院',
                router: null,
                path: '/research_institute',
                children: [],
                products_info: [],
            },
            {
                id: '',
                name: '生态伙伴',
                router: null,
                path: '/ecological_partner',
                children: [],
                products_info: [],
            },
            {
                id: '',
                name: '资源中心',
                router: null,
                path: '/resource_center',
                children: [],
                products_info: [],
            },
            {
                id: '',
                name: '关于我们',
                router: null,
                path: '/about',
                // path: '/',
                children: [],
                products_info: [],
            },
        ],
    }
}

export const mutations = {
    updateFetching(state, action) {
        state.fetching = action
    },
    updateListData(state, action) {
        state.data = action
    },
}

export const actions = {
    fetchList({ commit, state }) {
        commit('updateFetching', true)
        return this.$axios
            .$get(NAV_PATH)
            .then((response) => {
                // commit('updateListData', response)
                commit('updateFetching', false)
            })
            .catch(() => commit('updateFetching', false))
    },
}
