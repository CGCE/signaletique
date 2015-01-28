// Update : 2015-01-28

effets=["fold","slide","fade"];

currentImage=0;
myImages={};

$(document).ready(function(){
	// Accordion right
	var icons={
		header: "ui-icon-circle-arrow-e",
		activeHeader: "ui-icon-circle-arrow-s"
		};

	$("#accordion").accordion();
	
	// position de #right 
	var h=(1080-$("#right").height())/2;
	$("#right").css("top",h);

	// Taille est position de #left
	$("#left").height($("#right").height()-43);		//43 = padding top+bottom 
	$("#left").css("top",h);
	
	// Taille est position de #banner
	$("#banner").height($("#right").height());
	$("#banner-div").css("top",h);
	$("#logo").css("bottom",$("#banner-div").height()-h);

	// Change de Tab toutes les 20 secondes	
	var h=1;
	var accordion=setInterval(function(){ 
		h++;
		if(h==4){h=1;}
		$("#h"+h).click();
		}, 20000);
		
	getImages();
	startImages=setTimeout(function(){runImages()},1000);
});


// Récuperation des images depuis la base de données
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


// Affichage des images
function runImages(){

	// Mise à jour du tableau myImages
	getImages();
	clearTimeout(timeOutImages);
	
	// Selection de l'image courante
	if(currentImage>=myImages.length){currentImage=0;}
	var e=myImages[currentImage];

	// Positionnement de l'image
	var marginTop=5;
	var height=980;
	if(e.ratio){
		var height=690/e.ratio;
		marginTop=($("#left").height()-height)/2;
	}

	// Insertion de l'image dans le code html
	var html="<img src='http://intranet.reidhall.com/Affichage/upload/thumbs/690/"+e.file+"' id='myImage' ";
	html+="style='display:none; width:690px; margin: "+marginTop+"px 0 0 5px;'/>";
	
	$("#left").html(html);

	// temps d'ffichage de l'image
	timeImage=(e.time*1000)+3;

	// Effet aléatoire pour l'affichage et la suppression de l'image
	var randomnumber=Math.floor(Math.random()*effets.length);
	var selectedEffect = effets[randomnumber];
	var options = {};

	// Affichage de l'image avec animation	
	var showImage=setTimeout(function(){
	  $("#myImage").show(selectedEffect,options, 1500);
	  }, 1000);

	// Suppression de l'image et affichage de la prochaine en relançant la fonction courante (runImages)	  
    var timeOutImages=setTimeout(function(){
		$("#myImage").hide(selectedEffect, options, 1500, runImages);
		},
		timeImage);
	currentImage++;
}