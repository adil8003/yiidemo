

function checkPassword() {
    var input_value = $('#password').val();
    $.ajax({
        url: 'index.php?r=site/checkpassword',
        type: 'POST',
        data: {
            password: input_value
        },
        success: function (response) {
            data = JSON.parse(response);
            if (data.status == true) {
            } else {
                $('#err-password').text('Required valid password');
//                $('#loginButton').attr('disabled', 'disabled');
            }
        }
    });
}
function checkEmail() {
    var input_value = $('#email').val();
    $.ajax({
        url: 'index.php?r=site/checkemail',
        type: 'POST',
        data: {
            email: input_value
        },
        success: function (response) {
            data = JSON.parse(response);
            if (data.status == true) {
            } else {
                $('#err-email').text('Required valid email');
                $('#email').focus();
            }
        }
    });
}
function checkPasswordMatch() {
    var password = $("#newpassword").val();
    var confirmPassword = $("#confirmpassword").val();
    if (password != confirmPassword) {
        $("#err-confirmpassword").html("Passwords do not match!  Try Again ")
//                    document.oo.password2.focus();
        return false;
    }
    else {
        $("#err-confirmpassword").html("Passwords match.");
//        $("#err-confirmpassword").css("color", "#2daf62");
        return true;
    }
}
function saveChangePassword() {
    if (checkPasswordMatch()) {
        if (validPasswordandemail()) {
            var obj = new Object();
            obj.email = $('#email').val();
            obj.password = $('#confirmpassword').val();
            $.ajax({
                url: 'index.php?r=site/savenewpassword',
                async: false,
                data: obj,
                type: 'POST',
                success: function (data) {
                    alertify.alert("Password change successfully !!", function () {
                    });
                    setTimeout(function () {
                        window.location.replace("http://kiwings.aem/index.php?r=site/login");
                    }, 3000);
                }
            });
        }
    }
}
function validPasswordandemail() {
    var flag = true;
    var email = $('#email').val();
    var newpassword = $('#newpassword').val();
    var confirmpassword = $('#confirmpassword').val();

    if (email == '') {
        $('#err-email').html(' Please enter email');
        flag = false;
    }
    if ((email.trim().length) == 0) {
        $('#err-email').html(' Please enter email');
        flag = false;
    } else {
        $('#err-email').html('');
    }
    if (newpassword == '') {
        $('#err-newpassword').html(' Please enter new password');
        flag = false;
    }
    if ((newpassword.trim().length) == 0) {
        $('#err-newpassword').html(' Please enter new password');
        flag = false;
    } else {
        $('#err-newpassword').html('');
    }
    if (confirmpassword == '') {
        $('#err-confirmpassword').html('Please enter  confirm password');
        flag = false;
    }
    if ((confirmpassword.trim().length) == 0) {
        $('#err-confirmpassword').html(' Please enter  confirm password');
        flag = false;
    } else {
        $('#err-confirmpassword').html('');
    }

    return flag;
}

function Registeration() {
        var formData = new FormData();
        formData.append('file', $('#file')[0].files[0]);
        var email = $('#email').val();
        var phone = $('#phone').val();
        var password = $('#password').val();
        alertify.confirm("Are you sure you want add this banner?",
                function () {
                    var obj = new Object();
                    obj.email = $('#email').val();
                    obj.phone = $('#phone').val();
                    obj.password = $('#password').val();
                    obj.image = $('#file').val();
                    $.ajax({
                        url: "index.php?r=site/saveregistration&email=" + email + "&phone= " + phone + "&password= " + password + "",
                        async: false,
                        type: 'POST',
                        data: formData,
                        processData: false, // tell jQuery not to process the data
                        contentType: false, // tell jQuery not to set contentType
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.status == true) {
                                showMessage('success', 'Banner added successfully.');
                                $('#title').val(' ');
                                $('#subtitle').val(' ');
                                $('#file').val(' ');
                            } else if(data){
                                $('#err-file').html('image size must be 1680 x 700 pixels.');
                            }
                        },
                        error: function (data) {
                        }
                    });
                });
}