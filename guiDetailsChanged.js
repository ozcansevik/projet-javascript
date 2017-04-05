/**
*Définition et enregistrement des callbacks de mise à jour des détails de l'item sélectionnée.
*/
myApp.addModule.apply(myApp.gui,["callbacksUpdateDetails",function(){

  /**
  *Génération du code HTML des détails de la musique sélectionnée.
  */
  var getHtmlCodeDetail=function(){
    var htmlCode="<div style=\"position:absolute;top:5%;margin-left:50%;\" "+"<span >"
                +"<p><strong>Titre: </strong>"+myApp.modele.selectedMusique.getProperty('titre')
                +"</p>"
                +"<div style=\"margin-left:5%;\" >"
                +"<button  id=\"boutonModifierMusique\"> Modifier</button><br/><br/>"
                +"<button id=\"boutonSupprimerMusique\"> Supprimer</button><br/>"
                +"</div>";
    htmlCode+="</span>"+"<p>" + myApp.view.musique.getHtmlDevelopped(myApp.modele.selectedMusique) +"</div>";
    return htmlCode;
  };

  /**
  *Redessine les détails d'une musique suite à sa sélection ou sa modification.
  */
  var repaintDetail=function(contextArg){

    $("#modifierMusiqueForm").empty(); //Vider les inputs et les événements JS existant
    $("#ajouterMusiqueForm").empty(); //Vider les inputs et les événements JS existant


    $("#vueDetail").empty(); //Vider les inputs et les événements JS existant

    $("#vueDetail").html(getHtmlCodeDetail()); //Génération du code HTML

    //Recréer le sévénements de clicks sur les boutons "modifier", "supprimer", etc.
    myApp.gui.mediator.publish("musique/detailsRebuilt");
  };

  //Enregistrement du callback de l'événement dédié (m.a.j. des détails)
  myApp.gui.mediator.subscribe("musique/detailsChanged",repaintDetail);
  //Enregistrement du callback de l'événement de mise à jour de la musique
  myApp.gui.mediator.subscribe("musique/changed",repaintDetail);

}()]);
