<template>
    <div>
        <div id="preViewPdf" class="" />
    </div>
</template>

<script>
import ProgressBar from 'vue-simple-progress'
import Paginator from '~/components/public/Paginator'
// import Pdfh5 from "pdfh5"
// import "pdfh5/css/pdfh5.css";

export default {
    name: 'PdfPage',
    components: {},
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
            pdfh5: null,
        }
    },
    mounted() {
        this.$nextTick(() => {
            // this.openPdf(this.url)
        })
    },
    methods: {
        openPdf(url) {
            const that = this
            this.visible = true
            // 实例化
            this.pdfh5 = new Pdfh5('#preViewPdf', {
                pdfurl: url,
                lazy: false,
                cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/cmaps/',
                limit: 0, // 控制显示页数
            })
            // 监听完成事件
            // eslint-disable-next-line func-names
            this.pdfh5.on('ready', function () {
                // console.log("总页数：" + this.totalNum)
                that.pageTotalNumChang(this.totalNum)
            })
            this.pdfh5.on('success', (msg, time) => {
                // console.log("信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum)
            })
            this.pdfh5.on('complete', (status, msg, time) => {
                // console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum)
            })
        },
        togglePage(page) {
            this.pageNum = page
        },
        pageTotalNumChang(page) {
            this.pageTotalNum = page
        },
        loadedRatioChang(loaded) {
            this.loadedRatio = Number((loaded * 100).toString().substring(0, 3))
        },
    },
}
</script>
<style lang="less">
.pdfjs {
    .loadingBar .progress .glimmer {
        background: @---thime-color !important;
    }
}
</style>
