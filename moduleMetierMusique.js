
myApp.addModule.apply(myApp.metier,["musique",function(){


	var regexUtil = myApp.metier.regexUtil;

	var propertiesPatterns = {
			id : {
				regexTest:function(chaine){
					if(/[\da-f]{10}$/i.test(chaine) === true) {
						return true;
					}
					else
						return "L'identifiant doit comporter 10 chiffres hexa";

				},
				labelText : "Identifiant"
			},
			titre : {
				regexTest:function(chaine){
					if(regexUtil.testRegexLatin1WithDigits({
						chaine : chaine,
						maxLength : 30,
					 	minLength : 1 }) === true) {

						return true;
					}
					else
						return "Le titre de la musique doit contenir au plus 30 caractères : lettres ou chiffres seulement";

				},
				labelText : "Titre"
			},
			artiste : {
				regexTest:function(chaine){
					if(regexUtil.testRegexLatin1WithDigits({
						chaine : chaine,
						maxLength : 15,
					 	minLength : 1 }) === true) {
						return true;
					}
					else
						return "L'artiste de la musique doit contenir au plus 15 caractères : lettres ou chiffres seulement";

				},
				labelText : "Artiste"
			},
			avisFav : {
				regexTest:function(chaine){
					if(/[\d]{1,}$/.test(chaine) === true) {
						return true;
					}
					else
						return "Les avis favorables doivent etre des chiffres";
				},
				labelText : "Avis favorables"
			}
		};

		var propertyList = function(){
			var liste = []

			for(var propertyName in propertiesPatterns){
				if(propertiesPatterns.hasOwnProperty(propertyName))
					liste.push(propertyName);
			}

			return liste;
		}();

		var publicInterfaceMusique = {

			getPropertyList : function(){
				return propertyList;
			},

			getLabelText : function(propertyName){
				return propertiesPatterns[propertyName].labelText;
			},

			testRegex : function(propertyName, value){
				if (propertiesPatterns[propertyName] === undefined){
					return "La propriété " + propertyName + " n'existe pas";
				}
				else
					return propertiesPatterns[propertyName].regexTest(value);
			}
		};
		return publicInterfaceMusique;
	}()]

	);
