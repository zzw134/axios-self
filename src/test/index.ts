import Request from "../request";
const  rq = new Request({
    // 该对象中的配置跟axios一样，唯一不同的是添加了一个interceptors选项和showLoading选项
    baseURL: 'http://152.136.185.210:5000',
    interceptors: {
        requestInterceptors(config) {
            config.headers = {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NjA0ODAwMjAsImV4cCI6MTY2MzA3MjAyMH0.OGgvbyft0jhrNOIXdM06sO65eDR0UoNmCTeKJCEm8UqtA7ofPvq-lBgSxlDUAMQ4p4TWXOtFclUakwAdoIwMKjFtn4Mkxl6Hv6T9jUcwCLtUkx-cKoUArYP-dvp3JphLosErHF1903yWMCX-WQ1Y7swtnaGqCYjwxy8UMcTJJbE'
            }
            return config
        },
        requestInterceptorsCatch(err) {
            // console.log(err)
        },
        responseInterceptors(res) {
            res = res.data
            return res
        },
        responseInterceptorsCatch(err) {
            // console.log(err)
        }
    },
    // 每个请求都会开启loading
    showLoading: {
        title: '加载中...',
        color: '#fff'
    }
})

rq.get<{code: number, data: any[]}>({
    // 该对象中的选项跟传给axios.request的选项一样，只是再添加了自己单独的拦截器和loading选项
    url: 'goods/category/count',
    interceptors: {
        requestInterceptors(config) {
            return config
        },
        responseInterceptors(res) {
            return res
        }
    },
    // 这是对单独的请求设置的loading，它会覆盖掉上面设置的loading
    showLoading: {
        title: '666...'
    }

}).then(res => {
    console.log(res.data)
})

setTimeout(() => {
    rq.get({
        url: 'goods/category/sale'
    }).then(res => {
        console.log(res)})
}, 3000)

// 如果只想要获得axios创建的实例的话
// rq.instance