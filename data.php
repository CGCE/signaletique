<?php
// Update : 2015-02-03

include "inc/db.php";

$floors=array();
$floors[0]="RDC / 1<sup>st</sup>";
$floors[1]="1<sup>er</sup> / 2<sup>nd</sup>";
$floors[2]="2<sup>e</sup> / 3<sup>rd</sup>";
$floors[3]="3<sup>e</sup> / 4<sup>th</sup>";

$db=new db();
$db->select("bureaux");

$title=array();
$tab=array();
if($db->result){
	foreach($db->result as $elem){
		if(substr($elem['tab'],0,5)=="title"){
			$title[substr($elem['tab'],-1)]=$elem['name'];
        }
        elseif(substr($elem['tab'],0,3)=="tab"){
        	$tab[substr($elem['tab'],-1)][]=$elem;
        }
    }
}

$colonne1=<<<EOD
<tr><td>
</td>
<td class='col1'><span class='subtitle'>Bureau<br/>Office</span></td>
<td class='col2'><span class='subtitle'>Etage<br/>Floor</span></td>
<td class='col3'><span class='subtitle'>Escalier<br/>Stairs</span></td>
</tr>
EOD;
?>


