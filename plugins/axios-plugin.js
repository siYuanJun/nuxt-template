// plugins/request-plugin.js
import apis from '@/api/index'
export default (ctx, inject) => {
    const apiObject = {}
    for (const i in apis) {
        apiObject[i] = apis[i](ctx.$axios, ctx.app)
    }
    inject('request', apiObject)
}
