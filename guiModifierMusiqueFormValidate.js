/**
*Définition et enregistrement du callback réagisssant à la validation (submit)
*du formulaire de modification d'une musique.
*/
myApp.addModule.apply(myApp.gui,["callbacksValidateModifierForm",function(){
//Formulairedemodificationd'unemusique



/**
*Modifie le modèle à partir des données saisies dans le formulaire
*/
var updateModel=function(){

  //1) Mise à jour des données du modèle
  //à partir des valeurs des inputs du formulaire
  var propertyName,
      inputId;
  //Pour chaque propriété (chaque input du formulaire)
  for(var j=0;j<myApp.metier.musique.getPropertyList().length;++j){
    propertyName = myApp.metier.musique.getPropertyList()[j];
    if(propertyName!="id"){
      //calcul de l'ID de l'input
      inputId = myApp.gui.getInputId({
              propertyName : propertyName,
              formId : "modifierMusiqueForm"
              });
      //Modification de la propriété de la musique
      //avec la valeur saisie dans l'input.
      myApp.modele.selectedMusique.setProperty(propertyName,
                                              document.getElementById(inputId).value
                                              );
    }
  }
  //Provoquer la mise à jour des éléments de la vue observant la musique
  myApp.gui.mediator.publish("musique/changed",{
                              musique:null
                              });
  };

  //Enregistrement du callback de l'événement de validation du formulaire
  myApp.gui.mediator.subscribe("musique/update",updateModel);

}()]);
