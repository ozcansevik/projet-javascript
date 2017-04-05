/**
*Définition et abonnement des callbacks de mise à jour de la
*liste clickable des items, soit lors de la modification
*du modèle, soit lors du changement de musique sélectionnée.
*/
myApp.addModule.apply(myApp.gui, ["callbacksMainListUpdate",function(){

  /**
  *Active ou désactive le surlignage (styleCSS) d'un item de la liste.
  */
  var setHighlighted=function(musique,highlighted){
    if(highlighted){
      //Mettre le style surligné sur l'item de la liste
      $("#master_"+musique.getProperty('id')).css("background−color","#333")
      .css("color","blue")
      .css("padding","2px");
    }
    else{
      //Remettre le style normal sur l'item de la liste
      $("#master_"+musique.getProperty('id')).css("background−color","#eee")
      .css("color","#333")
      .css("padding","2px");
    }
  }

  /**
  *Génération du code HTML de la liste de musiques
  */
  var getHtmlCodeListeMusiques=function(){
    var htmlCode="";

    for(i=0;i<myApp.modele.musiques.length;++i){
      htmlCode+="<p style=\"background-color:#eee;max-width:300px;border−radius:4px;\" id=\"master_" +myApp.modele.musiques[i].getProperty('id')+"\">"+
              "<strong>Titre: </strong>"+myApp.modele.musiques[i].getProperty('titre')+"</p>";
    }

    return htmlCode;
  };

  /**
  *Raffraichissement (ou affichage) de toute la vue.
  */
  var repaintVue=function(contextArg){

    $("#listeMusiques").empty(); //Vider la liste et ses événements
    $("#listeMusiques").html(getHtmlCodeListeMusiques()); //afficher



    //Appliquer le style par défaut sur tous les items
    for(var i=0;i<myApp.modele.musiques.length;++i){
      setHighlighted(myApp.modele.musiques[i],false);
    }
    //Surligner l'item sélectionné
    setHighlighted(myApp.modele.selectedMusique,true);

    //Recréer les événements de clicks sur les items de la liste
    myApp.gui.mediator.publish("musique/htmlListeItemRebuilt");
  };

  /**
  *Changer l'item sélectionné en réaction à unclick.
  */
  var selectMusique=function(contextArg){
    //Supprimer le surlignage de l'ancienne musique sélectionnée
    setHighlighted(myApp.modele.selectedMusique,false);

    //Changer l'item sélectionné
    myApp.modele.selectedMusique=contextArg.musique;

    //Mettre le style surligné sur l'item sélectionné de la liste
    setHighlighted(myApp.modele.selectedMusique,true);

    //Provoquer la mise à jour du panneau des détails
    myApp.gui.mediator.publish("musique/detailsChanged",{
      musique:myApp.modele.selectedMusique
    });
  };

  /**
  *Changer l'item sélectionné suite à création d'une musique et mise à jour
  delavue.
  *@param{Object}contextArgargumentindiquantlanouvellemusiquesé
  lectionnée.
  *@param{musique}contextArg.musiquenouvellemusiquesélectionnée.
  */
  var selectMusiqueAnRepaint=function(contextArg){
    selectMusique(contextArg);
    repaintVue();
  }

  //Enregistrement du callback de modification de la musique
  myApp.gui.mediator.subscribe("musique/changed",repaintVue);
  //Enregistrement du callback de création de la musique
  myApp.gui.mediator.subscribe("musique/created",selectMusiqueAnRepaint);
  //Enregistrement du callback de sélection d'une nouvelle musique.
  myApp.gui.mediator.subscribe("musique/selectDetails",selectMusique);
}()]);
