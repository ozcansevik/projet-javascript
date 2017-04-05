
var myApp = {

/* Strcture de l'appli */

		addModule : function(moduleName, moduleObject){
			if(typeof moduleName === "string" && /^[a-z]{1,}[a-z0-9\_]*$/i.test(moduleName)){
				this[moduleName] = moduleObject;
			}
			else
				throw{
					name : "IllegalArgumentException",
					message : "Impossible de créer le module"
				}
		},

		init : function(spec) {
			for(propertyName in spec){
				if(spec.hasOwnProperty(propertyName)){
					this.addModule(propertyName,spec[propertyName]);
				}
			}
		}
	};
		// .... //

		myApp.init({
			metier : {}
		}) ;


/* Fin Strcture de l'appli */
