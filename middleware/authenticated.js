import encrytion from '@/plugins/encrytion'

export default ({ app, store, redirect }) => {
    const loginId = encrytion.aesDecrypt(app.$cookies.get(app.$config.loginKey))
    // If the user is not authenticated
    store.commit('setLoginId', loginId)

    if (!store.state.loginId) {
        return redirect(app.i18n.path('user/login'))
    }
}
