<template>
    <div>
        <div class="avatar-block w-xl h-xl relative">
            <img :src="imgDataUrlBase ? imgDataUrlBase : imgDataUrl" class="w-full h-full rounded" alt="">
            <div class="w-full h-full text-back text-xs text-white opacity-90 flex justify-center items-center cursor-pointer" @click="toggleShow">
                <div class="">
                    {{ $t('user.avatarOption') }}
                </div>
            </div>
        </div>
        <my-upload
            ref="myUploadRef"
            v-model="show"
            field="file"
            :width="300"
            :height="300"
            :url="apiUploadAvatar"
            :params="params"
            :headers="headers"
            :lang-ext="avatarLangExt"
            :no-square="true"
            img-format="png"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
        />
    </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue'
import env from '~/env'

export default {
    components: {
        'my-upload': myUpload,
    },
    props: {
        imgDataUrl: {
            type: String,
            default: '/images/averat-1.png',
        },
    },
    data() {
        return {
            show: false,
            params: {
                token: this.$store.state.loginId,
                name: 'avatar',
            },
            headers: {
                smail: '*_~',
            },
            apiUploadAvatar: '',
            avatarLangExt: this.$t('avatarLangExt'),
            imgDataUrlBase: '',
        }
    },
    watch: {},
    mounted() {
        this.apiUploadAvatar = env.API_BASE_URL + this.$routeApi.api_uploadAvatar
    },
    methods: {
        toggleShow() {
            this.show = !this.show
        },
        /**
         * crop success
         *
         * [param] imgDataUrl
         * [param] field
         */
        cropSuccess(imgDataUrl, field) {
            // console.log('-------- crop success --------');
            this.imgDataUrlBase = imgDataUrl
        },
        /**
         * upload success
         *
         * [param] jsonData   服务器返回数据，已进行json转码
         * [param] field
         */
        cropUploadSuccess(jsonData, field) {
            // console.log('-------- upload success --------');
            // console.log(jsonData);
            // console.log('field: ' + field);
            this.$refs.myUploadRef.setStep(1)
            setTimeout(() => this.toggleShow(), 200)
            this.$parent.getUserInfo(1)
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        cropUploadFail(status, field) {
            // console.log('-------- upload fail --------');
            // console.log(status, 'field: ' + field);
        },
    },
}
</script>

<style lang="less" scoped>
.avatar-block {
    img {
        border-radius: 50%;
    }

    .text-back {
        display: none;
        background: rgba(0, 0, 0, 0.345);
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
    }

    &:hover {
        .text-back {
            display: flex;
        }
    }

    .vue-image-crop-upload .vicp-wrap .vicp-operate a {
    }
}

.vue-image-crop-upload /deep/ .vicp-operate a {
    color: @---thime-color !important;
}

@media (max-width: 640px) {
    .vue-image-crop-upload /deep/ .vicp-wrap {
        width: 300px !important;
        height: 460px !important;

        .vicp-crop-left {
            float: none !important;
        }

        .vicp-crop-right {
            float: none !important;

            .vicp-preview {
                display: flex;
                justify-content: center;
            }
        }
    }
}
</style>
