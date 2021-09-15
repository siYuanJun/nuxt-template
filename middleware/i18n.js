/*
 * 1. sets i18n.locale and state.locale if possible
 * 2. redirects if not with locale
 */
export default ({ isHMR, app, store, route, params, error, redirect }) => {
    // console.log(isHMR, route);
    if (isHMR) {
        // ignore if called from hot module replacement
        return
    } // if url does not have language, redirect to english
    if (!params.lang) {
        // console.log(route.fullPath.indexOf("/zh/"), route.fullPath.indexOf("/zh/") === -1)
        // return
        if (!route.fullPath.includes('/zh/')) {
            return redirect(`/zh${route.fullPath}`)
        }
    }
    // based on directory structure _lang/xxxx, en/about has params.lang as "en"
    const locale = params.lang || 'zh'
    store.commit('SET_LANG', locale) // set store
    app.i18n.locale = store.state.locale
}
