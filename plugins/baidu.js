/* eslint-disable no-underscore-dangle */
import { baiduCountMobileArr } from '~/utils/BaiDuCount.js'

export default ({ app: { router }, store }) => {
    /* 每次路由变更时进行pv统计 */
    router.afterEach((to, from, next) => {
        // 加上try 不然会报错
        try {
            const { city } = to.params
            // eslint-disable-next-line no-empty
            if (city === '') {} else {
                baiduCountMobileArr.forEach((value, index) => {
                    if (value.city === city) {
                        baiduCountCode(value.code)
                    }
                })
            }
            /* 平台主域名统计 */
            baiduCountAllCode(baiduCountMobileArr[0].code)
        } catch (e) {}
    })
}

function baiduCountAllCode(code) {
    // eslint-disable-next-line no-use-before-define
    const _hmt = _hmt || []
    // eslint-disable-next-line func-names
    ;(function () {
        // 会叠加 需要 每次执行前，先移除上次插入的代码
        document.getElementById('g_baidu') && document.getElementById('g_baidu').remove()
        const hm = document.createElement('script')
        hm.src = `https://hm.baidu.com/hm.js?${code}`
        hm.id = 'g_baidu'
        const s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
    })()
}

function baiduCountCode(code) {
    // eslint-disable-next-line no-use-before-define
    const _hmt = _hmt || []
    // eslint-disable-next-line func-names
    ;(function () {
        // 会叠加 需要 每次执行前，先移除上次插入的代码
        document.getElementById('w_baidu') && document.getElementById('w_baidu').remove()
        const hm = document.createElement('script')
        hm.src = `https://hm.baidu.com/hm.js?${code}`
        hm.id = 'w_baidu'
        const s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
    })()
}
