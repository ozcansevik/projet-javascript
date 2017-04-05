/**
*Définition et enregistrement des callbacks appelés à gérer le clic sur le
bouton "modifier" la musique sélectionnée.
*/
myApp.addModule.apply(myApp.gui,["callbacksClickModifierMusique",function(){

  /**
  *Génération du code HTML du formulaire de modification de la musique sélectionnée.
  */

  var getHtmlFormInputs=function(){
  return "<span style=\"width:360px;display:inline−block;vertical−align:top;\">"+
  myApp.gui.getHtmlFormInputs(myApp.modele.selectedMusique,"modifierMusiqueForm")
  +"<label></label> </br> <input type=\"submit\"value=\"Valider\"></input>"+"</span>";
  }

  /**
  *Callback d'Affichage du formulaire dans l'élément d'ID "modifierMusiqueForm"
  */
  var repaintFormInputs=function(contextArg){
  $("#modifierMusiqueForm").empty(); //Vider les inputs et les événements JS existant
  $("#ajouterMusiqueForm").empty(); //Vider les inputs et les événements JS existant

  $("#modifierMusiqueForm").append(getHtmlFormInputs()); //ajouter les nouveaux inputs
  };

  //Enregistrement du callback
  myApp.gui.mediator.subscribe("musique/edit",repaintFormInputs);

}()]);
