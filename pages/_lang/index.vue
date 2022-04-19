<template>
    <div class="">
        <div class="text-xxl text-gray-999 text-center p-lg">
            <nuxt-link :to="$i18n.path('article/content')">Hello Word</nuxt-link>
        </div>
    </div>
</template>

<script>
if (process.browser) {
    // 在这里根据环境引入wow.js

}

export default {
    components: {},
    asyncData({ params, $axios, app, route, store }) {
        return {}
        // let result = await $axios.$post(app.$routeApi.api_index)
        // console.log(result)
        // if (result.code === 200) {
        //     callback(null, { paramData: result.data })
        // } else {
        //     callback({ statusCode: 404, message: 'Get not found' })
        // }
    },
    data() {
        return {
            columnData: [],
            paramData: [],
        }
    },
    head() {
        return {
            title: this.$tools.setWebTitle(),
            script: [],
        }
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            if (process.browser) {
                const { WOW } = require('wowjs')
                // 在页面mounted生命周期里面 根据环境实例化WOW
                new WOW({
                    live: false,
                    offset: 0,
                }).init()
            }
        })
    },
    methods: {},
}
</script>

<style scoped lang="scss"></style>
