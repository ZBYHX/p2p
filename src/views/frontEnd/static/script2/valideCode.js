$(function () {
    //点击获取验证码
    $("#second").click(function () {
        sendyzm($("#second"));
    });

    // //点击登录提交
    // $("#onSubmit").click(function () {
    //     var securityCode = $("#securityCode").val();
    //     var phone0 = $("#userPhone").val();
    //     location.href = "/sms/smsService/onSubmit?securityCode="+securityCode+"&phone="+phone0;
    // });

    //用ajax提交到后台的发送短信接口
    function sendyzm(obj) {
        var phone = $("#userPhone").val();
        var result = isPhoneNum();
        if (result == true) {
            // $.ajax({
            //     url: "/sms/smsService/sendSms",
            //     data: {phone: phone},
            //     dataType: "json",
            //     type: "post",
            //     async: false,
            //     cache: false,
            //     success: function (data) {
            //         // debugger;
            //         if (data.code > 0) {
            //             alert("验证码发送成功");
            //         } else {
            //
            //         }
            //     },
            //     error: function () {
            //         alert("验证码发送失败");
            //     }
            // });
            setTime(obj);//开始倒计时
        }
    }

    //60s倒计时实现逻辑
    var countdown = 60;

    function setTime(obj) {
        if (countdown == 0) {
            obj.prop('disabled', false);
            obj.text("点击获取验证码");
            countdown = 60;//60秒过后button上的文字初始化,计时器初始化;
            return;
        } else {
            obj.prop('disabled', true);
            obj.text("(" + countdown + "s)后重新发送");
            countdown--;
        }
        setTimeout(function () {
            setTime(obj)
        }, 1000) //每1000毫秒执行一次
    }


    //校验手机号是否合法
    function isPhoneNum() {
        var phonenum = $("#userPhone").val();
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!reg.test(phonenum)) {
            alert('请输入有效的手机号码！');
            return false;
        } else {
            return true;
        }
    }


});
