<?php
include("../includes/check_session.php");
include("../includes/connect.php");
include("../includes/functions.php");

$requestData    = $_REQUEST;
$loginUserId    = $_SESSION['user']['id'];
$accountId      = $_SESSION['user']['accountID'];
$customColumns  = array();
$columns        = array(
// datatable column index  => database column name
   0 =>'Ru.id',
   1 =>'Ru.ruleName',
   2 =>'Ru.ruleType',
   3 =>'Ru.ruleStatement',
   4 =>'Ru.ruleAlertType',
   5 =>'A.accountName',
   6 =>'Z.zoneName',
   7 =>'R.readerSerial',
   8 =>'Ru.ruleUpdateTime'
);
// getting total number records without any search
$implodeData = implode(',', $columns);

$query = "SELECT [IMPLODEDATA] ";
if($loginUserId==1){
  $query .= " FROM rule Ru  LEFT JOIN account A on A.id=Ru.accountID LEFT JOIN reader R on R.id=Ru.readerID LEFT JOIN zone Z on Z.id=Ru.zoneID";
}else{
  $query .= " FROM rule Ru  LEFT JOIN account A on A.id=Ru.accountID LEFT JOIN reader R on R.id=Ru.readerID LEFT JOIN zone Z on Z.id=Ru.zoneID where Ru.accountID=".$accountId."";
}

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
   foreach($RULETYPE as $key=>$valuedata){
        $type=explode(',', $d["ruleType"]);
        $i=0;
        foreach ($type as $values) {
           if($key == $values){
            if($i==0){
                $ruleType=$valuedata;
            }else{
               $ruleType.=' , '.$valuedata; 
            }
                            
            }
            $i++;
        }
    } 
    $array     = array();
    $editLink  = "add-rule.php?ruleId=".$d['id'];
    $viewLink  = "view-rule.php?ruleId=".$d['id'];
    $array[]   = $requestData['start']+$countVal;
    $countVal++;
    $array[] = $d["ruleName"];
    $array[] = $ruleType;
    $array[] = $d["accountName"];
    $array[] = $d["ruleStatement"];
    $array[] = $d["ruleAlertType"];
    $array[] = $d["zoneName"];
    $array[] = $d["readerSerial"];
    $array[] = $d["ruleUpdateTime"];
    $array[] = "<a title='Edit Rule Details' href='".$editLink."' class='btn btn-default'><span class='fa fa-pencil'></span></i><a title='Rule Details' href='".$viewLink."' class='btn btn-default'><span class='fa fa-eye'></span></i>";
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
