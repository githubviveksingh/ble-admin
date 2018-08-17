<?php
include("../includes/connect.php");
include("../includes/functions.php");
$option='';
if(isset($_GET['accountId']) && !empty($_GET['accountId'])){

    $tags = getTag($_GET['accountId']);
    if(isset($tags) && !empty($tags)){
        $option .=   '<option disabled selected value="">Select Tag Serial Number</option>';
        
            $option .=   '<option value="0">All Tag Serial Number</option>';
        
       foreach($tags as $value) {
         $option.='<option value='.$value['id'].'>'. $value['tagSerial'] .'</option>';
       }
    }else{
        $option .=   '<option disabled selected value="">Record not found.</option>';
    }
    echo $option;
    exit;
}?>
