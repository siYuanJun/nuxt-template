const envData = {
    development: {
        NODE_ENV: 'development',
        // 测试服务器地址
        API_BASE_URL: 'http://192.168.1.165:8080',
        API_BASE_SECRET: '5N1nibXzwFjhOHUv',
        DEBUG: true,
    },
    production: {
        NODE_ENV: 'production',
        // 正式服务器地址
        API_BASE_URL: 'http://www.xxx.com',
        API_BASE_SECRET: '4Hr9KXoA1n5bCxt7',
        DEBUG: false,
    },
}
// console.log(process.env.NODE_ENV)
export default envData[process.env.NODE_ENV]
