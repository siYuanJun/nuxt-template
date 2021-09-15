<template>
    <div class="item-banner flex items-end" :style="'background: url(' + (paramData.image ? paramData.image : image) + ') no-repeat center/cover;'">
        <div class="wp">
            <div class="mb-xl">
                <div class="text-xxl text-white font-bold">
                    {{ text }}
                </div>
                <div class="border-b-2 border-white border-solid mt-md w-xl" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ItemBanner',
    props: {
        text: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            paramData: {},
        }
    },
    created() {
        this.getBanner()
    },
    methods: {
        async getBanner() {
            const that = this
            if (!this.$route.params.id) {
                return
            }
            const { itemBanner } = that.$store.state
            if (!itemBanner.image) {
                const result = await this.$tools.requests(this.$routeApi.api_banner, { columnId: this.$route.params.id })
                that.$tools.dd('banner', result)
                if (result.code === 200) {
                    const reuslt = result.data
                    if (reuslt[0]) {
                        this.paramData = reuslt[0]
                        that.$store.commit('setItemBanner', this.paramData)
                    }
                }
            } else {
                // console.log("get itemBanner Cache")
                this.paramData.image = itemBanner.image
            }
        },
    },
}
</script>
