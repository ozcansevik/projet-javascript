/**
*Définition et enregistrement des callbacks appelés à gérer le clic sur le
bouton "ajouter"
*/
myApp.addModule.apply(myApp.gui,["callbacksClickAjouter",function(){


  var getHtmlFormInputs=function(){
    return "<span style=\"width:360px;display:inline−block;vertical−align:top;\">"+
    "<strong style=\"width:360px;display:inline−block;\">Saisie d'une nouvelle musique </strong>"+ "</br>" +
    myApp.gui.getHtmlFormInputs(myApp.metier.musique.createInstance(null),"ajouterMusiqueForm")+
    "<label></label> </br> <input type=\"submit\"value=\"Valider\"></input>"+
    "</span>";
  }

  /**
  *Callback d'Affichage du formulaire dans l'élément d'ID "mainForm"
  */

  var repaintFormInputs=function(contextArg){
  $("#modifierMusiqueForm").empty(); //Vider les inputs et les événements JS existant
  $("#ajouterMusiqueForm").empty(); //Vider les inputs et les événements JS existant


  $("#ajouterMusiqueForm").append(getHtmlFormInputs()); //ajouter les nouveaux inputs
  };

  //Enregistrement du callback
  myApp.gui.mediator.subscribe("musique/saisie",repaintFormInputs);

}()]);
