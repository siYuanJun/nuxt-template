<template>
    <div class="">
        <div id="top" class="header-lnline border-b-default border-gray-200" :class="headerToggleVal ? 'la' : ''">
            <div class="wp">
                <div class="flex justify-between items-center">
                    <div class="">
                        <a :href="$i18n.path('')"><img src="/images/logo.png" alt="" class="logo"></a>
                    </div>
                    <div class="nav h-xl flex items-center" @mouseenter="headerToggle(1)" @mouseleave="headerToggle(0)">
                        <ul class="flex">
                            <li>
                                <nuxt-link :to="$i18n.path('')">
                                    {{ $t('Home') }}
                                </nuxt-link>
                            </li>
                            <li v-for="(item, index) in columnData" :key="index" :class="item.id === Number($route.params.id) ? 'curr' : ''" @mouseenter="pageChild = index">
                                <a v-if="item.gourl" :href="item.gourl" target="_blank" />
                                <nuxt-link v-else-if="item.mark && !item.children.length" :to="$i18n.path('article/' + item.mark + '/' + item.id)">
                                    {{ item.title }}
                                </nuxt-link>
                                <a v-else>{{ item.title }}</a>
                            </li>
                        </ul>
                        <div class="la-contrast">
                            <div class="wp">
                                <ul />
                                <ul v-for="(item, index) in columnData" v-show="pageChild === index" :key="index" class="item flex justify-center items-center">
                                    <li v-for="(items, indexs) in item.children" :key="indexs" :class="items.id === Number($route.params.id) ? 'curr' : ''">
                                        <a v-if="items.gourl" :href="item.gourl" target="_blank">{{ items.title }}</a>
                                        <nuxt-link v-else-if="items.mark" :to="$i18n.path('article/' + items.mark + '/' + items.id)">
                                            {{ items.title }}
                                        </nuxt-link>
                                        <a v-else>{{ items.title }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <a v-if="$store.state.locale === 'en'" class="flex text-gray-0f0f0f pr-sm lg:pr-md mr-sm lg:mr-md border-r-default border-gray-200 h-md" @click="changeLanguage('zh')">ZH</a>
                        <a v-else class="flex text-gray-0f0f0f pr-sm lg:pr-md mr-sm lg:mr-md border-r-default border-gray-200 h-md" @click="changeLanguage('en')">EN</a>
                        <div class="flex items-center relative">
                            <div class="search-form flex justify-between items-center" :class="searVal ? 'cur' : ''">
                                <input v-model="keyword" type="text" name="keyword" class="sear">
                                <a class="text-gray-0f0f0f" @click="searSubmit"><i class="cuIcon-search" /></a>
                            </div>
                            <a class="sear-btn mr-md text-gray-0f0f0f" @click="searChang(1)"><i class="cuIcon-search" /></a>
                            <a v-if="!loginId" class="text-gray-0f0f0f" @click="toggleShow">
                                {{ $t('login.loginSubmit') }}
                            </a>
                            <div v-else class="user-login-model text-gray-0f0f0f" :class="userNavModel ? 'cur' : ''">
                                <i class="cuIcon-my cursor-pointer" @click="userNavModel = !userNavModel" />
                                <ul class="">
                                    <li>
                                        <nuxt-link :to="$i18n.path('user/personalData')">
                                            {{ $t('user.personalCenter') }}
                                        </nuxt-link>
                                    </li>
                                    <li>
                                        <a @click="exitLogin">{{ $t('login.exitLogin') }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-lnline-height" />
    </div>
</template>

<script>
import { getToken } from '~/plugins/cookie'

export default {
    props: {
        titleType: {
            type: Number,
            default: 0,
        },
        columnData: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    data() {
        return {
            column: [
                {
                    name: '新闻动态',
                    url: 'article/news',
                    prent: [
                        { name: '要闻热点', url: 'article/news' },
                        { name: '最新动态', url: 'article/news' },
                    ],
                },
                {
                    name: '年会活动',
                    prent: [
                        { name: '我要报名', url: '' },
                        { name: '论坛日程', url: 'article/forumAgenda' },
                        { name: '会场导航', url: 'article/venueNavigation' },
                        { name: '往届论坛', url: 'article/previousForums' },
                        { name: '合作伙伴', url: 'article/partner' },
                        { name: '精彩回顾', url: 'article/wonderfulReview' },
                    ],
                },
                {
                    name: '系列活动',
                    prent: [
                        { name: '"双管家" 服务', url: '' },
                        { name: '金科新区', url: '' },
                    ],
                },
                {
                    name: '在线直播',
                    url: '',
                    prent: [],
                },
                {
                    name: '在线展览',
                    prent: [
                        { name: '红色金融百年', url: 'article/news' },
                        { name: '金融科技监管沙盒应用', url: 'article/news' },
                        { name: '冬奥数字人民币支付应用', url: 'article/news' },
                        { name: '北京市各区特色金融', url: 'article/news' },
                    ],
                },
                { name: '金融界研究院', url: 'book/list' },
                { name: '联系我们', url: 'article/contact' },
            ],
            menuVal: false,
            searVal: false,
            headerToggleVal: false,
            pageChild: 0,
            loginId: '',
            userNavModel: false,
            keyword: '',
        }
    },
    created() {
        this.loginId = getToken(this)
        // console.log(this.$route.params.id)
    },
    methods: {
        searSubmit() {
            if (!this.keyword) {
                this.searChang()
                return
            }
            this.$router.push({
                path: this.$i18n.path(`article/search/${this.keyword}`),
            })
        },
        exitLogin() {
            this.$cookies.remove(this.$config.loginKey)
            this.$store.commit('setLoginId', 0)
            window.location = this.$i18n.path('')
        },
        toggleShow() {
            if (this.loginId) {
                this.$router.push({
                    path: this.$i18n.path('user/personalData'),
                })
                return
            }
            this.$parent.showModelChang()
        },
        menuChang() {
            this.menuVal = !this.menuVal
        },
        searChang(type) {
            this.searVal = !this.searVal
        },
        changeLanguage(language) {
            this.$tools.changeLanguage(this, language)
        },
        headerToggle(type) {
            this.headerToggleVal = type
        },
    },
}
</script>

<style lang="less" scoped>
.header-lnline {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 151;
    width: 100%;
    padding: 7px 20px;
    background: rgba(255, 255, 255, 0.8);
    .function-transition-all-ease();

    &.la {
        .la-contrast {
            opacity: 1;
            visibility: visible;
            bottom: -63px;
        }
    }

    .la-contrast {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        width: 100%;
        bottom: -50px;
        background: #ffffff;
        left: 0;
        box-shadow: -3px 6px 10px rgba(0, 0, 0, 0.098);
        .function-transition-all-ease();

        .item {
            > li {
                &.curr {
                    > a {
                        color: @---thime-color;
                    }
                }
                > a {
                    display: block;
                    height: 62px;
                    line-height: 60px;
                    font-size: 16px;
                    color: #999;
                    padding: 0 20px;

                    &:hover {
                        background: @---thime-color;
                        color: #ffffff;
                    }
                }
            }
        }
    }

    .nav {
        > ul > li {
            position: relative;
            margin: 0 5px;

            &:hover {
                > a {
                    color: rgba(20, 13, 140, 0.999);
                }
            }

            &.curr {
                &:after {
                    content: '';
                    position: absolute;
                    width: 60px;
                    height: 3px;
                    background: @---thime-color;
                    bottom: -33px;
                    left: 50%;
                    margin-left: -30px;
                }

                > a {
                    color: rgba(20, 13, 140, 0.999);
                }
            }

            > a {
                font-size: 16px;
                color: #333333;
                padding: 10px;
                position: relative;
            }

            > .la {
                opacity: 0;
                visibility: hidden;
                position: absolute;
                top: 30px;
                left: 20px;
                width: 180px;
                height: auto;
                z-index: 1;
                background: rgba(255, 255, 255, 0.789);
                box-shadow: 1px 2px 19px -1px rgba(0, 0, 0, 0.123);
                .function-transition-all-ease();

                li {
                    position: relative;

                    &:nth-child(1) {
                        > a {
                            padding-top: 15px;
                        }
                    }

                    a {
                        display: block;
                        font-size: 16px;
                        color: #023c49;
                        padding: 0px 10px 15px 10px;
                        opacity: 0.75;

                        &:hover {
                            opacity: 1;
                        }
                    }

                    > ul {
                        display: none;
                        width: 100%;
                        position: absolute;
                        right: -100%;
                        top: 0;
                        background: rgba(255, 255, 255, 0.789);
                        box-shadow: 1px 2px 19px -1px rgba(0, 0, 0, 0.123);
                    }

                    &:hover {
                        > ul {
                            display: block;
                        }
                    }
                }
            }
        }
    }

    &.cur {
        width: 100%;
        top: 0;
        padding: 7px;
        box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, 0, 0.123);
        background: rgba(255, 255, 255, 0.9);
    }
}

@media (max-width: 1300px) {
    .header-lnline {
        .nav {
            > ul > li > a {
                padding: 10px 2px;
            }
        }
    }
}

@media (max-width: 640px) {
    .header-lnline {
        padding: 10px;

        .logo {
            height: 40px;
        }
    }
}
</style>
