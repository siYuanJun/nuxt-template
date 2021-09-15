<template>
    <div class="relative">
        <HeadersMenuPc class="HeadersMenuPc" :title-type="titleType" :column-data="paramData" />
        <login-model :show-model="showModel" />
    </div>
</template>

<script>
import HeadersMenuPc from './src/HeadersMenuPc'
import LoginModel from './public/LoginModel'

export default {
    components: {
        HeadersMenuPc,
        LoginModel,
    },
    props: {
        titleType: {
            type: Number,
            default: 99,
        },
        columnData: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    asyncData({ $axios }) {
        // console.log('asyncData header')
    },
    data() {
        return {
            showModel: false,
            paramData: [],
        }
    },
    created() {
        this.getColumnData()
    },
    methods: {
        showModelChang() {
            this.showModel = !this.showModel
        },
        async getColumnData() {
            const that = this
            let { columnList } = that.$store.state
            if (!columnList.length) {
                const result = await that.$tools.requests(that.$routeApi.api_column)
                columnList = result.data
                that.$store.commit('setColumn', columnList)
            }

            const columnListArr = []
            for (let i = 0; i < columnList.length; i++) {
                const item = columnList[i]
                // 必须复制一个新的 否则 Vuex 报错
                const newItem = { ...item }

                if (this.$store.state.locale === 'en') {
                    newItem.title = newItem.titleEn
                    const childrenArr = []
                    newItem.children.forEach((items) => {
                        const newitems = { ...items }
                        newitems.title = newitems.titleEn
                        childrenArr.push(newitems)
                    })
                    newItem.children = childrenArr
                }

                columnListArr.push(newItem)
            }

            if (that.$parent.getColumn) {
                that.$parent.getColumn(columnListArr)
            }

            that.paramData = columnListArr
        },
    },
}
</script>

<style lang="less" scoped></style>
