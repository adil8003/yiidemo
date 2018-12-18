$(document).ready(function () {
    getUserdetail();
    var id = $('#userid').val();
    var studentDropzone = new Dropzone("#userProfile", {
        url: "index.php?r=profile/uploadusserprofilepic&id=" + id + "",
        clickable: '#profilepic',
        previewTemplate: '<div style="display:none"></div>'
    });
    studentDropzone.on("addedfile", function (file) {
        $('#progressimage').removeClass('hide');
    });
    studentDropzone.on("uploadprogress", function (file, progress, bytesSent) {
        $('#progressimage').attr('value', progress);
        $('#progressimage').html(bytesSent + ' bytes');
    });
    studentDropzone.on("complete", function (file) {
        $('#progressimage').addClass('hide');
        getUserImagebyid($('#userid').val());
    });
    getUserImagebyid(id);
});

function deleteUserImage() {
    var obj = new Object();
    obj.id = $('#userid').val();
    alertify.confirm("Are you sure you want to delete this image?",
            function () {
                $.ajax({
                    url: "index.php?r=profile/deleteuserprofilepic",
                    async: false,
                    data: obj,
                    type: 'POST',
                    success: function (data) {
                        data = JSON.parse(data);
                        getUserImagebyid(obj.id);
                        if (data.status) {
                            showMessage('success', 'Your profile image is deleted.');
                        } else {
                            showMessage('danger', 'Please try again.');
                        }
                    }
                });
            });
}

function getUserImagebyid(id) {
    var obj = new Object();
    obj.id = id;
    $.ajax({
        url: "index.php?r=profile/getuserimagebyid",
        async: false,
        data: obj,
        type: 'POST',
        success: function (data) {
            data = JSON.parse(data);
            if (data.status) {
                $('#profilepic-admin').attr('src', 'index.php?r=profile/linkuserimage&id=' + data.data.id);
                console.log(data.data.image)
                if (data.data.image.indexOf('/resources/users/no_image.jpg') > -1) {
                    $('#picid').hide('hide');
                    $('#picid').css('display', 'none');
                } else {
                    $('#picid').show();
                    $('#picid').css('color', '#1f1d1d');
                }
            } else {

            }

        }
    });
}
function getUserdetail() {
    var obj = new Object();
    obj.id = $('#userid').val();
    $.ajax({
        url: 'index.php?r=profile/getuserdetailsbyid',
        async: false,
        data: obj,
        type: 'POST',
        success: function (data) {
            var data = JSON.parse(data);
            if (data.status == true) {
                createHTML(data);
            }
        }
    });
}

function createHTML(data) {
    var html = '';
    html += ' <div class="content" >';
    html += ' <div class="header">';
    html += '  <h4 class="title">Edit profile <span>';
    html += ' <button id="password"  class="btn btn-info btn-fill btn-xs btn-wd pull-right">Change Password</button></span></h4> ';
    html += '</div><br><hr>';
    html += '<form name="form" >';
    html += ' <div class="row">';
    html += '<div class="col-md-12 ">';
    html += ' <div class="form-group" >';
    html += ' <label>Full name:<span class="asterik">*</span>';
    html += ' <span  class="errmsg" id="err-fullname"></span> </label>';
    html += '<input type="text" class="form-control border-input input-sm" value="' + formattedText(data.fullname) + '"  name="fullname" id="fullname"  placeholder="Full Name" required/>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="row">';
    html += '<div class="col-md-6">';
    html += '<div class="form-group">';
    html += '<label>Username:<span class="asterik">*</span>';
    html += ' <span  class="errmsg" id="err-username"></span> </label>';
    html += '<input type="text" class="form-control border-input input-sm" name="username" value="' + formattedText(data.username) + '" id="username" placeholder="Username">';
    html += '</div>';
    html += ' </div>';
    html += '<div class="col-md-6 ">';
    html += '<div class="form-group" >';
    html += '<label>Email:<span class="asterik">*</span>';
    html += ' <span  class="errmsg" id="err-email"></span> </label>';
    html += '<input type="text" class="form-control border-input input-sm" name="email" value="' + data.email + '" id="email"  required placeholder="Email">';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="row">';
    html += '<div class="col-md-12">';
    html += '<div class="form-group" >';
    html += '<label>Phone:<span class="asterik">*</span>';
    html += ' <span  class="errmsg" id="err-phone"></span> </label>';
    html += '<input type="email" class="form-control border-input" name="phone" value="' + formattedText(data.phone) + '" id="phone"  required placeholder="phone">';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="text-center">';
    html += '<button type="button" onclick="saveUpdateuser();"  class="btn btn-info btn-fill btn-wd">Save</button>';
    html += '</div>';
    html += ' <div class="clearfix"></div>';
    html += '</form>';
    html += '</div>';
    $('#updateprofile').html(html);
}

function saveUpdateuser() {
    if (validateUser()) {
        alertify.confirm("Are you sure you want update your profile?",
                function () {
                    var obj = new Object();
                    obj.id = $('#userid').val();
                    obj.fullname = $('#fullname').val();
                    obj.username = $('#username').val();
                    obj.phone = $('#phone').val();
                    obj.email = $('#email').val();
                    $.ajax({
                        url: 'index.php?r=profile/updateuser',
                        async: false,
                        data: obj,
                        type: 'POST',
                        success: function (data) {
                            $('.adminName').html(obj.fullname);
                            showMessage('success', 'Your profile is updated.');
                        },
                        error: function (data) {
                            showMessage('danger', 'Please try again.');
                        }
                    });
                });
    }
}

function validateUser() {
    var flag = true;
    var fullname = $('#fullname').val();
    var username = $('#username').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (fullname == '') {
        $('#err-fullname').html('Fullname required');
        flag = false;
    } else {
        $('#err-fullname').html('');
    }
    if (username == '') {
        $('#err-username').html('Username required');
        flag = false;
    } else {
        $('#err-username').html('');
    }
    if (phone == '') {
        $('#err-phone').html('Phone no. required');
        flag = false;
    } else {
        $('#err-phone').html('');
        if (((phone.length) > 10) || ((phone.length) < 10)) {
            $('#err-phone').html('10 Digit mobile number required');
            flag = false;
        }
        if (isNaN(phone)) {
            $('#err-phone').html('Must be numerical');
            flag = false;
        }
    }
    if (email == '') {
        $('#err-email').html('Email required');
        flag = false;
    } else {
        $('#err-email').html('');
        if (!reg.test(email)) {
            $('#err-email').html(' Valid email required');
            flag = false;
        }
    }

    return flag;
}
//-------------password check..
$(function () {
    $('.changePassword').hide();
    $("#password").click(function () {
        if ($('.changePassword').is(':hidden')) {
            $('.changePassword').show();
            $('#updateprofile').hide();
        } else {
            $('.changePassword').show();
            $('#updateprofile').show();
        }
    });
});
$(function () {
    $('.changePassword').hide();
    $("#updateprofile").show();
    $("#passForm").click(function () {
        $(".changePassword").hide();
        $('#updateprofile').show();
    }
    );
});

function checkPasswordMatch() {
    var password = $("#newpassword").val();
    var confirmPassword = $("#confirmpassword").val();
    if (password != confirmPassword) {
        $("#err-confirmpassword").html("Passwords do not match!  Try Again ")
//                    document.oo.password2.focus();
        return false;
    } else {
        $("#err-confirmpassword").html("Passwords match.");
//        $("#err-confirmpassword").css("color", "#2daf62");
        return true;
    }
}

function checkCurrentpass() {
    var input_value = $('#currentpassword').val();
    var id = $('#userid').val();
    $.ajax({
        url: 'index.php?r=employeprofile/checkcurrentpass',
        type: 'POST',
        data: {
            currentpassword: input_value,
            id: id
        },
        success: function (response) {
            data = JSON.parse(response);
            if (data.status == false) {
                $('#err-currentpassword').text("Current password doesn't match");
                $('#currentpassword').focus();
            } else {
                $('#err-currentpassword').text('');
            }
        }
    });
}

function saveChangePassword() {
    var id = $('#userid').val();
    if (checkPasswordMatch()) {
        if (validPassword()) {
            alertify.confirm("Are you sure you want to change password?",
                    function () {
                        var obj = new Object();
                        obj.id = id;
                        obj.password = $('#confirmpassword').val();
                        $.ajax({
                            url: 'index.php?r=employeprofile/changepassword',
                            async: false,
                            data: obj,
                            type: 'POST',
                            success: function (data) {

                                showMessage('success', 'Password update successfully');
                                $('#currentpassword').val('');
                                $('#confirmpassword').val('');
                                $('#newpassword').val('');
                            },
                            error: function (data) {
                                showMessage('danger', 'Please try again.');
                            }
                        });
                    });
        }
    }
}

function validPassword() {
    var flag = true;
    var newpassword = $('#newpassword').val();
    var password = $('#confirmpassword').val();
    var currentpassword = $('#currentpassword').val();
    if (currentpassword == '') {
        $('#err-currentpassword').html(' Please enter current password');
        flag = false;
    }
    if ((currentpassword.trim().length) == 0) {
        $('#err-currentpassword').html(' Please enter current password');
        flag = false;
    } else {
        $('#err-currentpassword').html('');
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
    if (password == '') {
        $('#err-confirmpassword').html('Please enter new confirm password');
        flag = false;
    }
    if ((password.trim().length) == 0) {
        $('#err-confirmpassword').html(' Please enter new confirm password');
        flag = false;
    } else {
        $('#err-confirmpassword').html('');
    }

    return flag;
}