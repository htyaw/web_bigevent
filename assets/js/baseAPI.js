//每次调用$.get $.post $.ajax的时候，会先调用ajaxprefilter函数
//在这个函数中，可以拿到ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})