# XX 金服

>

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
# 修改入口为config/index.js host/port
npm run dev
# npm run dev报错问题
# 把config/index.js host修改为自己的ip

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

node 服务提供 mockApi 服务，用于接口调试

## node Setup

```bash
cd mockServer

npm install

npm start
```

## send

```
npm run send
```

## config

接口 host: /src/config baseApi

mock 接口 cors 配置: /mockServer/app.js ips

## 参考文档

vue https://cn.vuejs.org/
vuex https://vuex.vuejs.org/
vux https://doc.vux.li/zh-CN/
vue-router https://router.vuejs.org/
