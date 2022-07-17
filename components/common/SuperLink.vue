<template>
  <a v-if="isOut" :href="to">
    <slot></slot>
  </a>
  <NuxtLink v-else :to="to"> <slot></slot></NuxtLink>
</template>
<script>
export default {
  props: {
    to: {
      type: String,
      default: '',
    },
  },
  computed: {
    isOut() {
      return this.to.startsWith('http://') || this.to.startsWith('https://')
    },
  },
  methods: {},
}
</script>
