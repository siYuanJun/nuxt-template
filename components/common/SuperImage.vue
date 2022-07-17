<template>
  <img
    v-if="isSvg && lazy"
    :data-src="url"
    class="lazyload"
    @load="handleImgLoaded"
  />
  <img v-else-if="isSvg && !lazy" :src="url" @load="handleImgLoaded" />
  <img
    v-else-if="loaded || !lazy"
    :src="url | appendImgOssProcessV"
    @load="handleImgLoaded"
  />
  <img
    v-else
    :src="url | appendImgOssProcessLow(10)"
    :data-src="url | appendImgOssProcessV"
    class="lazyload"
    @load="handleImgLoaded"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isSvg() {
      return this.url?.includes('.svg')
    },
  },
  methods: {
    handleImgLoaded() {
      this.$emit('load')
    },
  },
}
</script>
