<?php
include("../includes/connect.php");
include("../includes/functions.php");
$option='';
if(isset($_GET['zoneId']) && !empty($_GET['zoneId'])){
  $readers = getReader($_GET['zoneId']);
    if(isset($readers) && !empty($readers)){
        $option .=   '<option disabled selected value="">Select Reader Serial Number</option>';
        $option .=   '<option value="0">All Reader Serial Number</option>';
        foreach($readers as $value) {
          $option.='<option value='.$value['id'].'>'. $value['readerSerial'] .'</option>';
        }
    }else{
        $option .=   '<option disabled selected value="">Record not found.</option>';
    }
    echo $option;
    exit;
  }?>
