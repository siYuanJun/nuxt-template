export default ({ route, app }, inject) => {
    const tools = {
        deepClone(obj) {
            const newObj = Array.isArray(obj) ? [] : {}

            if (obj && typeof obj === 'object') {
                for (const key in obj) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (obj.hasOwnProperty(key)) {
                        newObj[key] = obj && typeof obj[key] === 'object' ? this.deepClone(obj[key]) : obj[key]
                    }
                }
            }
            return newObj
        },
        topMao(target) {
            if (!target) {
                return
            }
            if ($(target).offset()) {
                $('html, body').animate({ scrollTop: $(target).offset().top }, 300) // 130为锚点到距顶部的距离，500为执行时间
            }
        },
        windowScrollChange(boxArr) {
            const boxDocumentArr = []
            for (let i = 0; i <= boxArr.length - 1; i++) {
                boxDocumentArr[i] = document.getElementById(boxArr[i])
            }

            window.onscroll = () => {
                this.scrollChange(boxDocumentArr)
            }
        },
        // https://blog.csdn.net/weixin_42703239/article/details/102263532
        scrollChange(boxArr) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const winHeight = document.documentElement.clientHeight || document.body.clientHeight
            for (let i = 0; i <= boxArr.length - 1; i++) {
                //  boxArr[i].offsetTop  标签距离页面顶部的距离
                const oTop = boxArr[i].offsetTop
                const bH = boxArr[i].offsetHeight
                if ((oTop - scrollTop >= 0 && scrollTop + winHeight - oTop > 100) || ((oTop + bH - scrollTop) / winHeight > 0.5 && oTop - scrollTop <= 0)) {
                    // console.info(boxArr[i].id) // 如果进入到窗口，输出 id
                    const obj = $(`.${boxArr[i].id}`)
                    $('#menu li').removeClass('active')
                    obj.addClass('active')
                }
            }
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
                    console.info(`[info](${curRoute})`, content, json)
                    break
                case 1:
                    console.warn(`[warning](${curRoute})`, content, json)
                    break
                case 2:
                    console.error(`[error](${curRoute})`, content, json)
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
                        that.$message({
                            message: message[i] ?? '不能为空',
                            type: 'warning',
                        })
                        return
                    }
                    status += 1
                }
                if (status === field.length) {
                    resolve(formData)
                }
            })
        },
        // 设置网页标题
        setWebTitle(that, titleArray) {
            titleArray = this.deepClone(titleArray) ?? []
            titleArray.reverse()
            let titles = ''
            const webTitle = that.$t('webTitle')
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
        phoneVerification(phone) {
            const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
            return !myreg.test(phone)
        },
        emailVerification(str) {
            const reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
            return !reg.test(str)
        },
        setLocalStorage(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data))
            } catch (error) {}
        },
        getLocalStorage(key) {
            try {
                return JSON.parse(localStorage.getItem(key))
            } catch (error) {}
        },
        phoneSet(tells) {
            const tell = /(\d{3})\d*(\d{4})/
            return tells.replace(tell, '$1****$2')
        },
        setImgUrl(imgUrl) {
            const newStr = imgUrl.indexOf('http')
            return newStr === 0 ? imgUrl : (app.$config.API_BASE_URL + imgUrl)
        },
    }

    inject('tools', tools)
}
