const login = [
    'member_center', // 个人中心主页
]

const nologin = ['login', 'forget_password', 'register']

export default (context) => {
    // console.log('[路由]',context.route.name)
    const islogin = login.includes(context.route.name)
    const isnologin = nologin.includes(context.route.name)
    // console.log('[是否需要登陆]',islogin,context.store.state.token)
    if (islogin && !context.store.state.token) {
        // context.redirect('/login')
        context.redirect('/')
    }
    if (isnologin && context.store.state.token) {
        context.redirect('/')
    }
}
