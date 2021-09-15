import encrytion from './encrytion'

export function getToken(app) {
    return encrytion.aesDecrypt(app.$cookies.get(app.$config.loginKey))
}
