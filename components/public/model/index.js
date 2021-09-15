import model from './model.vue'

export default {
    install(Vue) {
        const defaults = {
            show: false,
            mask: true,
            title: '提示',
            content: '这是正文',
            confirmButton: true,
            cancelButton: true,
            confirmText: '确认',
            cancelText: '取消',
            cancelCallBack: () => {},
            confirmCallBack: () => {},
        }

        const ModelVueConstructor = Vue.extend(model)

        Vue.prototype.$model = (options = {}) => {
            if (Vue.prototype.$isServer) { return }
            options = { ...defaults, ...options }
            const parent = document.body
            const instance = new ModelVueConstructor({
                el: document.createElement('div'),
                data: options,
            })
            parent.appendChild(instance.$el)

            return instance
        }
    },
}
