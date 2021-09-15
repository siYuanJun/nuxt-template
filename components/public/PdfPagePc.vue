<template>
    <div>
        <!--        <div class="text-sm text-gray-333 mt-sm text-center">{{ pageNum }} / {{ pageTotalNum }}</div>-->
        <client-only>
            <paginator v-if="loadedRatio === 100" class="mt-xl" :page-count="pageTotalNum" :init-page="1" @togglePage="togglePage($event)" />
            <div v-else>
                <progress-bar bar-color="#261BE5" :val="loadedRatio" :text="$t('loadingTitle') + loadedRatio + '%'" />
            </div>
            <pdfs :page="pageNum" :src="url" @progress="loadedRatioChang" @num-pages="pageTotalNumChang" />
        </client-only>
    </div>
</template>

<script>
import ProgressBar from 'vue-simple-progress'
import Paginator from '~/components/public/Paginator'

export default {
    name: 'PdfPage',
    components: {
        Paginator,
        ProgressBar,
    },
    props: {
        url: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            pageNum: 1,
            pageTotalNum: 1, // 总页数
            loadedRatio: 0, // 当前页面的加载进度，范围是0-1 ，等于1的时候代表当前页已经完全加载完成了
        }
    },
    mounted() {},
    methods: {
        togglePage(page) {
            this.pageNum = page
        },
        pageTotalNumChang(page) {
            this.pageTotalNum = page
        },
        loadedRatioChang(loaded) {
            this.loadedRatio = Number((loaded * 100).toString().substring(0, 3))
            // console.log(this.loadedRatio)
        },
    },
}
</script>
