<template>
    <div class="pt-xl hidden md:block" id="menuDom">
        <div class="menu-left-contr shadow-md">
            <div class="gener_tit flex justify-center items-center">
                <div class="text-xl text-white font-bold">{{ cateListData.column.title }}</div>
            </div>
            <div class="column-list">
                <div v-for="(item, index) in cateListData.list" :key="index" class="relative">
                    <a
                        @click="cateChange(item)"
                        class="border-b-default border-gray-200 flex items-center pt-sml pb-sml pl-md pr-md text-center text-md text-black"
                        :class="{
                            'hover:bg-themes bg-themes text-white': column_id == item.id,
                        }"
                    >
                        <i class="el-icon-arrow-down" v-if="column_id == item.id"></i>
                        <i class="el-icon-arrow-right" v-else></i>
                        <div class="ml-sm text-left">{{ item.title }}</div>
                    </a>
                    <template v-if="column_id == item.id">
                        <div class="" v-for="(items, index) in item.child" :key="index">
                            <a
                                @click="cateChange(items, 3)"
                                class="border-b-default border-gray-200 flex items-center pt-sml pb-sml pl-md pr-md text-center text-sm text-black"
                                :class="{
                                    'hover:bg-gray-300 bg-gray-300 ': cateIndex == items.id,
                                }"
                            >
                                <div class="ml-sm">{{ items.title }}</div>
                            </a>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LeftMenu',
    props: {
        cateIndex: {
            type: Number | String,
            default: 0,
        },
        cateList: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    data() {
        return {
            cateListChild: [],
            cateListData: {
                column: {
                    title: '',
                },
                list: [],
            },

            column_id: 0,
        }
    },
    mounted() {
        this.column_id = Number(this.$route.params.id) ? Number(this.$route.params.id) : 0

        this.getColumnMenu()
    },
    methods: {
        cateChange(item, type) {
            if (type === 3) {
                this.$emit('cateChange', item, type)

                this.$tools.gohref({ id: this.column_id, moban_id: item.moban_id }, `idss=${item.id}#menuDom`)
            } else {
                this.column_id = item.id

                this.$tools.gohref(item, '#menuDom')
            }
        },
        setColumnCachedUnid(data) {
            let i = ''
            data.map((item) => {
                i += item.id.toString() + '-'
            })

            this.$tools.setLocalStorage('columnMenuCachedKey', i)
            return i
        },
        getColumnCachedUnid(columnId) {
            let columnMenuCachedKey = this.$tools.getLocalStorage('columnMenuCachedKey')
            if (columnMenuCachedKey && columnMenuCachedKey.indexOf(columnId + '-') != -1) {
                return columnMenuCachedKey
            }
        },
        async getColumnMenu() {
            let res
            let columnListMenu = this.$store.state.columnListMenu
            let getColumnCachedUnid = this.getColumnCachedUnid(this.column_id)
            console.log(getColumnCachedUnid, columnListMenu)

            if (getColumnCachedUnid && columnListMenu[getColumnCachedUnid]) {
                console.log('二级栏目缓存')
                res = columnListMenu[getColumnCachedUnid]
            } else {
                res = await this.$request.common.columnMenu({ column_id: this.column_id })
                res = res.data

                let setColumnCachedUnid = this.setColumnCachedUnid(res.list)

                console.log('二级栏目请求', setColumnCachedUnid)
                this.$store.commit('setColumnMenu', { ...columnListMenu, [setColumnCachedUnid]: res })
            }

            this.cateListData = res
        },
    },
}
</script>

<style lang="scss" scoped>
.menu-left-contr {
    background: #f6f6f6;
    width: 210px;

    .gener_tit {
        background: url(/images/img/gener_tit.jpg) no-repeat center/cover;
        height: 100px;
    }

    .column-list {
        position: relative;
    }
}
</style>
