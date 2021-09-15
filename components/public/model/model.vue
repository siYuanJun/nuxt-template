<template>
    <div v-if="show" class="model-container">
        <div class="model-main">
            <div class="model-title">
                {{ title }}
            </div>
            <div class="model-content" v-html="content" />
            <div class="model-buttons">
                <button v-if="cancelButton" class="button" @click="cancelClick">
                    {{ cancelText }}
                </button>
                <button v-if="confirmButton" class="button confirm" @click="confirmClick">
                    {{ confirmText }}
                </button>
            </div>
        </div>
        <div v-show="mask" class="model-mask" />
    </div>
</template>

<script type="text/babel">
export default {
    data() {
        return {
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
    },
    methods: {
        cancelClick() {
            this.show = false
            this.cancelCallBack()
        },
        confirmClick() {
            this.show = false
            this.confirmCallBack()
        },
    },
}
</script>
<style lang="less" scoped>
.model-container {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--model-index);
    display: flex;
    justify-content: center;
    align-items: center;

    .model-main {
        position: relative;
        z-index: 9;
        width: 300px;
        background-color: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        text-align: center;

        .model-title {
            font-size: 18px;
            color: #333;
            width: 100%;
            padding: 18px;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .model-content {
            font-size: 16px;
            color: #666;
            padding: 10px;
            padding-top: 0px;
            padding-bottom: 20px;
        }

        .model-buttons {
            width: 100%;
            display: flex;
            align-items: center;

            .button {
                flex: 1;
                padding: 18px 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 16px;
                outline: none;
                background-color: #ffffff;
                border-top: 1px solid #f2f2f2;
                border-right: 1px solid #f2f2f2;

                &.confirm {
                    color: var(--theme);
                    font-weight: bold;
                }

                &:last-child {
                    border-right: 0;
                }

                &:active {
                    background-color: #f2f2f2;
                }
            }
        }
    }

    .model-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.45);
    }
}
</style>
