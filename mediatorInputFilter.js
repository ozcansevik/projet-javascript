

myApp.addModule.apply(myApp, ["ctrl" , {}]);

	//On utilise le pattern mediator pour generer le filtrage des inputs d'un formulaire donnée

	myApp.addModule.apply(myApp.ctrl , ["mediatorInputFilter", function(){

	var m_subscriptionsLists;

	var init = function(){
		m_subscriptionsLists = {};
	};

	init();

	var publicInterfaceMediator = {

		addForm : function(formId){
			m_subscriptionsLists[formId] = {}
		},

		removeForm : function(formId){
			if(!m_subscriptionsLists.hasOwnProperty(formId))
				return false;
			delete m_subscriptionsLists[formId];
			return true;
		},

		subscribe : function(formId, inputName, callbackFunction){
			if(m_subscriptionsLists.hasOwnProperty(formId))
				m_subscriptionsLists[formId][inputName] = { callback : callbackFunction};
				else{
					throw{name:"IllegalArgumentException",
						message: " Catégorie d’événements " +eventCateg+" inconnue du médiateur"
					};
				}
			},

			/**
				*Publication d’un événement associé à un attribut de formulaire provoquant
				l’exécution de la fonction callback associée
				*@param{string}formId − l’Id du formulaire(en tant qu’élément HTML)
				*@param{string}inputName − le nom de l’input(ou de la propriété de l’
				objet métier associé).
			*/
			publish : function(formId,inputName){

				if(m_subscriptionsLists.hasOwnProperty(formId)){
					if(m_subscriptionsLists[formId].hasOwnProperty(inputName)){
						m_subscriptionsLists[formId][inputName].callback();
					}
				}
				else{
					throw {name: "IllegalArgumentException",
					message:"Formulaire d'ID " + formId + " inconnu du médiateur"
					};
				}
			},

			empty : function(){
				init();
			}
		};

		return publicInterfaceMediator;

	}()]);
