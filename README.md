# nuxt-typescript-start

> NuxtJS Quick development box

## Build

```bash
# install dependencies

> 建议使用 npm update. npm install 会有未知问题～

# serve with hot reload at localhost:3000
$ npm dev

# build for production and launch server
$ npm build
$ npm start

# generate static project
$ npm generate

# Nginx
location / {
 # proxy_pass http://nuxttest; # 代理upstream模块(这里不能直接代理端口否则_nuxt文件目录无法找到)
  index index.html index.htm;
  try_files $uri $uri/ /index.html; # 解决页面刷新404问题
}
```

## Version

#### 1.0.0
- 初始化版本

#### 1.1.0
- 规范命名

## Plugins
- `aos@2.3.4` 动画库
