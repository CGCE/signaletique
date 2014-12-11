var effects = ["bounce","drop","explode","fold","shake","clip","slide"];
var effectsCalendar = ["clip","slide"];

var currentEvent=0;
var currentMedia=0;
var currentCalendar=0;

myEvents={};
myMedias={};
myCalendar={};


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

	
	getCalendar();
//	getEvents();
//	getMedias();
	
//	startCalendar=setTimeout(function(){runCalendar()},1000);
//	startEvents=setTimeout(function(){runEvents()},5000);
//	startMedias=setTimeout(function(){runMedias()},5000);
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


function getCalendar(){
  $.ajax({
    url: "ajax/getCalendar.php",
    dataType: "json",
    success: function(result){
    	alert(result);
      window.myCalendar=result;
    },
    error: function(result){
    	alert(result.responseText);
    	alert("stop");
    }
   });
   
	//clearTimeout(timeOutGetCalendar);
//	var timeOutGetCalendar=setTimeout(function(){getCalendar();},300000);
}

function getEffect(effectsTable,width,height){
	if(width==undefined){
		width=800;
	}
	if(height==undefined){
		height=600;
	}
	
	var randomnumber=Math.floor(Math.random()*effectsTable.length);
	var selectedEffect = effectsTable[randomnumber];
	var options = {};
	if ( selectedEffect === "scale" ) {
		options = { percent: 100 };
	} else if ( selectedEffect === "size" ) {
		options = { to: { width: width, height: height } };
	}
	return {name:selectedEffect, options: options};
}

function runCalendar(){
	//getCalendar();
	
	if(currentCalendar>=myCalendar.length){currentCalendar=0;}
	
	// Récupération du lien vers l'image 
	var src=window.myCalendar[currentCalendar]["attach"];
	var summary=window.myCalendar[currentCalendar]["summary"];
	var debug="<span class='debug'>"+summary+"<br/>"+src+"<br/></span>";
	// Redimensionne l'image : par défaut, l'image est calée à 400px de haut par google, 
	// paramètre =s400 remplacé par =s980 pour avoir 980px de haut
	src=src.replace("=s400","=s980");
	var html=debug+"<img src='"+src+"' id='calendar_img'/>";
	$("#slides").html(html);
	var width=$("#calendar_img").prop("width");
	var height=$("#calendar_img").prop("height");
	var ratio=width/height;
	
	clearTimeout(timeOutCalendar);
	timeCalendar=30000;
	
	var effect=getEffect(effectsCalendar);
	$("#slides").show(effect.name,effect.options, 1500);
	var timeOutCalendar=setTimeout(function(){
		var effect=getEffect(effectsCalendar);
		$("#slides").hide(effect.name,effect.options, 1500, runCalendar);
		},
		timeCalendar);
	currentCalendar++;

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

	var effect=getEffect(effects,200,150);
	$("#events").html("<h2>"+title+"</h2><div id='eventContent'><h2>"+e.content+"</h2><h3>"+e.datetime+"<br/>"+e.place+"</h3></div>");
	$("#events").show(effect.name,effect.options, 1500);
	var timeOutEvents=setTimeout(function(){
		var effect=getEffect(effects,200,150);
		$( "#events" ).hide(effect.name,effect.options, 1500, runEvents);
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
	
	var effect=getEffect(effects,200,150);
	
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
	
	$("#slides").show(effect.name,effect.options, 1500);
	var timeOutMedias=setTimeout(function(){
		var effect=getEffect(effects,200,150);
		$("#slides").hide(effect.name,effect.options, 1500, runMedias);
		},
		timeMedia);
	currentMedia++;

}