<?php
$this->title = Yii::t('app', 'Dashboard');
?>

<div class="row">
    <div class="col-md-12">
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                 
                </div>
            </div>
        </div>
        <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="header">
                                <h4 class="title"></h4>
                                <p class="category">Last Performance</p>
                            </div>
                            <div class="content">
                                    <div class="chart-legend">
<!--                                        <i class="fa fa-circle text-info"></i> Performance high
                                        <i class="fa fa-circle text-danger"></i> Performance high
                                        <i class="fa fa-circle text-warning"></i> Performance high-->
                                    </div>
                                    <hr>
                                    <div class="stats">
                                        <!--<i class="ti-timer"></i> Campaign sent 2 days ago-->
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card ">
                            <div class="header">
                                <h4 class="title">Employees</h4>
                                <p class="category"></p>
                            </div>
                            <p><?php echo Yii::$app->session['email']; ?></p>
                            

                                    <div class="chart-legend">
                                      <!--   <i class="fa fa-circle text-info"></i> 
                                        <i class="fa fa-circle text-warning"></i> -->
                                    <hr>
                                    <div class="stats">
                                        <i class="ti-check"></i> 
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</div>
