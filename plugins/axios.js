import encrytion from './encrytion'

export default ({ $axios, app, redirect, store }) => {
    // $axios.setHeader('Authorization-Token', 'xxxxx')
    // $axios.setHeader('content-type', 'application/x-www-form-urlencoded')

    $axios.defaults.withCredentials = true

    // 请求的拦截器
    $axios.interceptors.request.use(
        (config) => {
            // const token = localStorage.getItem('token')
            const { locale } = store.state
            const token = encrytion.aesDecrypt(app.$cookies.get(app.$config.loginKey))
            const params = {
                lang: locale,
                token,
            }
            // 判断请求的类型
            // 如果是post请求就把默认参数拼到data里面
            // 如果是get请求就拼到params里面
            if (config.method === 'post') {
                const { data } = config
                config.data = app.$tools.jsToFormData({
                    ...params,
                    ...data,
                })
            } else if (config.method === 'get') {
                config.params = {
                    ...params,
                    ...config.params,
                }
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        },
    )

    $axios.onResponse((res) => {
        return res
    })

    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        console.log('[$axios]', error)
        switch (code) {
        // 错误代码
        case 300:
            app.$cookies.set(app.$config.loginKey, 0)
            store.commit('setLoginId', 0)
            redirect(app.i18n.path('user/login'))
            break
        case 404:
            // sessionStorage.clear();
            break
        case 500:
            break
        default:
            break
        }
    })
}
