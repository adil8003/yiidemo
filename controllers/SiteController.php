<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Session;
use yii\web\View;
use app\models\User;
use app\models\Organisation;
use app\models\Status;

class SiteController extends Controller {

    public $enableCsrfValidation = false;

    public function init() {
        Yii::$app->session['isLoggedIn'] = false;
    }

    public function actionIndex() {
        if (Yii::$app->session['isLoggedIn'] == true) {
            return $this->redirect('index.php?r=dashboard');
        } else {
            return $this->redirect('index.php?r=site/login');
        }
    }

    public function actionLogin() {
//        echo md5('kiwings');die;
        $this->layout = "login";
        return $this->render('login');
    }

    public function actionVerification() {
        $request = Yii::$app->request;
        $this->layout = "";
        if ($request->isPost) {
            $model = new User();
            $objUser = $model->findOne(['email' => $request->post('loginemail')]);
            if ($objUser && ($request->post('loginpassword')) == $objUser->password) {
                Yii::$app->session['isLoggedIn'] = true;
                Yii::$app->session['userid'] = $objUser->id;
                Yii::$app->session['email'] = $objUser->email;
                return $this->redirect('index.php?r=dashboard');
            }
        }

        return $this->redirect('index.php?r=site/login');
    }

    public function actionLogout() {
        Yii::$app->session['isLoggedIn'] = false;
        Yii::$app->session['username'] = '';
        Yii::$app->session['email'] = '';
        Yii::$app->session['status'] = '';
        Yii::$app->session['role'] = '';
        return $this->redirect('index.php?r=site/login');
    }

    public function actionError() {
        $this->layout = "login";
        echo "Hi error";
        die;
    }
 public function actionSaveregistration() {
        $arrReturn = array();
        $arrReturn['status'] = FALSE;
        $basePath = Yii::$app->params['basePath'];
        $request = Yii::$app->request;
        $this->layout = "";
        $email = $request->get('email');
        $password = $request->get('password');
        $phone = $request->get('phone');
        if ($request->isPost) {
            if (!empty($_FILES)) {
                $uploaddir = 'resources/img/';
                $image_name = md5(date('Ymdhis'));
                $uploadfile = $basePath . $uploaddir . $image_name . ".jpg";
                $file = $_FILES["file"]['tmp_name'];
                // list($width, $height) = getimagesize($file);
                if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
            
                        $objUser = new User();
                        $objUser->email = $email;
                        $objUser->password = $password;
                        $objUser->phone = $phone;
                        $objUser->image = $uploadfile;
                        if ($objUser->save()) {
                            $arrReturn['status'] = TRUE;
                            $arrReturn['id'] = $objUser->id;
                            $arrReturn['msg'] = 'save successfully.';
                        }
                }
            }
        }
        echo json_encode($arrReturn);
    }

}

// end of SiteController.php
