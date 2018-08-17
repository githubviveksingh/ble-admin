<?php
include("../includes/check_session.php");
include("../includes/connect.php");
include("../includes/functions.php");
//include("../includes/check_permission.php");
$pageStart = $_GET['start'];
//$societyId = $_SESSION['user']['society_id'];
$table = <<<EOT
 (
    SELECT A.id, A.auditType,A.module, A.data, A.auditTime, U.username as triggeredName, AC.accountName as accountNames FROM audit A JOIN users U on U.id=A.triggeredBy JOIN account AC on AC.id=A.accountID
 ) temp
EOT;

$primaryKey = 'id';

$columns = array(
   array( 'db' => 'id','dt' => 0 ),
   array( 'db' => 'auditType', 'dt' => 1 ),
   array( 'db' => 'auditType', 'dt' => "auditType" ),
   array( 'db' => 'module',   'dt' => 2 ),
   array( 'db' => 'data', 'dt' => "data" ),
   array( 'db' => 'accountNames', 'dt' => 3),
   array( 'db' => 'triggeredName', 'dt' => 4 ),
   array( 'db' => 'auditTime', 'dt' => 5 )
);

$sql_details = array(
   'user' => Config::read('db.user'),
   'pass' => Config::read('db.password'),
   'db'   => Config::read('db.basename'),
   'host' => Config::read('db.host')
);

require( 'ssp.class.php' );
$json = SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns );
if(count($json['data'])){
   $counter = $pageStart+1;
   foreach($json['data'] as $key => $res){
       $jsonData = json_decode($json["data"][$key]["data"]);
       $json["data"][$key][1] = $AUDITCODES[$json["data"][$key][1]];
       $json['data'][$key][0] = $counter;
       $counter++;
   }
}
echo json_encode($json);
?>
