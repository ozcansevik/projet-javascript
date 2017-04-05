/**
*Méthode d'initialisation de sévénements utilisateurs JavaScript.
*Enregistrement des gestionnaires de ces événements via jQuery.
*/

myApp.addModule.apply(myApp.gui,["initJQueryEventsMusique",function(){

  /////////////////////////////////////////////////////////
  //click sur le bouton "Ajouter" faisant sortir le formulaire

  /**
  *Gestionnaire click sur le bouton faisant sortir le formulaire
  */
  var clickBoutonSaisieMusique=function(event){
    //publication auprès du médiator
    myApp.gui.mediator.publish("musique/saisie",{
    musique:myApp.modele.selectedMusique
    });
  };

  //Enregistrement du Handler du click pour modifier les détails de l'item sélectionné via jQuery
  $("#boutonAjouterMusique").on("click",clickBoutonSaisieMusique);

  /////////////////////////////////////////////////////////
  //click sur le bouton "Modifier" faisant sortir le formulaire

  /**
  *Gestionnaire click sur le bouton faisant sortir leformulaire
  */
  var clickBoutonModifierMusique=function(event){

    //publicationauprèsdumédiator
    myApp.gui.mediator.publish("musique/edit",{
      musique:myApp.modele.selectedMusique
    });
  };

  /////////////////////////////////////////////////////////
  //click sur le bouton "Supprimer" faisant sortir le formulaire

  /**
  *Gestionnaire click sur le bouton faisant sortir leformulaire
  */
  var clickBoutonSupprimerMusique=function(event){
    //publicationauprèsdumédiator
    myApp.gui.mediator.publish("musique/delete",{
      musique:myApp.modele.selectedMusique
    });
  };


  ////////////////////////////////////////////////////////
  //Gestionnaire de submit formulaire de modification de musique.

  /**
  *Gestionnaire de l'événement submit du formulaire.
  */
  var formHandlerModifMusique=function(event){

    //Éviter d'appeler l'action par défaut() scriptPHP, etc...)
    //du formulaire lors du submit
    event.preventDefault();

    //publication au près du médiator
    myApp.gui.mediator.publish("musique/update",{
      musique:myApp.modele.selectedMusique
    });
  }//fin du gestionnaire formHandlerModif()

  //Enregistrement d uHandler du submit du formulaire via jQuery
  $("#modifierMusiqueForm").on("submit",formHandlerModifMusique);


  ///////////////////////////////////////////////////////
  //Gestionnaire de submit formulaire d'ajout de musique.

  /**
  *Gestionnaire de l'événement submit du formulaire.
  */
  var formHandlerAjoutMusique=function(event){

    //Éviter d'appeler l'action par défaut() scriptPHP, etc...)
    //du formulaire lors du submit
    event.preventDefault();

    //publication au près du médiator
    myApp.gui.mediator.publish("musique/create",{
      musique:myApp.modele.selectedMusique
    });
  }//fin du gestionnaire formHandlerModif()

  //Enregistrement du Handler du submit du formulaire via jQuery
  $("#ajouterMusiqueForm").on("submit",formHandlerAjoutMusique);


  /**
  *Enregistre les événements de clicks sur les boutons "Modifier" et "Supprimer"
  *de la musique sélectionnée.
  *Cette fonction doit être invoquée en cas de sélection d'une nouvelle musique
  *(reconstruction du code HTML du panneau des détails)
  */
  var registerButtonClickEvents=function(){
    //Enregistrement du Handler du click pour modifier les détails de l'item sélectionné via jQuery
    $("#boutonModifierMusique").on("click",clickBoutonModifierMusique);
    //Enregistrement du Handler du click pour suprimer les détails de l'item sélectionné via jQuery
    $("#boutonSupprimerMusique").on("click",clickBoutonSupprimerMusique);
  }

  /////////////////////////////////////////////////////////
  //Clicks sur les éléments de la liste d'items

  /**Méthode qui permet de créer un gestionnaire d'événement de click
  *sur chaque nom de musiques(sélection des détails)
  *Ces gestionnaires publient l'événnement "nouvelle musique sélectionnée"
  auprès du médiator.
  *@param{int}index indice de l'item pour lequel on enregistre l'événement.
  */
  var registerHelperSelectDetails=function(index){
    return function(){
    myApp.gui.mediator.publish("musique/selectDetails",
    {
      musique:myApp.modele.musiques[index]
    });
    };
  };

  /**
  *Enregistre les événements javascript de click sur les éléments de la liste
  *(noms des musiques).
  *Cette méthode doit être appelée lors de la regénération du code de la liste
  */
  var registerListeMusiquesClicks=function(contextArgs){
    for(var i=0;i<myApp.modele.musiques.length;++i){
      $("#master_"+myApp.modele.musiques[i].getProperty('id')).on("click",registerHelperSelectDetails(i));
    }
  };

  //Enregistrer les clicks lors de l'initialisation
  registerButtonClickEvents();
  registerListeMusiquesClicks();

  //Permet à la méthode qui regénère toute la liste des items
  //de recréer, via le médiator, les événements "click" surlesitems.
  myApp.gui.mediator.subscribe("musique/htmlListeItemRebuilt",registerListeMusiquesClicks);

  //Permet à la méthode qui regénère le panneau des détails de recréer,
  //via le médiator, les événements "click" sur les boutons dans le panneau des détails.
  myApp.gui.mediator.subscribe("musique/detailsRebuilt",registerButtonClickEvents);
}]);
