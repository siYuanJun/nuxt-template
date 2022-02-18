import Vue from 'vue'

export default ({ params, $axios, app, route, store, redirect }) => {
    Vue.prototype.$tools = app.$tools = {
        windowScrollFun() {
            this.$nextTick(() => {
                const s1 = document.getElementById('page1')
                const s2 = document.getElementById('page2')
                const s3 = document.getElementById('page4')
                const s4 = document.getElementById('page5')
                const boxArr = [s1, s2, s3, s4]

                window.onscroll = () => {
                    this.scrollFun(boxArr)
                }
            })
        },
        // https://blog.csdn.net/weixin_42703239/article/details/102263532
        scrollFun(boxArr) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const winHeight = document.documentElement.clientHeight || document.body.clientHeight
            for (let i = 0; i <= boxArr.length - 1; i++) {
                //  boxArr[i].offsetTop  标签距离页面顶部的距离
                const oTop = boxArr[i].offsetTop
                const bH = boxArr[i].offsetHeight
                if (
                    (oTop - scrollTop >= 0 && scrollTop + winHeight - oTop > 100) ||
                    ((oTop + bH - scrollTop) / winHeight > 0.8 && oTop - scrollTop <= 0)
                ) {
                    // console.info(boxArr[i].id) // 如果进入到窗口，输出 id
                    const obj = $(`.${boxArr[i].id}`)
                    $('.header-page .nav .item').removeClass('cur')
                    $(obj).addClass('cur')
                }
            }
        },
        copyUrl(value) {
            const oInput = document.createElement('input')
            oInput.value = value
            document.body.appendChild(oInput)
            oInput.select() // 选择对象
            document.execCommand('Copy') // 执行浏览器复制命令
            oInput.className = 'oInput'
            oInput.style.display = 'none'
            this.$tools.showModel(this, {
                content: this.$t('hbCopyText'),
                cancelButton: 1,
            })
        },
        // 对象转 formdata 格式
        jsToFormData(data) {
            let ret = ''
            for (const it in data) {
                ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
            }
            ret = ret.substr(0, ret.length - 1)
            return ret
        },
        // 调试使用
        dd(content, json, type) {
            type = type || 0
            json = json || ''
            let curRoute = '/'
            if (route) {
                curRoute = route.path
            }
            if (process.env.DEBUG) {
                switch (type) {
                case 0:
                    console.log(`[info](${curRoute})`, content, json)
                    break
                case 1:
                    console.log(`[warning](${curRoute})`, content, json)
                    break
                case 2:
                    console.log(`[error](${curRoute})`, content, json)
                    break
                default:
                    break
                }
            }
        },
        // 表单验证
        frmVerification(that, formData, field, message) {
            return new Promise((resolve, reject) => {
                let status = 0
                for (let i = 0; i < field.length; i++) {
                    if (formData[field[i]] === '') {
                        this.showModel(
                            that,
                            {
                                content: that.$t(`${message[0]}.${field[i]}`) + (message[1] ?? '不能为空'),
                                cancelButton: 1,
                            },
                            () => {},
                        )
                        return
                    }
                    status += 1
                }
                if (status === field.length) {
                    resolve(formData)
                }
            })
        },
        // 请求封装
        requests(url, formData, methods) {
            methods = methods ?? '$post'
            formData = formData ?? {}
            // 拦截器查看
            return $axios[methods](url, formData)
        },
        // 实现模板字符串解析功能
        render(template, data) {
            return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
                return data[key]
            })
        },
        // 语言切换
        changeLanguage(that, language) {
            // console.log("url fullPath", language, that.$route.fullPath)
            // this.requests(that.$routeApi.api_lang, {lang: language}, "$post")
            that.$store.commit('SET_LANG', language) // set store
            const { locale } = that.$store.state
            if (language === 'zh') {
                that.$router.push(that.$route.fullPath.replace(/^\/[^/]+/, ''))
            } else if (language === 'en') {
                // 防止重复点击
                if (locale !== 'zh') {
                    that.$router.push(that.$route.fullPath.replace('/zh', '/en'))
                }
            }
        },
        // 设置网页标题
        setWebTitle(that, titleArray) {
            titleArray = titleArray ?? []
            // titleArray = titleArray.reverse()
            let titles = ''
            const webTitle = that.$t(that.$config.webTitle)
            for (let i = 0; i < titleArray.length; i++) {
                // console.log(titleArray[i])
                if (titleArray[i].title) {
                    titles += `${titleArray[i].title}_`
                }
            }
            titles += webTitle
            return titles
        },
        // Vue 数组包含检测函数
        has(arr, num) {
            let bool = false // 默认不在数组中
            for (let i = 0, len = arr.length; i < len; i++) {
                // 遍历数组的值
                if (arr[i] === num) {
                    bool = true // 若存在某个值与改值相等，bool值为true
                }
            }
            return bool // 返回bool
        },
        // 多选模型
        checkFun(that, index, value, type, checkData) {
            const itemType = that.paramLoca[type]
            if (itemType.length === 0) {
                itemType.push(value)
                checkData[index].checked = true
                return
            }
            const item = checkData[index]
            if (this.has(itemType, value)) {
                item.checked = false
                for (let i = 0, len = itemType.length; i < len; i++) {
                    if (itemType[i] === value) {
                        itemType.splice(i, 1)
                    }
                }
            } else {
                item.checked = true
                itemType.push(value)
            }
            this.dd('选中', itemType)
        },
        // 模态框
        showModel(that, data, call) {
            that.$model({
                show: true,
                title: data.title ? data.title : that.$t('model.title'),
                content: data.content,
                cancelButton: data.cancelButton !== 1,
                confirmText: data.confirmText ? data.confirmText : that.$t('model.confirmText'),
                cancelText: data.cancelText ? data.cancelText : that.$t('model.cancelText'),
                confirmCallBack: () => {
                    call(1)
                },
                cancelCallBack: () => {
                    call(2)
                },
            })
        },
        phoneVerification(phone) {
            const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
            return !myreg.test(phone)
        },
    }
}
