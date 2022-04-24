export const state = () => ({
    locales: ['zh', 'en'],
    locale: 'zh',

    columnList: [],
    loginId: '',
    userInfo: {},
    homeBanner: [],
    columnListMenu: {}
})

export const mutations = {
    SET_LANG(state, locale) {
        if (state.locales.includes(locale) !== -1) {
            state.locale = locale
        }
    },
    setColumnMenu(state, data) {
        state.columnListMenu = data
    },
    setColumn(state, data) {
        state.columnList = data
    },
    setLoginId(state, data) {
        state.loginId = data
    },
    setUserInfo(state, data) {
        state.userInfo = data
    },
    setHomeBanner(state, data) {
        state.homeBanner = data
    }
}
