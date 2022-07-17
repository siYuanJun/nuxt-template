<template>
    <div class="breadcrumb flex items-center">
        <div class="wp-1440 flex items-center">
            <div class="flex items-center justify-between flex-1">
                <div class="flex items-center">
                    <span class="mr-sm"><img src="/images/icon-pos-home.png" alt="" /></span>
                    <span v-for="(item, key) of list" :key="key" class="item">
                        <SuperLink v-if="item.path" :to="item.path" class="link">{{ item.name }}</SuperLink>
                        <span v-else>{{ item.name }}</span>
                        <i v-if="key + 1 < list.length" class="iconfont iconmianbaoxiejiantou"></i>
                    </span>
                </div>
                <a class="flex items-center cursor-pointer">
                    <img src="/images/icon-pos-right.png" alt="" />
                </a>
            </div>
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
}
</script>
<style lang="scss" scope>
.breadcrumb {
    height: 60px;
    box-shadow: 0 1px 10px 0 rgba(170, 170, 170, 0.1);

    .item {
        @include font-normal($color: $text-gray-666);

        display: inline-flex;
        align-items: center;
        font-size: 16px;

        .link {
            color: #666;
            &:hover {
                color: $color-themes-blue;
            }
        }
        .iconfont {
            font-size: 10px;
            margin: 0 8px;
        }
    }
}
</style>
