<?php
include("../includes/check_session.php");
include("../includes/connect.php");
include("../includes/functions.php");

$requestData= $_REQUEST;
$customColumns = array();
$columns = array(
// datatable column index  => database column name
   0 =>'r.id',
   1 =>'r.readerSerial',
   2 =>'r.readerWMac',
   3 =>'r.readerBMac',
   4 =>'r.readerGMac',
   //5 =>'a.accountName',
   6 =>'r.readerPower',
   7 =>'r.readerType',
   //8 =>'r.readerLastConnectTime',   
   //9 =>'r.readerCreatedTime'
);
// getting total number records without any search
$implodeData = implode(',', $columns);

$query = "SELECT ";
$query .= "r.*,a.accountName FROM reader r JOIN account a ON r.accountID=a.id WHERE r.accountID = ".$_SESSION['user']['accountID'];
$counterQuery = $query;
$counterQuery = str_replace("[IMPLODEDATA]", "count(*) as counter", $counterQuery);
$totalCounter = getCounter($counterQuery, array());

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
    $viewLink = "view-reader.php?sID=".$d["id"];
    $editLink = "add-reader.php?readerid=".$d['id'];
    $actionOption="<a title='Edit Reader Details' href='".$editLink."' class='btn btn-default'><span class='fa fa-pencil'></span></i><a title='View Reader Details' href='".$viewLink."' class='btn btn-default view'><span class='fa fa-eye'></span></i></a>";

    $array     = array();    
    $array[]   = $requestData['start']+$countVal;
    $countVal++;
    $array[] = $d["readerSerial"];
    $array[] = $d["readerWMac"];
    $array[] = $d["readerBMac"];
    $array[] = $d["readerGMac"];
    //$array[] = $d["accountName"];
    foreach($READERPOWER as $key=>$value){
     if($key == $d['readerPower']){
         $array[] = $value;
     }
    } 
   
    foreach($READERTYPE as $key=>$value){
     if($key == $d['readerType']){
         $array[] = $value;
     }
    }       
    //$array[] = $d["readerLastConnectTime"]; 
    //$array[] = $d["readerCreatedTime"]; 
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
