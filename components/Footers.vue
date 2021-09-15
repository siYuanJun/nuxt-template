<template>
    <div class="mt-xl">
        <div class="m-display-block flex-col">
            <div v-for="(item, index) in floor.data" :key="index" class="p-sm bg-gray-f2f2f2 mb-sm">
                <div class="text-md sm:text-lg text-gray-333 flex justify-between" @click="linkIndex === index ? (linkIndex = 99) : (linkIndex = index)">
                    <div class="">
                        {{ item.title }}
                    </div>
                    <div class="cuIcon-add" />
                </div>
                <ul v-show="linkIndex === index" class="text-sm text-gray-333 mt-md">
                    <li v-for="(items, indexs) in item.children" :key="indexs" class="mb-sm">
                        <a target="_blank" :href="items.gourl" class="block">{{ items.title }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer pt-md md:pt-lg lg:pt-xl pb-sm sm:pb-lg">
            <div class="wp flex justify-between">
                <div class="w-1/2 sm:w-2/6 pt-md sm:pt-none mr-md sm:mr-none">
                    <img src="/images/foot-logo.png" alt="">
                    <div class="m-display-block">
                        <div class="block text-sm text-white">
                            <div class="mt-sm opacity-70">
                                {{ $t('titleTel') }}：{{ floor.right.tel }}
                            </div>
                            <div class="mt-xs opacity-70">
                                {{ $t('titleEmail') }}：{{ floor.right.email }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 md:flex justify-between">
                    <div class="grid grid-cols-4 gap-sm pc-display-block">
                        <div v-for="(item, index) in floor.data" :key="index" class="border-r-default border-white border-opacity-10 pl-sm pr-sm mt-sm">
                            <div class="text-lg text-white">
                                {{ item.title }}
                            </div>
                            <ul class="text-sm text-gray-999 mt-md ul:li:mb-sm">
                                <li v-for="(items, indexs) in item.children" :key="indexs">
                                    <a target="_blank" :href="items.gourl">{{ items.title }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="pl-none md:pl-lg mt-sm">
                        <div class="text-lg text-white text-right sm:text-center">
                            <img :src="floor.right.image" alt="" width="100">
                            <div class="text-sm text-white opacity-80 mt-sm">
                                {{ $t('everText') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-md sm:mt-xl text-center">
                <div class="sm:flex wp justify-between text-sm text-gray-999 border-t-default border-opacity-10 border-white pt-sm sm:pt-lg">
                    <div class="mr-lg text-white opacity-70 text-center sm:text-left">
                        {{ floor.right.right }} {{ floor.right.number }}
                    </div>
                    <div class="pc-display-block mt-sm sm:mt-auto text-white opacity-70">
                        {{ $t('titleTel') }}：{{ floor.right.tel }} {{ $t('titleEmail') }}：{{ floor.right.email }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    asyncData({ params, $axios, app, route, store, query }, callback) {
        // console.log("footer -------")
        return { footer: 'asyncData true' }
    },
    data() {
        return {
            floor: { data: [], right: {} },
            footer: 'asyncData false',
            linkIndex: 99,
        }
    },
    mounted() {
        // console.log(this.footer)
        this.getData()
    },
    methods: {
        async getData() {
            let { floorData } = this.$store.state
            if (!floorData.data) {
                const right = await this.$tools.requests(this.$routeApi.api_right)
                const result = await this.$tools.requests(this.$routeApi.api_floor)
                this.$tools.dd('底部信息', result)
                floorData = {
                    data: result.data,
                    right: right.data,
                }
                this.$store.commit('setFloorData', floorData)
            }
            const floorDataArr = []
            const newData = { ...floorData }
            for (let i = 0; i < floorData.data.length; i++) {
                const item = floorData.data[i]
                const newItem = { ...item }
                if (this.$store.state.locale === 'en') {
                    newItem.title = newItem.titleEn
                    const newItemsArr = []
                    newItem.children.forEach((items) => {
                        const newItems = { ...items }
                        newItems.title = newItems.titleEn
                        newItemsArr.push(newItems)
                    })
                    newItem.children = newItemsArr
                }
                floorDataArr.push(newItem)
            }
            newData.data = floorDataArr
            this.$parent.floor = this.floor = newData
        },
    },
}
</script>

<style></style>
