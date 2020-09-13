//每次调用$.get $.post $.ajax的时候，会先调用ajaxprefilter函数
//在这个函数中，可以拿到ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //在调用有权限接口的时候，指定complete回调函数：
    //不论 成功还是失败，最终都会调用complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = 'login.html'
        }
    }
})