<template>
    <div>
        <Nuxt />
    </div>
</template>

<script>
export default {
    // default.vue
    mounted() {
        window.vm = this.$i18n
    },
}
</script>

<style></style>
