<?php
$this->title = Yii::t('app', 'Login');
?>
<div class="jumbotron">
    <div class="container">
        <div class="col-sm-4">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="login-card card">
                        <div class="header text-center">
                            <h4 class="title">Login</h4>
                            <!-- <h4 class="title"><img src="images/kwings.png" /></h4> -->
                        </div>
                        <div class="content">
                            <form id="form-login" method="POST" action="index.php?r=site/verification">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group" >
                                            <label style="color: #fff !important">Username:<span class="asterik">*</span>
                                                <span  class="errmsg" id="err-fullname"></span> </label>
                                            <input  type="email" class="form-control border-input" placeholder="Email" name="loginemail"  id="loginemail" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group" >
                                            <label style="color: #fff !important">Password:<span class="asterik">*</span>
                                                <span class="errmsg" style="color: #fff !important" id="err-password"></span> </label>
                                            <input  type="password" class="form-control border-input"  placeholder="Password" id="loginpassword" name="loginpassword"  required>  
                                        </div>
                                    </div>
                                </div>

                                <div class="text-center">
                                    <button id="loginButton"  type="submit" class="btn btn-info btn-fill btn-wd">Login</button>
                                </div>
                                <!-- <div class="pull-right">
                                    <a  >Register</a> &nbsp;&nbsp;&nbsp;
                                    <a href="index.php?r=site/forgotpassword" >Forgot Password</a>
                                </div> -->
                                <div class="clearfix"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-8 pull-right">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="login-card card">
                        <div class="header text-center">
                            <!-- <h4 class="title"><img src="images/kwings.png" /></h4> -->
                            <h4 class="title">Registration</h4>
                        </div>
                        <div class="content">
                            <form id="form-login" method="POST" action="index.php?r=site/verification">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group" >
                                            <label style="color: #fff !important">Email:<span class="asterik">*</span>
                                                <span  class="errmsg" id="err-fullname"></span> </label>
                                            <input  type="email" class="form-control border-input" placeholder="Email" name="email"  id="email" required>
                                        </div>
                                    </div>
                                </div>
                                   <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group" >
                                            <label style="color: #fff !important">Phone:<span class="asterik">*</span>
                                                <span  class="errmsg" id="err-fullname"></span> </label>
                                            <input  type="text" class="form-control border-input" placeholder="Email" name="phone"  id="phone" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group" >
                                            <label style="color: #fff !important">Password:<span class="asterik">*</span>
                                                <span class="errmsg" style="color: #fff !important" id="err-password"></span> </label>
                                            <input  type="password" class="form-control border-input"  placeholder="Password" id="password" name="password"  required>  
                                        </div>
                                    </div>
                                </div>
                                   <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group" >
                                            <label style="color: #fff !important">Images:<span class="asterik">*</span>
                                                <span class="errmsg" style="color: #fff !important" id="err-password"></span> </label>
                                            <input  type="file" class="form-control border-input"  placeholder="Photo" id="file" name="file"  required>  
                                        </div>
                                    </div>
                                </div>

                                <div class="text-center">
                                    <button id="loginButton" onclick="Registeration();"  type="button" class="btn btn-info btn-fill btn-wd">Login</button>
                                </div>
                               <!--  <div class="pull-right">
                                    <a  >Register</a> &nbsp;&nbsp;&nbsp;
                                    <a href="index.php?r=site/forgotpassword" >Forgot Password</a>
                                </div> -->
                                <div class="clearfix"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="js/site/login.js"></script>