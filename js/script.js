var effets = new Array();
effets[0]="bounce";
effets[1]="drop";
effets[2]="explode";
effets[3]="fold";
effets[4]="shake";
effets[5]="clip";
effets[6]="slide";

/*
slides[i++] = {
content : '<div id="slideContent" style="margin:0 0 0 30px;"><h1 class="title-right">Festival des &eacute;crivains du monde 2013</h1><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="800px" height="600px" id="dewslider4" align="middle" ><param name="allowScriptAccess" value="sameDomain" /><param name="movie" value="dewslider.swf?xml=dewslider.xml" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><embed src="dewslider.swf?xml=dewslider.xml" quality="high" bgcolor="#ffffff" width="800px" height="600px" name="dewslider4" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object></div>',
	time : 168000
};
*/

var currentEvent=0;
var currentMedia=0;
var currentImage=0;

myEvents={};
myMedias={};
myImages={};

$(document).ready(function(){
	// Accordion Left
	var icons={
		header: "ui-icon-circle-arrow-e",
		activeHeader: "ui-icon-circle-arrow-s"
		};

	$("#accordion").accordion();
	var h=1;
	var accordion=setInterval(function(){ 
		h++;
		if(h==4){h=1;}
		$("#h"+h).click();
		}, 20000);

	var marge=(1080-$("#entryWay").height())/2;
	$("#entryWay").css("margin-top",marge);

	// Medias and Events
	$( "#slides" ).hide();
	$( "#events" ).hide();

/*	getEvents();
	getMedias();
	startEvents=setTimeout(function(){runEvents()},5000);
	startMedias=setTimeout(function(){runMedias()},5000);
*/
	getImages();
	startImages=setTimeout(function(){runImages()},1000);
});


function getEvents(){
  $.ajax({
    url: "ajax/getContent.php",
    type: "get",
    data: "table=events",
    success: function(result){
      window.myEvents=JSON.parse(result);
    },
   });
}


function getMedias(){
  $.ajax({
    url: "ajax/getContent.php",
    type: "get",
    data: "table=medias",
    success: function(result){
      window.myMedias=JSON.parse(result);
    },
   });
}

function getImages(){
  $.ajax({
    url: "ajax/getContent.php",
    type: "get",
    data: "table=images",
    success: function(result){
      window.myImages=JSON.parse(result);
    },
   });
}

function runEvents(){

	getEvents();

	clearTimeout(timeOutEvents);
	if(currentEvent>=myEvents.length){currentEvent=0;}
	var e=myEvents[currentEvent];
	var d=new Date();
	var j=d.getDate();
	j=j<10?"0"+j:j;
	var m=d.getMonth()+1;
	m=m<10?"0"+m:m;
	var today=d.getFullYear()+"-"+m+"-"+j;

	var title="Upcoming Events";
	if(e.type=="Information"){
		title="";
	}
	if(e.type=="Concert"){
		title="Concert";
	}
	if(e.type=="Fermeture"){
		title="Fermeture de Reid Hall";
	}
	if(e.eventStart<=today && e.eventStart!="0000-00-00" && e.type!="Information" && e.type!="Fermeture"){
		title="Today";
	}
	var randomnumber=Math.floor(Math.random()*7);
	var selectedEffect = effets[randomnumber];
	var options = {};
	if ( selectedEffect === "scale" ) {
		options = { percent: 100 };
	} else if ( selectedEffect === "size" ) {
		options = { to: { width: 800, height: 600 } };
	}
	$("#events").html("<h2>"+title+"</h2><div id='eventContent'><h2>"+e.content+"</h2><h3>"+e.datetime+"<br/>"+e.place+"</h3></div>");
	$("#events").show(selectedEffect,options, 1500);
	var timeOutEvents=setTimeout(function(){
		var randomnumber=Math.floor(Math.random()*7);
		var selectedEffect = effets[randomnumber];
		var options = {};
		if ( selectedEffect === "scale" ) {
			options = { percent: 0 };
		} else if ( selectedEffect === "size" ) {
			options = { to: { width: 200, height: 150 } };
		}
		$( "#events" ).hide(selectedEffect, options, 1500, runEvents);
		},
		10000);
	currentEvent++;

}

function runMedias(){

	getMedias();

	clearTimeout(timeOutMedias);
	if(currentMedia>=myMedias.length){currentMedia=0;}
	var e=myMedias[currentMedia];
	var d=new Date();
	var j=d.getDate();
	j=j<10?"0"+j:j;
	var m=d.getMonth()+1;
	m=m<10?"0"+m:m;
	var today=d.getFullYear()+"-"+m+"-"+j;

	var title=e.title;
	if(e.eventStart<=today && e.eventStart!="0000-00-00"){
		title="Today : "+title;
	}
	var randomnumber=Math.floor(Math.random()*7);
	var selectedEffect = effets[randomnumber];
	var options = {};
	if ( selectedEffect === "scale" ) {
		options = { percent: 100 };
	} else if ( selectedEffect === "size" ) {
		options = { to: { width: 800, height: 600 } };
	}
	
	var width=e.ratio=="4/3"?800:860;
	var height=e.ratio=="4/3"?600:484;
	var marginLeft=e.ratio=="4/3"?30:0;
	var marginTop=e.ratio=="4/3"?0:55;
	
	var html="<div id='slideContent' style='margin:"+marginTop+"px 0 0 "+marginLeft+"px;'>";
	html+="<h1 class='title-right'>"+title+"</h1>";
	if(e.type=="Video Youtube"){
		html+="<iframe allowfullscreen='' frameborder='0' style='height:"+height+"px;width:"+width+"px;background:#EEEEEE;' src='//www.youtube.com/embed/"+e.src+"?rel=0&autoplay=1&controls=0'></iframe>";
	}
	html+="</div>";
	
	$("#slides").html(html);

	timeMedia=(e.time*1000)+4;
	
	$("#slides").show(selectedEffect,options, 1500);
	var timeOutMedias=setTimeout(function(){
		var randomnumber=Math.floor(Math.random()*7);
		var selectedEffect = effets[randomnumber];
		var options = {};
		if ( selectedEffect === "scale" ) {
			options = { percent: 0 };
		} else if ( selectedEffect === "size" ) {
			options = { to: { width: 200, height: 150 } };
		}
		$("#slides").hide(selectedEffect, options, 1500, runMedias);
		},
		timeMedia);
	currentMedia++;

}

function runImages(){

	getImages();
	clearTimeout(timeOutImages);
	if(currentImage>=myImages.length){currentImage=0;}
	var e=myImages[currentImage];

	var randomnumber=Math.floor(Math.random()*7);
	var selectedEffect = effets[randomnumber];
	var options = {};
	if ( selectedEffect === "scale" ) {
		options = { percent: 100 };
	} else if ( selectedEffect === "size" ) {
		options = { to: { width: 800, height: 600 } };
	}
	
	var width=e.ratio=="4/3"?800:860;
	var height=e.ratio=="4/3"?600:484;
	var marginLeft=e.ratio=="4/3"?30:0;
	var marginTop=e.ratio=="4/3"?0:55;
	marginTop=0;
	marginLeft=0;
	
	var html="<div id='slideContent' style='margin:"+marginTop+"px 0 0 "+marginLeft+"px;'>";
	html+="<img src='http://intranet.reidhall.com/Affichage/upload/thumbs/500/"+e.file+"'/>";
	html+="</div>";
	
	$("#slides").html(html);

	timeImage=(e.time*1000)+4;
	
	$("#slides").show(selectedEffect,options, 1500);
	var timeOutImages=setTimeout(function(){
		var randomnumber=Math.floor(Math.random()*7);
		var selectedEffect = effets[randomnumber];
		var options = {};
		if ( selectedEffect === "scale" ) {
			options = { percent: 0 };
		} else if ( selectedEffect === "size" ) {
			options = { to: { width: 200, height: 150 } };
		}
		$("#slides").hide(selectedEffect, options, 1500, runImages);
		},
		timeImage);
	currentImage++;

}