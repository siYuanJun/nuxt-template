<template>
    <div class="my-banner">
        <div ref="myBanner" v-swiper:myBanner="swiperOption" class="swiper-container">
            <div class="swiper-wrapper">
                <div v-for="(item, key) of list" :key="key" class="swiper-slide">
                    <BannerItem :data="item" :index="key"></BannerItem>
                </div>
            </div>
            <div v-show="showPage" class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            showPage: false,
            swiperOption: {
                loop: true,
                autoplay: 5000,
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination',
                },
                paginationClickable: true,
                lazyLoading: true,
                lazyLoadingInPrevNext: true,
                // effect: 'fade',
            },
        }
    },
    computed: {
        swiper() {
            return this.$refs.myBanner.$swiper
        },
    },
    watch: {
        list: {
            handler(val) {
                this.showPage = val && val.length > 1
            },
            immediate: true,
        },
    },
    mounted() {},
}
</script>
<style lang="scss">
.my-banner {
    position: relative;

    .swiper-container {
        width: 100%;
    }
    .swiper-slide {
        width: 100%;
    }
    .swiper-pagination-bullet {
        padding: 15px 0;
        width: 30px;
        height: 3px;
        border-radius: 2px;
        box-sizing: content-box;
        text-align: center;
        opacity: 0.2;
        background: #fff;
        background-clip: content-box;
        transition: width 0.3s ease-out;
        display: inline-block;
        &:hover {
            opacity: 1;
        }
    }
    .swiper-pagination-bullet-active {
        background: $color-themes-blue;
        background-clip: content-box;
        opacity: 1;
        width: 36px;
    }
}
</style>
