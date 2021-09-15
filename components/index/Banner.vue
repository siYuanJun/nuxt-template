<template>
    <div class="respBanner mt-sm">
        <div v-show="bannerDom" class="swiper-container">
            <div class="swiper-wrapper">
                <div v-for="(item, index) in paramData" :key="index" class="swiper-slide">
                    <nuxt-link :to="item.gourl ? item.gourl : '#'">
                        <img :src="item.image" :alt="item.title">
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="swiper-button swiper-button-next swiper-button-white" />
        <div class="swiper-button swiper-button-prev swiper-button-white" />
    </div>
</template>

<script>
export default {
    name: 'Banner',
    data() {
        return {
            paramData: [],
            bannerDom: true,
        }
    },
    mounted() {
        this.$nextTick(() => {
            // this.bannerInit()
        })
        // this.getBanner()
    },
    methods: {
        bannerInit() {
            const that = this
            const swiper = new Swiper('.respBanner .swiper-container', {
                initialSlide: -1,
                slidesPerView: 3,
                spaceBetween: 15,
                slidesPerGroup: 1,
                loop: true,
                loopFillGroupWithBlank: true,
                // effect: 'fade',
                // centeredSlides : true,
                centeredSlidesBounds: true,
                pagination: {
                    el: '.respBanner .swiper-pagination',
                    clickable: true,
                },
                speed: 500,
                // autoplay: {
                //     delay: 4000,
                //     disableOnInteraction: false,
                // },
                navigation: {
                    nextEl: '.respBanner .swiper-button-next',
                    prevEl: '.respBanner .swiper-button-prev',
                },
                on: {
                    slideChange () {
                        // console.log('改变了，activeIndex为' + this.activeIndex);
                    },
                    init (swiper) {
                        // setTimeout(() => {that.bannerDom = true}, 300)
                    },
                },
            })
        },
        async getBanner() {
            const that = this
            let { homeBanner } = that.$store.state
            if (!homeBanner.length) {
                const result = await this.$tools.requests(this.$routeApi.api_banner, {
                    columnId: 1,
                })
                that.$tools.dd('banner', result)
                homeBanner = result.data
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
