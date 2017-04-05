
var Musique = function(mus){
	
	var checkMusique = function(mus){
		if(typeof mus.titre !== "string" || typeof mus.artiste !=="string" || typeof mus.avisFav !== "string"){
			throw {
				name: "IllegalArgumentExpression",
				message : "Arguments invalides"
			 }
		 }
	 };
	 
	 checkMusique(mus);
	 this.mus = mus;
	 
	 this.getHtml = function(){
		 var htmlCode = "titre " + this.mus.titre + " de : " + this.mus.artiste + ", avis favorables : " + this.mus.avisFav + "<br/>";
		 return htmlCode;
	 };
 }
 
