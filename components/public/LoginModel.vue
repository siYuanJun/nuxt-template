<template>
    <div class="logo-model flex items-center justify-center" :class="showModel ? 'show' : ''">
        <div class="w-full h-full sm:w-auto sm:h-auto bg-white pl-lg pr-lg pt-xl pb-xl relative">
            <div class="logo-model-close text-lg cursor-pointer hover:text-themes" @click="toggleShow">
                <div class="cuIcon-close text-lg" />
            </div>
            <div class="logo-nav flex items-center">
                <div class="cursor-pointer" @click="loginPageTypeChang(0)">
                    <div class="text-df" :class="loginPageType === 0 ? 'text-themes' : ''">
                        {{ $t('login.accountText') }}
                    </div>
                    <div v-if="loginPageType === 0" class="w-md border-b-2 border-themes mt-sm" />
                </div>
                <div class="ml-lg mr-lg h-md border-r-2 border-gray-200" />
                <div class="cursor-pointer" @click="loginPageTypeChang(1)">
                    <div class="text-df" :class="loginPageType === 1 ? 'text-themes' : ''">
                        {{ $t('login.phoneText') }}
                    </div>
                    <div v-if="loginPageType === 1" class="w-md border-b-2 border-themes mt-sm" />
                </div>
            </div>
            <form onsubmit="return false">
                <div v-if="loginPageType === 0" class="mt-lg">
                    <div class="">
                        <div class="flex">
                            <input v-model="paramForm.phone" type="text" class="flex-1 p-sm text-md bg-gray-f2f2f2 focus:ring-1 ring-themes" :placeholder="$t('login.phone')" maxlength="11">
                        </div>
                        <div class="mt-md flex">
                            <input v-model="paramForm.password" type="password" class="flex-1 p-sm text-md bg-gray-f2f2f2 focus:ring-1 ring-themes" :placeholder="$t('login.password')">
                        </div>
                        <div class="mt-md flex">
                            <input v-model="paramForm.captcha" type="text" class="flex-1 p-sm text-md bg-gray-f2f2f2 focus:ring-1 ring-themes" :placeholder="$t('login.captcha')">
                            <div class="ml-sm sm:ml-lg">
                                <img :src="captchaImg" class="w-xxl h-full" alt="" @click="getCaptchaImg">
                            </div>
                        </div>
                        <div class="mt-xl flex">
                            <button class="flex-1 bg-themes p-sm text-white text-md" @click="loginSubmit">
                                {{ $t('login.loginSubmit') }}
                            </button>
                        </div>
                    </div>
                    <div class="mt-md flex justify-center items-center text-sm">
                        <nuxt-link :to="$i18n.path('user/register')" class="text-gray-999 hover:text-themes">
                            账号注册
                        </nuxt-link>
                        <div class="ml-lg mr-lg h-sm border-r-2 border-gray-200" />
                        <nuxt-link :to="$i18n.path('user/retrieve')" class="text-gray-999 hover:text-themes">
                            忘记密码
                        </nuxt-link>
                    </div>
                </div>
                <div v-if="loginPageType === 1" class="mt-lg">
                    <div class="">
                        <div class="flex">
                            <input v-model="paramForm.phone" type="text" class="flex-1 p-sm text-md bg-gray-f2f2f2 focus:ring-1 ring-themes" :placeholder="$t('login.phone')">
                        </div>
                        <div class="mt-md flex">
                            <input v-model="paramForm.code" type="text" class="flex-1 p-sm text-md bg-gray-f2f2f2 focus:ring-1 ring-themes" :placeholder="$t('login.code')">
                            <div class="sm:ml-lg">
                                <button :class="paramLoca.smsMiao === 60 ? 'bg-themes' : 'bg-grey-300'" class="w-xxl h-full p-sm text-white text-sm" @click="getSms">
                                    {{ paramLoca.smsTxt }}
                                </button>
                            </div>
                        </div>
                        <div class="mt-xl flex">
                            <button class="flex-1 bg-themes p-sm text-white text-md" @click="loginSubmit">
                                {{ $t('login.loginSubmit') }}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import encrytion from '~/plugins/encrytion'

export default {
    props: {
        showModel: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            loginPageType: 0,
            paramForm: {
                phone: '',
                password: '',
                code: '',
                captcha: '',
                uuid: '',
            },
            paramLoca: {
                smsMiao: 60,
                smsTxt: this.$t('login.getCode'),
            },
            captchaImg: '',
            phoneVerification: false,
        }
    },
    created() {
        this.getCaptchaImg()
    },
    methods: {
        loginPageTypeChang(index) {
            if (index === 1) {
                this.paramForm.password = ''
                this.paramForm.captcha = ''
                this.paramForm.uuid = ''
            } else {
                this.paramForm.code = ''
            }
            this.loginPageType = index
            this.getCaptchaImg()
        },
        getCaptchaImg() {
            const time = new Date().getTime()
            this.paramForm.uuid = time
            this.captchaImg = `${process.env.API_BASE_URL + this.$routeApi.api_verifyImage}?t=${time}`
        },
        toggleShow() {
            this.$parent.showModelChang()
        },
        getSms() {
            const that = this
            if (that.$tools.phoneVerification(that.paramForm.phone)) {
                that.$tools.showModel(
                    that,
                    {
                        content: that.$t('user.input.phone'),
                        cancelButton: 1,
                    },
                    () => {},
                )
                return
            }
            if (that.paramLoca.smsMiao !== 60) {
                return
            }
            that.smsMiaoChang()
            that.$tools.requests(that.$routeApi.api_sendSms, that.paramForm).then((res) => {
                if (res.code !== 200) {
                    that.paramLoca.smsMiao = 60
                    that.paramLoca.smsTxt = that.$t('login.getCode')
                }
            })
        },
        smsMiaoChang() {
            const that = this
            that.paramLoca.smsTxt = `${that.$t('login.djsTime')}(${this.paramLoca.smsMiao})`
            if (that.paramLoca.smsMiao > 0) {
                that.paramLoca.smsMiao -= 1
                setTimeout(() => {
                    that.smsMiaoChang()
                }, 1000)
            } else {
                that.paramLoca.smsMiao = 60
                that.paramLoca.smsTxt = that.$t('login.getCode')
            }
        },
        async loginSubmit() {
            const that = this
            if (that.phoneVchang(that.paramForm.phone)) {
                that.$tools.showModel(
                    that,
                    {
                        content: that.$t('user.input.phone'),
                        cancelButton: 1,
                    },
                    () => {},
                )
                return
            }
            if (this.loginPageType === 0) {
                await that.$tools.frmVerification(that, that.paramForm, ['phone', 'password', 'captcha'], ['login'])
            } else {
                await that.$tools.frmVerification(that, that.paramForm, ['phone', 'code'], ['login'])
            }
            const login = await that.$tools.requests(that.$routeApi.api_login, that.paramForm)
            that.$tools.dd('登陆请求', login)
            if (login.code === 200) {
                const loginId = login.data.token
                that.$cookies.set(that.$config.loginKey, encrytion.aesEncrypt(loginId))
                that.$store.commit('setLoginId', loginId)
                window.location = that.$i18n.path('')
            } else {
                this.getCaptchaImg()
                that.$tools.showModel(
                    that,
                    {
                        content: login.msg,
                        cancelButton: 1,
                    },
                    () => {},
                )
            }
        },

        phoneVchang(phone) {
            const result = this.$tools.phoneVerification(phone)
            this.phoneVerification = result
            return result
        },
    },
}
</script>

<style lang="scss" scoped>
.logo-model {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.345);
    opacity: 0;
    visibility: hidden;
    @include function-transition-all-ease();

    &.show {
        opacity: 1;
        visibility: visible;
    }

    .logo-model-close {
        position: absolute;
        right: 10px;
        top: 10px;
    }
}
</style>
