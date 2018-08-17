<?php
include("../includes/check_session.php");
include("../includes/connect.php");
include("../includes/functions.php");
//include("../includes/check_permission.php");
$pageStart = $_GET['start'];
$table = <<<EOT
 ( 

   SELECT A.*, count(T.id) as tags FROM account AS A LEFT JOIN tag AS T ON A.id=T.accountID GROUP BY A.id 
 ) temp
EOT;

$primaryKey = 'id';

$columns = array(
   array( 'db' => 'id','dt' => 0),
   array( 'db' => 'accountName',   'dt' => 2),
   array( 'db' => 'accountContact', 'dt' => 3),
   array( 'db' => 'accountPhone', 'dt' => 4),
   array( 'db' => 'accountEmail', 'dt' => 5),
   array( 'db' => 'lastLoginTime', 'dt' => 6)
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
   $i=0;
   foreach($json['data'] as $key => $res){
      if($i==0){
         $loginAction="<input type='radio' class='checkItem' name='login' checked='checked' style='margin-left: 10px;' value='".$res[0]."'>";
      }else{
         $loginAction="<input type='radio' class='checkItem' name='login' style='margin-left: 10px;' value='".$res[0]."'>";
      }

      $editLink = "add-account.php?accountId=".$res[0];
      $viewLink = "view-account.php?accountId=".$res[0];
      $json['data'][$key][7] = "<a title='Edit Account Details' href='".$editLink."' class='btn btn-default'><span class='fa fa-pencil'></span></i></a> <a title='Edit Account Details' href='".$viewLink."' class='btn btn-default'><span class='fa fa-eye'></span></i></a>";
      $json['data'][$key][1] = $counter;
      $json['data'][$key][0] = $loginAction;
      $counter++;
      $i++;
   }
}
echo json_encode($json);
?>
