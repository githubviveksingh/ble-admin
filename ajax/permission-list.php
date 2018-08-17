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
   0 =>'P.id',
   1 =>'R.roleName',
   2 =>'P.createdOn',
   3 =>'P.updatedOn'
);
// getting total number records without any search
$implodeData = implode(',', $columns);

$query = "SELECT [IMPLODEDATA] ";
if($loginUserId==1){
  $query .= " FROM permission P  LEFT JOIN role R on R.id=P.roleID where R.userID=".$loginUserId."";
}else{
  $query .= " FROM permission P  LEFT JOIN role R on R.id=P.roleID where P.roleId!=1 and R.userID=".$loginUserId."";
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
   
    $array     = array();
    $editLink  = "add-permission.php?permissionId=".$d['id'];
    $array[]   = $requestData['start']+$countVal;
    $countVal++;
    $array[] = $d["roleName"];
    $array[] = $d["createdOn"];
    $array[] = $d["updatedOn"];
    $array[] = "<a title='Edit User Permission' href='".$editLink."' class='btn btn-default'><span class='fa fa-pencil'></span></i>";
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
