import env from './env'

const { API_BASE_URL, API_BASE_SECRET, NODE_ENV, DEBUG } = env

export default {
    // VUE文件使用ENV参数必须在此处配置
    env: {
        API_BASE_URL,
        API_BASE_SECRET,
        NODE_ENV,
        DEBUG,
    },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0,user-scalable=no',
            },
            { hid: 'description', name: 'description', content: 'xxxxx' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: '/plugins/swiper/swiper.min.css' },
        ],
        script: [{ src: '/js/jquery.min.js' }, { src: '/plugins/swiper/swiper.min.js' }, { src: '/js/common.js' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['~/assets/css/normailze.less', '~/plugins/colorui/normailze.less', 'fluid-player/src/css/fluidplayer.css', 'vue-happy-scroll/docs/happy-scroll.css'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: '@/plugins/axios' },
        { src: '@/plugins/i18n' },
        { src: '@/plugins/hashids' },
        { src: '@/plugins/baidu' },
        { src: '@/plugins/vue-pdf', ssr: false },
        { src: '@/plugins/function' },
        { src: '@/plugins/routes' },
        { src: '@/main' },
    ],

    generate: {
        routes: ['/'],
    },

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    // @nuxt/typescript-build
    buildModules: ['@nuxtjs/tailwindcss'],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources',
        '@nuxtjs/axios',
        ['cookie-universal-nuxt', { parseJSON: true }],
    ],

    axios: {
        proxy: true, // 代理时本地测试域名无法访问
        prefix: '/', // proxy=true 生效
        baseURL: API_BASE_URL, // proxy=false 有效
    },

    // 该对象的 objectValue 可以使用 this.$config 从客户端和服务器访问
    publicRuntimeConfig: {
        webTitle: 'webTitle',
    },

    // 此对象的 objectValue 只能使用 $config 从服务器访问。覆盖服务器的 publicRuntimeConfig。
    privateRuntimeConfig: {},

    // test proxy
    proxy: {
        '/api/': {
            target: API_BASE_URL,
            // secure: false,  // 如果是 https 接口，需要配置这个参数
            changeOrigin: true, // 如关闭可能接口出现异常
            pathRewrite: {
                '^/api': '/api',
                changeOrigin: true,
            },
        },
        '/profile/': {
            target: API_BASE_URL,
            // secure: false,  // 如果是 https 接口，需要配置这个参数
            changeOrigin: true, // 如关闭可能接口出现异常
            pathRewrite: {
                '^/profile': '/profile',
                changeOrigin: true,
            },
        },
    },

    // Initial loading css
    styleResources: {
        less: [
            './assets/css/variables.less', // 全局 less 变量
        ],
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        vendor: ['vue-i18n', 'hashids', 'routes', 'functions'],
    },

    /*
     * customize nuxt.js router (vue-router).
     *
     * location / {
     *  # proxy_pass http://nuxttest; # 代理upstream模块(这里不能直接代理端口否则_nuxt文件目录无法找到)
     *    index index.html index.htm;
     *    try_files $uri $uri/ /index.html; #解决页面刷新404问题
     * }
     * */
    router: {
        // mode: 'hash',
        middleware: 'i18n', // middleware all pages of the application
    },

    loading: {
        color: 'rgba(37, 28, 229, 0.66)',
        height: '2px',
        continuous: true,
        duration: 3000,
    },
}
