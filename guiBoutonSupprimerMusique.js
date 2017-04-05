myApp.addModule.apply(myApp.gui,["callbacksClickSupprimer",function(){

  /**
  *Callback qui supprime la Musique passée dans l'objet passé en argument.
      contextArg : reference de la musique
  */
  var deleteMusique=function(contextArg){
    //Indice dans le tableau de la Musique à supprimer.
    var indexSelectedMusique=myApp.modele.musiques.indexOf(contextArg.
    Musique);

    //Suppression de la Musique dans le modèle
    myApp.modele.musiques.splice(indexSelectedMusique,1);
    //Musique sélectionnée par défaut
    myApp.modele.selectedMusique=myApp.modele.musiques[0];

    //Provoquer la mise à jour de la vue:
    myApp.gui.mediator.publish("musique/changed",{
    Musique:myApp.modele.selectedMusique
    });
  }

  //Enregistrement du callback
  myApp.gui.mediator.subscribe("musique/delete",deleteMusique);

}()]);
