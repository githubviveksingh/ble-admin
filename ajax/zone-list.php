<?php
include("../includes/check_session.php");
include("../includes/connect.php");
include("../includes/functions.php");

$requestData= $_REQUEST;
$customColumns = array();
$columns = array(
// datatable column index  => database column name
   0 =>'z.id',
   1 =>'z.zoneName',
   2 =>'z.zoneType',
   3 =>'a.accountName',
   4 =>'z.zoneDescription',
   5 =>'z.zoneCreationTime',
   6 =>'z.zoneUpdateTime'
);
// getting total number records without any search
$implodeData = implode(',', $columns);

$query = "SELECT ";
$query .= "z.*,a.accountName FROM zone z JOIN account a ON z.accountID=a.id WHERE z.accountID = ".$_SESSION['user']['accountID'];
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
    $viewLink = "view-zone.php?sID=".$d["id"];
    $editLink = "add-zone.php?zoneid=".$d['id'];
    $actionOption="<a title='Edit Zone Details' href='".$editLink."' class='btn btn-default'><span class='fa fa-pencil'></span></i><a title='View Zone Details' href='".$viewLink."' class='btn btn-default view'><span class='fa fa-eye'></span></i></a>";

    $array     = array();    
    $array[]   = $requestData['start']+$countVal;
    $countVal++;
    $array[] = $d["zoneName"];
    $zonetype = explode(',',$d['zoneType']);
    $type = [];
    foreach($ZONETYPE as $key=>$value){
     if(in_array($key,$zonetype)){
         $type[] = $value;
     }
    }
    $array[] = implode(',',$type);
    $array[] = $d["accountName"];
    $array[] = $d["zoneDescription"];
    $array[] = $d["zoneCreationTime"];    
    $array[] = $d["zoneUpdateTime"];
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
