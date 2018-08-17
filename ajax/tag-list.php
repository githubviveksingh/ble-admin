<?php
include("../includes/check_session.php");
include("../includes/connect.php");
include("../includes/functions.php");

$requestData= $_REQUEST;
$customColumns = array();
$columns = array(
// datatable column index  => database column name
   0 =>'t.id',
   1 =>'t.tagSerial',
   2 =>'t.tagMAC',
   //3 =>'a.accountName',
   4 =>'u.userName',
   5 =>'t.tagLastTx',
   6 =>'t.tagLastRSSI',
   7 =>'t.tagLastSensor',
   8 =>'t.tagLastBattery',
   /*9 =>'t.tagLastStatus',
   10 =>'t.tagLastConnectTime',*/
   //11 =>'t.tagCreatedTime'
);
// getting total number records without any search
$implodeData = implode(',', $columns);

$query = "SELECT ";
$query .= "t.*,u.userName,a.accountName FROM tag t JOIN users u on t.tagUserID=u.id JOIN account a on t.accountID=a.id WHERE t.accountID = ".$_SESSION['user']['accountID'];
$counterQuery = $query;
$counterQuery = str_replace("[IMPLODEDATA]", "count(*) as counter", $counterQuery);
$totalCounter = getCounter($counterQuery, array());;

// getting records as per search parameters
$extraQuery = "";
foreach($columns as $key=>$value){

    if(strpos($value, " as ") !== false){
        $valuePart = explode(" as ", $value);
        $value = $valuePart[0];
    }

    if(array_key_exists($value, $customColumns)){
        if(!empty($requestData['search']['value'])){
            $val = $requestData['search']['value'];
            $str = "";

            foreach($$customColumns[$value] as $key=>$array){
                if(strpos(strtolower($array), strtolower($val)) !== false){
                    $str .= $key.", ";
                }
            }
            $str = rtrim($str, ", ");
            if(!empty($str)){
                if(intval($str)){
                    $extraQuery .= " OR ".$value." in (".$str.")";
                }else{
                    $extraQuery .= " OR ".$value." in ('".$str."')";
                }

            }
        }
    }
    if(!empty($requestData['search']['value'])){
        $extraQuery .= " OR ".$value." LIKE '".$requestData['search']['value']."%' ";
    }

}
$counterQuery = $query;
$counterQuery = str_replace("[IMPLODEDATA]", "count(*) as counter", $counterQuery);
$query = str_replace("[IMPLODEDATA]", $implodeData, $query);
$totalFiltered = 0;


//COUNT TOTAL NUMBER OF ROWS
$totalFiltered = getCounter($counterQuery, array());

$query .= " ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."   LIMIT ".$requestData['start']." ,".$requestData['length']."   ";  // adding length
$counter = 0;

$data = fetchData($query, array(), $counter);
$arrayData = array();
$countVal = 1;
foreach($data as $d){
    $viewLink = "view-tag.php?sID=".$d["id"];
    $editLink  = "add-tag.php?tagid=".$d['id'];
    $actionOption="<a title='Edit Tag Details' href='".$editLink."' class='btn btn-default'><span class='fa fa-pencil'></span></i><a title='View Tag Details' href='".$viewLink."' class='btn btn-default view'><span class='fa fa-eye'></span></i></a>";

    $array     = array();    
    $array[]   = $requestData['start']+$countVal;
    $countVal++;
    $array[] = $d["tagSerial"];
    $array[] = $d["tagMAC"];
    //$array[] = $d["accountName"];
    $array[] = $d["userName"];
    $array[] = $d["tagLastTx"];
    $array[] = $d["tagLastRSSI"];
    $array[] = $d["tagLastSensor"];
    $array[] = $d["tagLastBattery"]; 
    //$array[] = $d["tagLastStatus"];
    /*$array[] = $d["tagLastConnectTime"];    
    $array[] = $d["tagCreatedTime"];*/
    $array[] = $actionOption;
    $arrayData[] = $array;
}


 //OrderId-  243494652  63710029  Shyam 

$json_data = array(
            "draw"            => intval( $requestData['draw'] ),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw.
            "recordsTotal"    => intval( $totalCounter ),  // total number of records
            "recordsFiltered" => intval( $totalFiltered ), // total number of records after searching, if there is no searching then totalFiltered = totalData
            "data"            => $arrayData   // total data array
            );

echo json_encode($json_data);
?>
