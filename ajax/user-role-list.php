
<?php
include("../includes/check_session.php");
include("../includes/connect.php");
include("../includes/functions.php");

$requestData    = $_REQUEST;
$userId         = $_SESSION['user']['id'];
$customColumns  = array();
$columns        = array(
// datatable column index  => database column name
   0 =>'id',
   1 =>'roleName',
   2 =>'roleDescription',
   3 =>'rolePermissionFlag',
   4 =>'roleCreateDate',
   5 =>'roleUpdateDate'
);
// getting total number records without any search
$implodeData = implode(',', $columns);

$query = "SELECT [IMPLODEDATA] ";

  $query .= " FROM role where userID=".$userId."";


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
   if($d["rolePermissionFlag"]==0){
      $emailNotify   = 'No';
   }else{
      $emailNotify   = 'yes';
   }

    $array     = array();
    $editLink  = "add-user-role.php?rolId=".$d['id'];
    $editPermissionLink  = "add-permission.php?permissionId=".$d['id'];
    $array[]   = $requestData['start']+$countVal;
    $countVal++;
    $array[] = $d["roleName"];
    $array[] = $d["roleDescription"];
    $array[] = $emailNotify;
    $array[] = $d["roleCreateDate"];
    $array[] = $d["roleUpdateDate"];

    $array[]  = '<div class="actions">
                  <div class="btn-group">
                      <a class="btn btn-primary btn-sm uppercase sbold" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> Actions
                          <i class="fa fa-angle-down"></i>
                      </a>
                      <ul class="dropdown-menu pull-right btnActionCustom" id="sDrop">
                          <li>
                              <a title="Edit Role" href="'.$editLink.'">Edit Role</a>
                          </li>
                          <li>
                              <a title="Edit Permission" href="'.$editPermissionLink.'">Add/Edit Role Permission</a>
                          </li>
                      </ul>
                  </div>
                </div>';
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
