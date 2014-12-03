<?php
include "data.php";
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Columbia Global Centers | Europe</title>
<link rel='StyleSheet' href='css/jquery-ui.css' type='text/css' media='all'/>
<link rel='StyleSheet' href='css/style.css' type='text/css' media='all'/>
<script type="text/JavaScript" src="js/jquery.js"></script>
<script type="text/JavaScript" src="js/jquery-ui.js"></script>
<script type="text/JavaScript" src="js/jquery.easing.1.3.js"></script>
<script type="text/JavaScript" src="js/jquery.easing.compatibility.js"></script>
<script type="text/JavaScript" src="js/script.js"></script>
</head>


<body>
<div id='all'>
<div id='entryWay'>

<div id='side1' style='display:none;'>
	<img id='logo' src='img/logo-650v.png' alt='Columbia Global Centers | Europe'/>
	<img id='banner' src="img/banner-1000v.png" alt="Columbia Global Centers Banner" /> 
</div> <!-- side1 -->


<div id='content'>

<div id='banner'>
<img id='logo' src='img/logo-900.png' alt='Columbia Global Centers | Europe'/>
<img id='banner' src="img/banner-1000.png" alt="Columbia Global Centers Banner" /> 
</div>

<div id='accordion'>
<?php
echo "<h1 id='h1'>{$tab0[0]}</h1>";
echo "<div>";
echo $colonne1;
echo "<table id='table1'>\n";
foreach($tab1 as $elem){
	echo "<tr class='h2'><td class='col0'>{$elem[0]}</td><td class='col1'>{$elem[1]}</td><td class='col2'>{$elem[2]}</td><td class='col3'>{$elem[3]}</td></tr>\n";
}
echo "</table>\n";	// table1
echo "</div>";
echo "<h1 id='h2'>{$tab0[1]}</h1>\n";
echo "<div>";
echo $colonne1;
echo "<table id='table2'>\n";
foreach($tab2 as $elem){
	echo "<tr class='h2'><td class='col0'>{$elem[0]}</td><td class='col1'>{$elem[1]}</td><td class='col2'>{$elem[2]}</td><td class='col3'>{$elem[3]}</td></tr>\n";
}
echo "</table>\n";	// table2
echo "<img src='content/images/col-sp14-600.jpg' id='img-columbia'/>";
echo "</div>";

echo "<h1 id='h3'>{$tab0[2]}</h1>\n";
echo "<div>";
echo $colonne1;
echo "<table id='table3'>\n";
foreach($tab3 as $elem){
	echo "<tr class='h2'><td class='col0'>{$elem[0]} <span class='subtitle'>{$elem[1]}</span> </td><td class='col1'>{$elem[2]}</td><td class='col2'>{$elem[3]}</td><td class='col3'>{$elem[4]}</td></tr>\n";
}
echo "</table>\n";	// table3
echo "</div>";
echo "</div>";

?>
</div> <!-- content -->
</div> <!-- entryWay -->




<div id='right'>
<img id='image1' src='img/image2.jpg' alt=''/>
<img id='image2' src='img/image3.jpg' alt=''/>
<img id='image3' src='img/image4.jpg' alt=''/>


<div id="slides">
</div>

<div id="events">
</div>


<div id='bottom'>
<div id='date'>
<?php
echo date("l");
echo "<br/>\n";
echo date("F d");
?>
</div> <!-- date -->

<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://active.macromedia.com/flash5/cabs/swflash.cab#version=5,0,0,0" id='clock'>
	<param name="MOVIE" value="clock8.swf">
	<param name="PLAY" value="true">
	<param name="LOOP" value="true">
	<param name="WMODE" value="Transparent">
	<param name="QUALITY" value="high">
	<embed src="img/clock8.swf" id='clockImg' PLAY="true" LOOP="true" WMODE="Transparent" QUALITY="high" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
</object>

<div id='links'>
<img src='img/flashcode.png' alt='flashcode' id='flashcode' />
<div id='url'>
<h2><label>ColumbiaGlobalCentersEurope</label><img src='img/facebook25.png'/></h2>
<h2><label>@ColumbiaGCEuro</label><img src='img/twitter25.png'/></h2>
<h2><label>globalcenters.columbia.edu/paris</label><img src='img/internet.png'/></h2>
</div> <!-- url -->
</div> <!-- links -->
</div> <!-- bottom -->
</div> <!-- Right -->

</div>	<!-- all -->

<script type="text/JavaScript">
//showSlides();
</script>
</body>
</html>
