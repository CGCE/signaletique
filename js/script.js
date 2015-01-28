// Update : 2015-01-28

effets=["fold","slide","fade"];

currentImage=0;
myImages={};

$(document).ready(function(){
	// Accordion Left
	var icons={
		header: "ui-icon-circle-arrow-e",
		activeHeader: "ui-icon-circle-arrow-s"
		};

	$("#accordion").accordion();
	
	// position de #left 
	var h=(1080-$("#left").height())/2;
	$("#left").css("top",h);

	// Taille est position de #right
	$("#right").height($("#left").height()-40);		//40 = padding top+bottom
	$("#right").css("top",h);
	$("#right").css("right",h);
	
	// Position de side1 (logo à gauche)
	$("#side1").css("left",h);


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
		marginTop=($("#right").height()-height)/2;
	}

	// Insertion de l'image dans le code html
	var html="<img src='http://intranet.reidhall.com/Affichage/upload/thumbs/690/"+e.file+"' id='myImage' ";
	html+="style='display:none; width:690px; margin: "+marginTop+"px 0 0 5px;'/>";
	
	$("#right").html(html);

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