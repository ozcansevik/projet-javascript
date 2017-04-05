myApp.addModule.apply(myApp.gui,["mediator",function(){

  var m_subscriptionLists;
  var init=function(){
    m_subscriptionLists={

    //Opérations CRUD sur les musiques
    "musique/read" : [],
    "musique/update" : [],
    "musique/create" : [],
    "musique/delete" : [],

    //Actions UTILISATEUR
    "musique/selectDetails" : [],
    "musique/edit" : [],
    "musique/saisie" : [],

    //Notifications de modification du modèle
    "musique/changed" : [],
    "musique/created" : [],
    "musique/detailsChanged" : [],

    //Demande de réenregistrement d'evenements

    "musique/htmlListeItemRebuilt":[],

    "musique/detailsRebuilt":[],
    };
  };

  //Appel de la méthode d'initialisation
  init();

  /**
  *Interface publique du module mediator
  */
  var publicInterfaceMediator={

    /**
    *Enregistrement d'un callback sur unévénement.
    *Il peut y avoir plusieurs callbacks sur un même événement
    */
    subscribe:function(eventCateg,callbackFunction){
      if(m_subscriptionLists.hasOwnProperty(eventCateg)){
      m_subscriptionLists[eventCateg].push({callback:callbackFunction});
      }else{
      throw new Error("Catégorie d'événements"+eventCateg+"inconnue du médiateur");
      }
    },

    /**
    *Publication d'un événement survenu et exécution de tous les callbacks
    */
    publish : function(eventCateg,contextArg){
      var i;
      if(m_subscriptionLists.hasOwnProperty(eventCateg)){
        for(i=0;i<m_subscriptionLists[eventCateg].length;++i){
          m_subscriptionLists[eventCateg][i].callback(contextArg);
        }
      }else{
      throw new Error("Catégorie d'événements "+eventCateg+" inconnue du médiateur");
      }
    },

    //Réinitialise les listes de callbacks à vide.
    empty:function(){
      init();
    }
  };
  return publicInterfaceMediator;
}()]);
