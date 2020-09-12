$(function () {
    //验证表单
    var form = layui.form
    form.verify({
        nickname: function (value, item) {
            if (value.length > 6) {
                return '昵称长度应为6~12位的字符';
            }
        }
    });
    //初始化用户的基本信息
    var layer = layui.layer
    initUserInfo()
    // var userinfo = null
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserInfo', res.data);
                // userinfo = res.data
            }
        })
    }
    //设置重置事件
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
        // form.val(formUserInfo, res.data);
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
            }
        })
    })
})