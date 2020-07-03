
module.exports = {
　　devServer: {
　　　　host: 'localhost',
　　　　port: 8080,
　　　　proxy: {
　　　　　　'/getDiscList': {
　　　　　　　　target: 'https://api.huijingwuye6688.com',// 要跨域的域名
　　　　　　　　changeOrigin: true, // 是否开启跨域
　　　　　　　　pathRewrite: {
　　　　　　　　'^/api': '/api/' // 在请求的时候 凡是/api开头的地址都可以跨域
　　　　　　　　}
　　　　　　},
　　　　}
　　}
};