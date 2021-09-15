<template>
    <div class="fluid-component">
        <video ref="myVideoPlayer" :poster="paramData.image">
            <source :src="paramData.video" data-fluid-hd title="1080p" type="video/mp4">
            <!--            <source data-fluid-hd :src='paramData.videos' type='application/x-mpegURL'/>-->
        </video>
    <!--        <div class="btn-coll cursor-pointer text-white" @click="collectSubmit">-->
    <!--            <div :class="paramData.collect ? 'cuIcon-favorfill' : 'cuIcon-favor'"></div>-->
    <!--        </div>-->
    </div>
</template>

<script>
export default {
    props: {
        paramData: {
            type: Object,
            default: () => {
                return {
                    id: '',
                    image: '',
                    video: '',
                    collect: '',
                }
            },
        },
    },
    data() {
        return {
            player: '',
        }
    },
    mounted() {
        const fluidPlayer = require('fluid-player')
        this.player = fluidPlayer.default(this.$refs.myVideoPlayer, {
            layoutControls: {
                // primaryColor: "#140d8c"
                allowDownload: true,
                playbackRateEnabled: true,
                controlForwardBackward: {
                    show: false, // Default: false
                },
                captions: {
                    play: 'Play',
                    pause: 'Pause',
                    mute: 'Mute',
                    unmute: 'Unmute',
                    fullscreen: 'Fullscreen',
                    exitFullscreen: 'Exit Fullscreen',
                },
            },
        })
        this.listeners()
    },
    destroyed() {
        if (!this.player) {
            return
        }
        this.player.destroy()
    },
    methods: {
        listeners() {
            this.player.on('play', () => {
                console.log('Video is playing')
            })
            this.player.on('timeupdate', (time) => {
                console.log(`timeupdate: ${time}`)
                if (time > 3) {
                    console.log('请购买后观看')
                    this.player.pause()
                    this.player.skipTo(0)
                }
            })
            this.player.on('theatreModeOn', () => {
                console.log('Theatre mode is enabled')
            })
        },
        async collectSubmit() {
            await this.$tools.requests(this.$routeApi.api_collect, {
                type: 0,
                pid: this.paramData.id,
                action: this.paramData.collect ? 1 : 0,
            })
            // eslint-disable-next-line vue/no-mutating-props
            this.paramData.collect = !this.paramData.collect
        },
    },
}
</script>

<style lang="less" scoped>
div.fluid-component {
    position: relative;

    > video {
        width: 100%;
        height: 100%;
    }

    /deep/ .fluid_video_wrapper {
        width: 100% !important;
    }

    /deep/ .fluid_theatre_mode {
        z-index: 999999 !important;
    }

    .btn-coll {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        padding: 10px 20px;
        font-size: 30px;
    }
}
</style>
