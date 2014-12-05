<?php
ini_set("display_errors",1);
error_reporting(9999999);

include "../inc/getIcal.php";

$ical=new myIcal();
$ical->src="https://www.google.com/calendar/ical/3irslqh2efr1vsrmglhkoiucno%40group.calendar.google.com/private-c02bcb39879041413476b9a4e85c6f61/basic.ics";
//$ical->start=strtotime("11/07/14");
//$ical->end=strtotime("11/08/14");
//$ical->maxEntries=3;
$ical->attach=1;
$ical->getInfo();
//var_dump($ical->events);

/*
foreach($ical->events as $elem){
	var_dump($elem);
	echo "<br><br>";
}
*/

echo json_encode($ical->events);
?>