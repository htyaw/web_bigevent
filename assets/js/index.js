$(function () {
    //获取用户的基本信息
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用渲染用户头像函数
            renderAvatar(res.data)
        }
    })
    //定义渲染用户头像函数
    function renderAvatar(user) {
        //1.获取用户名称
        var name = user.nickname || user.username;
        //2.设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户头像
        if (user.user_pic !== null) {
            //渲染用户头像】
            $('.layui-nav-img')
                .attr('src', user.user_pic)
                .show()
                .siblings('.text-avatar')
                .hide();
        } else {
            // var firstWord = name[0].toUpperCase();
            var firstWord = name.substr(0, 1).toUpperCase();
            $('.text-avatar')
                .html(firstWord)
                .show()
                .siblings('.layui-nav-img')
                .hide();
        }
    }
    //实现点击退出按钮的退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function () { //为button按钮添加点击事件
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function (index) {
                localStorage.removeItem('token');//从本地存储中删除数据
                layer.close(index);//关闭confirm询问框
                location.href = 'login.html';
            })
    })

})