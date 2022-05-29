<template>
    <div class="respBanner fs0">
        <div v-show="bannerDom" class="swiper swiper-container">
            <div class="swiper-wrapper">
                <div v-for="(item, index) in paramData" :key="index" class="relative swiper-slide">
                    <img :src="item.image" :alt="item.title" class=" object-cover w-full" />
                    <div class="h-full absolute left top-none z-10 w-full">
                        <div class="wp h-full flex items-center relative">
                            <div class="banner-content">
                                <div class="text-sxl text-white font-bold">
                                    {{ item.title }}
                                </div>
                                <div class="text-lg text-white">
                                    {{ item.intro }}
                                </div>
                                <div class="flex mt-lg">
                                    <a target="_blank" class="flex rounded-md pl-md pr-md pt-sm pb-sm bg-themes text-white text-center text-sm" :href="item.gourl ? item.gourl : '#'">探索更多 +</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Banner',
    data() {
        return {
            paramData: [{ image: '/images/banner.png' }],
            bannerDom: true,
        }
    },
    mounted() {
        this.$nextTick(() => {
            // this.bannerInit()
        })
        this.getBanner()
    },
    methods: {
        bannerInit() {
            new Swiper('.respBanner .swiper', {
                initialSlide: 1,
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerGroup: 1,
                // observer: true,
                // loop: true,
                loopFillGroupWithBlank: true,
                // effect: 'fade',
                // centeredSlides : true,
                centeredSlidesBounds: true,
                pagination: {
                    el: '.respBanner .swiper-pagination',
                    clickable: true,
                },
                speed: 500,
            })
        },
        async getBanner() {
            const that = this
            let homeBanner = that.$store.state.homeBanner
            if (!homeBanner.length) {
                const result = await this.$request.common.bannerData({ type: 0 })
                that.$tools.dd('banner', result)
                homeBanner = result
                that.$store.commit('setHomeBanner', homeBanner)
            }
            this.paramData = homeBanner
            setTimeout(() => {
                this.bannerInit()
            }, 0)
        },
    },
}
</script>
<style scoped lang="scss">
.respBanner {
    .swiper-slide {
        .banner-content {
            @include function-transition-all-ease(0.8s);
            @include function-transform-scale-rotate(0.3);
        }
        &.swiper-slide-active {
            .banner-content {
                @include function-transition-all-ease(0.8s);
                @include function-transform-scale-rotate(1.0);
            }
        }
    }
}
</style>
