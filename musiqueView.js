myApp.addModule("view",{musique: {}});

/**
*Méthode d egénération de code HTML pour une instance de musique.
*/
myApp.addModule.apply(myApp.view.musique,["getHtmlDevelopped",function(musique){
  var  htmlCode="";

  var  moduleMusique=myApp.metier.musique;

  htmlCode+="<span>"+moduleMusique.getLabelText('titre')+ " : " + "</span>"+
  musique.getProperty('titre')+",<br/><br/>";

  htmlCode+="<span>"+moduleMusique.getLabelText('artiste')+ " : " + "</span>"+
  musique.getProperty('artiste')+",<br/><br/>";

  htmlCode+="<span>"+moduleMusique.getLabelText('avisFav')+ " : " + "</span>"+
  musique.getProperty('avisFav')+",<br/><br/>";


  if(musique.hasError()){
  var errorList=musique.getErrorList();

  htmlCode+="<strong> Certains champs ont une erreur</strong><br/>";
  for(var i=0;i<errorList.length;i++){
    if(i>0){
      htmlCode+="</br>";
    }
    var errorMessage = musique.getErrorMessage(errorList[i]);
    htmlCode+= "<strong>" + errorList[i] +"</strong>" + " : " + errorMessage ;
  }
  }

  return htmlCode;
}]);

/**
*Méthode d egénération de code HTML pour une instance de musique.
*/
  myApp.addModule.apply(myApp.view.musique,["getHtmlCompact",function(musique){
  var htmlCode="";

  if(musique.getProperty('titre')){
  htmlCode+=musique.getProperty('titre')+",";
  }

  htmlCode+=musique.getProperty('artiste')+""+
  musique.getProperty('avisFav');
  return htmlCode;
}]);
