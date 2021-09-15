<template>
    <div id="mymap" class="flex-1 flex" />
</template>

<script>
import AMapJS, { AMapLoader } from 'amap-js'

export default {
    props: {
        mapData: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            AMaps: '',
            Maps: '',
            MarkersArr: [],
        }
    },
    watch: {
        mapData: {
            handler(newV, oldV) {
                this.$tools.dd('地图初始化', newV)
                this.getData(newV)
            },
            deep: true,
        },
    },
    mounted() {},
    methods: {
        async getData(data) {
            if (!this.AMaps) {
                await this.initMap()
            }
            const provinces = [
                // {
                //     KL: 0,
                //     className: "AMap.LngLat",
                //     kT: 0,
                //     lat: 39.908692,
                //     lng: 116.397477,
                //     pos: [12958177.051845886, 4852145.130327898]
                // },
                // {
                //     KL: 116.30558300000001,
                //     className: "AMap.LngLat",
                //     kT: 39.981536,
                //     lat: 39.981536,
                //     lng: 116.305583,
                //     pos: [12947078.275974816, 4863259.503999455]
                // }
            ]
            try {
                this.clearMarker()
                if (!data.addressList) {
                    return
                }
                for (let i = 0; i < data.addressList.length; i++) {
                    const item = data.addressList[i]
                    const result = await this.geocoderGetLocation(item.address)
                    this.$tools.dd(item.address, result)
                    const { location } = result.geocodes[0]
                    this.markersMany(this.AMaps, this.Maps, location, item)
                }
                this.markerrender()
            } catch (e) {
                this.$tools.dd('地图初始化失败', e)
            }
        },
        async initMap() {
            const that = this
            const loader = new AMapLoader({
                key: that.$config.amapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
                version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [], // 插件列表
            })
            await loader.load()
            await loader.loadPlugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.MapType', 'AMap.Geolocation', 'AMap.Driving', 'AMap.Geocoder'])

            return new Promise((resolve, reject) => {
                const { AMap } = loader
                that.AMaps = AMap
                const map = new AMap.Map('mymap', {
                    mapStyle: 'amap://styles/light',
                    zoom: 10,
                    lang: this.$store.state.locale === 'en' ? 'en' : 'zh_cn',
                })
                that.Maps = map

                // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                map.addControl(new AMap.ToolBar())

                // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                map.addControl(new AMap.Scale())

                // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                map.addControl(new AMap.MapType())

                // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
                map.addControl(new AMap.Geolocation())

                resolve(map)
            })
        },
        geocoderGetLocation(address) {
            return new Promise((resolve, reject) => {
                const geocoder = new this.AMaps.Geocoder({
                    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                    city: '全国',
                })

                geocoder.getLocation(address ?? '北京市海淀区苏州街', (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        resolve(result)
                    } else {
                        reject(result)
                    }
                })
            })
        },
        markersMany(AMap, map, provinces, data) {
            const markers = new AMap.Marker({
                position: provinces,
                icon: '/images/dingwei.png',
                offset: new AMap.Pixel(-10, -20),
                clickable: true,
                // map: map
            })
            markers.setMap(map)
            // 设置鼠标划过点标记显示的文字提示
            markers.setTitle('')
            markers.setLabel({
                offset: new AMap.Pixel(10, 0), // 设置文本标注偏移量
                // href='https://www.amap.com/search?query=" + data.address + "' target='_blank'
                content:
                    `<a href='https://www.amap.com/search?query=${data.address}' target='_blank' class='flex dom${data.id}'>` +
                    `<div class='w-xl h-xl mr-sm' style='background: url(${data.image}) no-repeat center/cover;'></div>` +
                    `<div class=''><div class='text-md text-gray-900'>${data.title}</div>` +
                    `<div class='text-sm text-gray-600 pt-sm'>${data.address}</div>` +
                    '</div>' +
                    '</a>', // 设置文本标注内容
                direction: 'right', // 设置文本标注方位
                clickable: true,
            })
            this.MarkersArr.push(markers)
        },
        clearMarker() {
            // for(let i = 0; this.MarkersArr.length; i++) {
            //     this.MarkersArr[i].setMap(null);
            // }
            this.Maps.remove(this.MarkersArr)
            this.MarkersArr = []
        },
        markerrender() {
            const markers = this.MarkersArr
            // console.log(markers)
            for (let i = 0; i < markers.length; i++) {
                // console.log(markers[i].dom)
                // AMap.event.addListener(markers[i].dom, "click", function (e) {
                //     let cur = JSON.parse(JSON.stringify(e.target.getExtData()));
                //     console.log(cur)
                // });
            }
        },
    },
}
</script>
<style lang="less">
.amap-logo,
.amap-copyright {
    display: none !important;
}

@media (max-width: 640px) {
    .amap-toolbar {
        display: none !important;
    }
}
</style>
