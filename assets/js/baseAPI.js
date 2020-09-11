$.ajaxPrefilter(function (options) {
    //统一设置路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 统一设置有权限的请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载 complete 回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})