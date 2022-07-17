<template>
  <div class="banner-item">
    <SuperLink :to="data.link_url">
      <img v-if="index === 0" :src="data.banner_url | appendImgOssProcessV" />
      <img
        v-else
        :data-src="data.banner_url | appendImgOssProcessV"
        class="swiper-lazy"
      />
    </SuperLink>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.banner-item {
  font-size: 0;
  // height: 550px;
  background-color: #10141d;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

@media (max-width: 820px) {
  .banner-item {
    height: 280px;
  }
}
</style>
