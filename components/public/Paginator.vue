<template lang="html">
    <div class="pagination">
        <ul>
            <li v-if="pageCount > 1" class="prev" :class="{ disabled: curPage === 1 }" @click="prevPage">
                {{ $t('prevPageTxt') }}
            </li>
            <li :class="{ active: curPage === 1 }" @click="page(1)">1</li>
            <li v-show="curPage > 5 && pageCount > 10" class="ellipsis">...</li>
            <li v-for="(item, index) in middlePages" :key="index" :class="{ active: curPage === index + offset }" @click="page(index + offset)">
                {{ index + offset }}
            </li>
            <li v-show="curPage < bigLimit && pageCount > 10" class="ellipsis">...</li>
            <li v-if="pageCount > 1" :class="{ active: curPage === pageCount }" @click="page(pageCount)">
                {{ pageCount }}
            </li>
            <li v-if="pageCount > 1" class="next" :class="{ disabled: curPage === pageCount }" @click="nextPage">
                {{ $t('nextPageTxt') }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        pageCount: {
            type: Number,
            default: 0,
        },
        initPage: {
            type: Number,
            default: 0,
        },
        prevPageTxt: {
            type: String,
            default: '上一页',
        },
        nextPageTxt: {
            type: String,
            default: '下一页',
        },
    },
    data() {
        return {
            curPage: 1,
        }
    },
    computed: {
        middlePages() {
            if (this.pageCount <= 2) {
                return 0
            }
            if (this.pageCount > 2 && this.pageCount <= 10) {
                return this.pageCount - 2
            }
            return this.curPage > 999 ? 5 : 8
        },
        bigLimit() {
            return this.middlePages > 5 ? this.pageCount - 6 : this.pageCount - 3
        },
        offset() {
            if (this.curPage <= 5) {
                return 2
            }
            if (this.curPage >= this.bigLimit) {
                return this.bigLimit - 2
            }
            return this.middlePages > 5 ? this.curPage - 3 : this.curPage - 2
        },
    },
    created() {
        if (this.initPage !== 1 && this.initPage) {
            this.curPage = this.initPage
        }
    },
    methods: {
        page(indexPage) {
            this.$emit('togglePage', indexPage)
            this.curPage = indexPage
        },
        prevPage() {
            if (this.curPage !== 1) {
                this.page(this.curPage - 1)
            }
        },
        nextPage() {
            if (this.curPage !== this.pageCount) {
                this.page(this.curPage + 1)
            }
        },
    },
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    ul {
        li {
            cursor: pointer;
            display: inline-block;
            padding: 5px 12px;
            border: 1px solid #dddddd;
            margin-right: 5px;

            &.active {
                background: @---thime-color;
                border: 1px solid @---thime-color;
                color: #fff;
            }

            &.ellipsis {
                border: none;
            }

            &.disabled {
                color: #dcdcdc;
            }
        }
    }
}
</style>
