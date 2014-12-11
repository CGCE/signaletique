<?php
ini_set("display_errors",1);
error_reporting(9999999999);

$folder="../data/";

include "../inc/getIcal.php";

$ical=new myIcal();
$ical->src="https://www.google.com/calendar/ical/3irslqh2efr1vsrmglhkoiucno%40group.calendar.google.com/private-c02bcb39879041413476b9a4e85c6f61/basic.ics";

//$ical->start=strtotime("11/07/14");
//$ical->end=strtotime("11/08/14");
//$ical->maxEntries=3;

$ical->attach=1;
$ical->getInfo();
/*
opendir($folder);
while(false !== ($file = readdir($folder))){
	if(substr($file,0,8)=="calendar"){
		unlink($file);
	}
}
closedir($folder);
*/
$i=1;
foreach($ical->events as $elem){
	$img = "$folder/calendar$i.jpg";
	//file_put_contents($img, file_get_contents($elem["attach"]));
	copy($elem["attach"], $img);
	$i++;
}

echo json_encode($ical->events);
?>