<template>
    <div id="positionPage" class=" pt-md pb-md">
        <div class="wp">
            <div class="text-sm flex items-center item-pos">
                <div class="">
                    {{ $t('postion.postText') }}:
                </div>
                <div class="flex items-center ml-xs">
                    <a :href="$i18n.path('')">{{ $t('Home') }}</a>
                    <div class="icon-right ml-xs mr-xs">
                        >
                    </div>
                </div>
                <div v-for="(item, index) in textPos" :key="index" class="flex items-center">
                    <template v-if="item.title">
                        <a v-if="item.url" :href="$i18n.path(item.url)">{{ item.title }}</a>
                        <span v-else>{{ item.title }}</span>
                        <div class="icon-right ml-xs mr-xs">
                            >
                        </div>
                    </template>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Position',
    props: {
        textPrentPos: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    data() {
        return {
            id: 0,
            textPos: [],
        }
    },
    watch: {
        textPrentPos: {
            handler(val) {
                this.textPos = []
                val.forEach((item) => {
                    if (item.title) {
                        this.textPos.push({
                            title: item.title,
                            url: item.url,
                        })
                    }
                })
            }
        },
    },
    mounted() {
        this.id = this.$route.params.id ?? 0
        // this.getData()
    },
    methods: {
        async getData() {
            const that = this
            that.textPos = []
            if (that.$route.params.keyword) {
                that.textPos = [
                    {
                        title: that.$t('postion.search'),
                    },
                ]
            } else if (that.id) {
                const result = await that.$tools.requests(that.$routeApi.api_breadCrumbs, { columnId: that.id })
                that.$tools.dd('面包屑', result)
                if (result.code === 200) {
                    result.data.forEach((item) => {
                        if (item.title) {
                            that.textPos.push({
                                href: `article/${item.mark}/${item.id}`,
                                title: item.title,
                            })
                        }
                    })
                    // console.log(that.textPos)
                }
            }
            that.textPrentPos.forEach((item) => {
                that.textPos.push({
                    title: item.title,
                    url: item.url,
                })
            })
            that.$parent.textPos = that.textPos
        },
    },
}
</script>

<style scoped lang="scss">
.item-pos {
    > div:nth-last-child(1) .icon-right {
        display: none;
    }
}
</style>
