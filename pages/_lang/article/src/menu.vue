<template>
    <div class="">
        <div class="bg-white shadow-md">
            <div class="wp-md">
                <div class="menu-swiper relative pl-lg pr-lg">
                    <div v-show="!loadingPage" class="swiper-mantle"></div>
                    <div class="swiper swiper-container fs0" v-if="cateListData.length">
                        <div class="swiper-wrapper">
                            <div v-for="(item, index) in cateListData" :key="index" class="relative swiper-slide">
                                <div class="item-hover">
                                    <a
                                        @click="cateChange(item)"
                                        class="block pt-sml pb-sml pl-md pr-md text-center text-df text-black"
                                        :class="{
                                            'bg-themes text-white': column_id == item.id,
                                        }"
                                    >
                                        {{ item.title }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="loadingPage">
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wp-md" v-if="cateListChild.length">
            <div class="pb-lg pt-lg">
                <a
                    @click="cateChange(item, 3)"
                    class="rounded-md border-gray-200 border-default mr-sm pt-sm pb-sm pl-lg pr-lg text-df text-black"
                    :class="{
                        'bg-themes text-white': cateIndex == item.id,
                    }"
                    v-for="(item, index) in cateListChild"
                    :key="index"
                >
                    {{ item.title }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cateIndex: {
            type: Number | String,
            default: 0,
        }
    },
    data() {
        return {
            loadingPage: false,
            cateListChild: [],
            cateListData: [],

            column_id: 0,
        }
    },
    watch: {
        column_id: {
            handler(val) {
                console.log(val)
                this.setColumnChild(val)
            }
        }
    },
    mounted() {
        this.column_id = Number(this.$route.params.id) ? Number(this.$route.params.id) : 0

        this.getColumnMenu()
    },
    methods: {
        setColumnChild(column_id) {
            let cateListChild = this.cateListData.filter((item) => item.id === column_id)[0]
            if (cateListChild) {
                this.cateListChild = cateListChild.child
            }
        },
        setColumnCachedUnid(data) {
            let i = ''
            data.map(item => {
                i += item.id.toString() + '-'
            })

            this.$tools.setLocalStorage('columnMenuCachedKey', i)
            return i
        },
        getColumnCachedUnid(columnId) {
            let columnMenuCachedKey = this.$tools.getLocalStorage('columnMenuCachedKey')
            if(columnMenuCachedKey && columnMenuCachedKey.indexOf((columnId + '-')) != -1) {
                return columnMenuCachedKey
            }
        },
        async getColumnMenu() {
            let res
            let columnListMenu = this.$store.state.columnListMenu
            let getColumnCachedUnid = this.getColumnCachedUnid(this.column_id)
            console.log(getColumnCachedUnid, columnListMenu)

            if(getColumnCachedUnid && columnListMenu[getColumnCachedUnid]) {
                console.log("二级栏目缓存")
                res = columnListMenu[getColumnCachedUnid]
            } else {
                res = await this.$request.common.columnMenu({ column_id: this.column_id })
                res = res.data

                let setColumnCachedUnid = this.setColumnCachedUnid(res)

                console.log("二级栏目请求", setColumnCachedUnid)
                this.$store.commit('setColumnMenu', {...columnListMenu, [setColumnCachedUnid]: res})
            }

            this.cateListData = res

            this.setColumnChild(this.column_id)

            this.$nextTick(() => {
                this.cateSwiper()
            })
        },
        cateChange(item, type) {
            if(type === 3) {
                this.$emit('cateChange', item, type)
            } else {
                this.column_id = item.id

                this.$tools.gohref(item)
            }
        },
        cateSwiper() {
            this.loadingPage = true

            new Swiper('.menu-swiper .swiper', {
                slidesPerView: "auto",
                spaceBetween: 0,
                // pagination: {
                //     el: '.cate-swiper .swiper-pagination',
                //     clickable: true,
                // },
                navigation: {
                    nextEl: '.menu-swiper .swiper-button-next',
                    prevEl: '.menu-swiper .swiper-button-prev',
                },
                // breakpoints: {
                //     768: {
                //         slidesPerView: 2,
                //         spaceBetween: 0,
                //     },
                //     1024: {
                //         slidesPerView: 3,
                //         spaceBetween: 0,
                //     },
                //     1200: {
                //         slidesPerView: 6,
                //         spaceBetween: 0,
                //     },
                //     1400: {
                //         slidesPerView: 10,
                //         spaceBetween: 0,
                //     },
                // },
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.item-hover {
    position: relative;
    .item-child-child {
        @include function-transition-all-ease();
        position: absolute;
        top: 100px;
        // opacity: 0;
        // visibility: hidden;
    }

    &:hover {
        .item-child-child {
            @include function-transition-all-ease();
            top: 50px;
            visibility: visible;
            opacity: 1;
        }
    }
}

.swiper-mantle {
    position: absolute;
    left: -100px;
    right: -100px;
    background: #fff;
    z-index: 99;
}

.menu-swiper {

    .swiper-slide {
        width: auto;
    }

    .swiper-button-prev {
        background-size: 11px 42px;
        left: -5px;
    }

    .swiper-button-next {
        background-size: 11px 42px;
        right: -5px;
    }
}
</style>
