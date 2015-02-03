<?php
// Update : 2015-02-03

include "data.php";
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Columbia Global Centers | Europe</title>
<link rel='StyleSheet' href='vendor/jquery-ui/css/jquery-ui.css' type='text/css' media='all'/>
<link rel='StyleSheet' href='css/style.css' type='text/css' media='all'/>
<script type="text/JavaScript" src="vendor/jquery.js"></script>
<script type="text/JavaScript" src="vendor/jquery-ui/js/jquery-ui.js"></script>
<script type="text/JavaScript" src="vendor/jquery.easing.1.3.js"></script>
<script type="text/JavaScript" src="vendor/jquery.easing.compatibility.js"></script>
<script type="text/JavaScript" src="js/script.js"></script>
</head>


<body>

<section id='side1'>
	<img id='logo' src='img/logo-650v.png' alt='Columbia Global Centers | Europe'/>
	<div id="banner-div">
		<img id='banner' src="img/banner-1000v.png" alt="Columbia Global Centers Banner" />
	</div>
</section> <!-- side1 -->


<section id='right'>
<section id='accordion'>
<?php
for($i=1;$i<4;$i++){
	echo "<h1 id='h$i'>{$title[$i]}</h1>";
	echo "<div id='div$i' class='background$i'>";
	echo $colonne1;
	echo "<table id='table$i'>\n";
	foreach($tab[$i] as $elem){
		echo "<tr class='h2'><td class='col0'>{$elem['name']}</td><td class='col1'>{$elem['office']}</td><td class='col2'>{$floors[$elem['floor']]}</td><td class='col3'>{$elem['stairs']}</td></tr>\n";
	}
	echo "</table>\n";
	echo "</div>";
}
?>
</section> <!-- accordion -->


<section id='bottom'>

<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://active.macromedia.com/flash5/cabs/swflash.cab#version=5,0,0,0" id='clock'>
	<param name="MOVIE" value="clock8.swf">
	<param name="PLAY" value="true">
	<param name="LOOP" value="true">
	<param name="WMODE" value="Transparent">
	<param name="QUALITY" value="high">
	<embed src="img/clock8.swf" id='clockImg' PLAY="true" LOOP="true" WMODE="Transparent" QUALITY="high" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
</object>

<div id='date'>
<?php
echo date("l");
echo "<br/>\n";
echo date("F d");
?>
</div> <!-- date -->

<div id='url'>
<h2><label>ColumbiaGlobalCentersEurope</label><img src='img/facebook25.png'/></h2>
<h2><label>@ColumbiaGCEuro</label><img src='img/twitter25.png'/></h2>
<h2><label>globalcenters.columbia.edu/paris</label><img src='img/internet.png'/></h2>
</div> <!-- url -->

<div id='flashcode-div'>
<img src='img/flashcode.png' alt='flashcode' id='flashcode' />
</div>

</section> <!-- bottom -->
</section> <!-- right -->


<section id='left'>
</section> <!-- left -->

</body>
</html>