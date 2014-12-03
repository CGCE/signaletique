<?php
include "../inc/db.php";
$date=date("Y-m-d");
$db=new db();
$db->select($_GET['table'],"start<='$date' AND (end >='$date' or end='0000-00-00') ORDER BY eventStart","*");
$result=array();
if($db->result){
	$result=$db->result;
}
echo json_encode($result);
?>