<template>
    <view class="">
        <el-button v-show="paramLoca.buttonLoaing" type="primary" class="login-code-button" size="mini" @click="getSmsSubmit">{{ paramLoca.smsTxt }}</el-button>
        <el-button v-show="!paramLoca.buttonLoaing" type="primary" class="login-code-button" size="mini" disabled>{{ paramLoca.smsTxt }}</el-button>
    </view>
</template>

<script>
export default {
    props: {
        phone: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'register',
        },
    },
    data() {
        return {
            paramLoca: {
                smsMiao: 60,
                smsTxt: '获取验证码',
                buttonLoaing: true,
            },
        }
    },
    methods: {
        smsMiaoChang() {
            const that = this
            that.paramLoca.smsTxt = `(${this.paramLoca.smsMiao}s 重新获取)`
            if (that.paramLoca.smsMiao > 0) {
                that.paramLoca.smsMiao -= 1
                setTimeout(() => {
                    that.smsMiaoChang()
                }, 1000)
            } else {
                that.paramLoca.smsMiao = 60
                that.paramLoca.smsTxt = '获取验证码'
                that.paramLoca.buttonLoaing = true
            }
        },
        getSmsSubmit() {
            const that = this
            if (that.paramLoca.smsMiao !== 60) {
                return
            }
            if (!that.phone) {
                this.$message({
                    message: '请输入手机号',
                    type: 'warning',
                })
                return
            }
            if (that.$tools.phoneVerification(that.phone)) {
                this.$message({
                    message: '手机号格式错误',
                    type: 'warning',
                })
                return
            }
            that.paramLoca.buttonLoaing = false
            this.$request.common
                .sendSms({ phone: this.phone, type: this.type })
                .then((res) => {
                    that.smsMiaoChang()
                })
                .catch((err) => {
                    this.$message({
                        message: err.data.msg,
                        type: 'error',
                        complete: () => {
                            that.paramLoca.buttonLoaing = true
                        },
                    })
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.login-code-button.el-button--primary {
    color: #7d7d7d;
    border: 1px solid #e2e2e2;
    background-color: #fff;

    &.is-disabled {
        background-color: #e2e2e2;

        &:hover {
            color: #7d7d7d;
            border: 1px solid #e2e2e2;
        }
    }

    &:hover {
        color: $---theme-color;
        border: 1px solid $---theme-color;
    }
}
</style>
