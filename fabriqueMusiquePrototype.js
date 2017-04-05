
myApp.addModule.apply(myApp.metier.musique, ["createInstance" , function(){


	var PrivateInstanceConstructor = function(){

		this.musique = {};
		this.dataError = false;

	};


	PrivateInstanceConstructor.prototype.addError = function(propertyName, message){
		if(this.dataError === false){
			this.dataError = {};
		}

		this.dataError[propertyName] = message;
	};

	PrivateInstanceConstructor.prototype.setPropertyOrError = function(propertyName, value){
		var resultTestRegex = myApp.metier.musique.testRegex(propertyName,value);
		this.musique[propertyName] = value;
		if(resultTestRegex === true){
			delete this.dataError[propertyName];
		}
		else{
			PrivateInstanceConstructor.prototype.addError.call(this,propertyName," Propriete " + "<strong>" +value +"</strong>" + " invalide" + " : "
																																						+ "<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
																																						+ resultTestRegex);
		}
	};

	//teste s'il y a au moins une erreur dans dataError[]
	PrivateInstanceConstructor.prototype.hasError = function(){
		if(this.dataError === false)
			return false;
		for(var propertyName in this.dataError){
			if(this.dataError.hasOwnProperty(propertyName))
				return true;
		}
		return false;
	};

	//recupère la liste des champs ayant une erreur
	PrivateInstanceConstructor.prototype.getErrorList = function(){
		var errorList = [];
		for(var propertyName in this.dataError){
			if(this.dataError.hasOwnProperty(propertyName))
				errorList.push(propertyName);
		}
		return errorList;
	};

	var generateRandomId = function(){
		var idLength = 10;
		var resultat = "";
		var hexaDigits = Array("0","1","3","4","5","6","7","8","9","a","b","c","d","e","f");
		var i;
		for(i=0; i<10 ; ++i)
			resultat += hexaDigits[Math.floor(Math.random()*16)];
		return resultat;
	}

	var fabriqueInstance = function(inputObj, privateInstance){

		var PublicInstanceConstructor = function(){
			var musiqueMethods = myApp.metier.musique;
			//si l'objet est nulle -> cas du clic sur le bouton ajouter
			//on construit une intance par défaut vide
			//qui sera modifié par les inuputs remplies par l'utilisateur
			if(inputObj === null){
				privateInstance.musique = {
					id : generateRandomId(),
					titre : "",
					artiste : "",
					avisFav : ""
				};
			}
			//sinon on remplit avec les valeurs de l'objet
			else{
				for(var i=0; i<musiqueMethods.getPropertyList().length ; ++i){
					var  propertyName = musiqueMethods.getPropertyList()[i];
					privateInstance.setPropertyOrError(propertyName, inputObj[propertyName]);
				}
			}

			//permet d'accéder à la propriété privée (passée en paramètre) de l'instance
			this.getProperty = function(propertyName){
				return privateInstance.musique[propertyName];
			};

			//initialise une propiete en utilisant setPropertyOrError
			//qui verifie qu'il n'y a pas d'erreur, si c'est le cas
			//elle initialise sinon elle ajoute l'erreur dans dataError[]
			this.setProperty = function(propertyName, value){
				return privateInstance.setPropertyOrError(propertyName,value);
			};

			// teste s'il y a au moins une erreur
			this.hasError = function(){
				return privateInstance.hasError();
			};

			this.getErrorMessage = function(propertyName){
				return privateInstance.dataError[propertyName];
			};

			this.getErrorList = function(){
				return privateInstance.getErrorList();
			};

		};

		//on met à disposition le module à l'aide de prototype
		PublicInstanceConstructor.prototype = myApp.metier.musique;

		return new PublicInstanceConstructor(inputObj);

	}; //fin de la fonction fabriqueInstance

	//construction d'une instance en utilisant la methode fabriqueInstance precedente
	return function(inputObj){
		return fabriqueInstance(inputObj, new PrivateInstanceConstructor());
	};

	}()

]);//fin et apply
