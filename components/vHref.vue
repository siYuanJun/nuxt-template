<template>
    <div>
        <a v-if="linkurl" target="_blank" :href="linkurl">
            <slot></slot>
        </a>
        <nuxt-link v-else :to="to">
            <slot></slot>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        to: String,

        linkurl: {
            type: String,
            default: ''
        }
    }
}
</script>

<style></style>
