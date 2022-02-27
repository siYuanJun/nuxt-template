export default ({ route, app }, inject) => {
    const models = {
        async getExtConfig(field) {
            let extConfig = app.$tools.getLocalStorage('ddc-extConfig')
            // extConfig = ''
            if (!extConfig) {
                app.$tools.dd('缓存数据请求')
                extConfig = await app.$request.common.statusMap()
            } else {
                app.$tools.dd('本地缓存读取')
            }
            return field ? extConfig[field] : extConfig
        },
    }
    inject('sysModels', models)
}
