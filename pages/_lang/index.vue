<template>
    <div class="">
        <div class="text-xxl text-gray-999 text-center p-lg">
            Hello Word
        </div>
    </div>
</template>

<script>
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
            paramData: [{ data: {}, column: {} }],
        }
    },
    head() {
        return {
            title: this.$tools.setWebTitle(this),
            script: [],
        }
    },
    created() {},
    mounted() {
        this.$nextTick(() => {})
    },
    methods: {},
}
</script>

<style scoped lang="less"></style>
