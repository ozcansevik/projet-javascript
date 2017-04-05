/**
*Définition et enregistrement du callback réagisssant à la validation(submit)
*du formulaire d'Ajout d'une musique.
*/
myApp.addModule.apply(myApp.gui,["callbacksValidateAjouterForm",function(){

  /**
  *Modifie le modèle à partir des données saisies dans le formulaire
  */
  var updateModel=function(){


  var propertyName,
  inputId;

  //Ajout d'une musique vide dans la collection
  var nouvelleMusique = myApp.metier.musique.createInstance(null);
  myApp.modele.musiques.push(nouvelleMusique);

  //Pour chaque propriété(chaque input du formulaire)
  for(var j=0 ; j<myApp.metier.musique.getPropertyList().length ; ++j){
    propertyName=myApp.metier.musique.getPropertyList()[j];
    if(propertyName!="id"){
      //calcul de l'ID de l'input
      inputId = myApp.gui.getInputId({
      propertyName : propertyName,
      formId : "ajouterMusiqueForm"
    });

    //Modification de la propriété de la musique
    //avec la valeur saisie dans l'input.
    nouvelleMusique.setProperty(propertyName,
    document.getElementById(inputId).value);

    }
  }

  //Provoquer la sélection de la nouvelle musique (et par suite la mise à jour de la vue)
  myApp.gui.mediator.publish("musique/created",{
    musique:nouvelleMusique
  });
  };

  //Enregistrement du callback de l'événement de validation du formulaire
  myApp.gui.mediator.subscribe("musique/create",updateModel);

}()]);
