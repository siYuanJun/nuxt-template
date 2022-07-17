<template>
  <div class="asp-banner">
    <img class="img" :src="src" alt="" />
    <div class="banner-info">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banners',
  props: {
    src: {
      type: String,
      default: '/images/about/banner.png',
    },
  },
}
</script>

<style lang="scss" scoped>
.asp-banner {
  position: relative;
  .img {
    height: 550px;
    object-fit: cover;
    width: 100%;
  }
  .banner-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 640px) {
  .asp-banner .img {
    height: 300px;
  }
}
</style>
<style lang="scss">
@media (max-width: 640px) {
  .banner-info {
    .dd-text-48 {
      font-size: 30px;
    }
  }
}
</style>
