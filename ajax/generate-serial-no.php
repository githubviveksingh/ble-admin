<?php include"../includes/connect.php"; ?>
<?php include"../includes/functions.php"; ?>
<?php include("../includes/check_session.php");?>
<?php

$reader_type  = $_POST['reader_type'];

$id = $_SESSION['user']['accountID'];
$accountDetails = getDetails('account',$id);

$accountName = $accountDetails['accountName'];

$table = "reader";
$readerData = array();
$count = 0;
$sql = "Select max(readerSerial) as readerSerial From reader Where readerType =".$reader_type;
$readerData = fetchData($sql,array(),$count);

$acnt_suffix = strtoupper(substr($accountName,0,3));
if($reader_type == 1){
	$suffix = $acnt_suffix."_RD_BLE_";
}else if($reader_type == 2){
	$suffix = $acnt_suffix."_RD_WIFI_";
}else if($reader_type == 3){
	$suffix = $acnt_suffix."_RD_LAN_";
}else if($reader_type == 4){
	$suffix = $acnt_suffix."_RD_GSM_";
}else if($reader_type == 5){
	$suffix = $acnt_suffix."_RD_WG_";
}


if(isset($readerData[0]['readerSerial']) && !empty($readerData[0]['readerSerial'])){
	$i = 01;
	$reader_serial = $readerData[0]['readerSerial'];
	$last_count = substr($reader_serial,-2);
	$inc = $last_count + $i;
	$serial_no = $suffix.'0'.$inc;
}else{
	$serial_no = $suffix.'01';
	
}
echo $json = json_encode($serial_no);
?>
