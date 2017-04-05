

myApp.addModule.apply(myApp.metier , ["regexUtil", function(){


	var regexLatin1
		=/^[a−zA−Z]*$/i ;

	var regexLatin1WithDigits
		=/^[A-Za-z0-9]*$/i ;

	var regexLatin1WithDigitsPunctuation
		=/^[a−zA−Z"'−0−9;.,!?:()]*$/i ;

	var validateRegex = function(spec){

		if(typeof spec.chaine === "string"
			&& (!spec.minLength || spec.chaine.length >= spec.minLength)
			&& (!spec.maxLength || spec.chaine.length <= spec.maxLength)
		){
			return spec.regex.test(spec.chaine);
		}
		return false;
	};

	var publicInterfaceRegex = {

		testRegexLatin1 : function(spec){

			spec.regex = regexLatin1;
			return validateRegex(spec);
		},

		testRegexLatin1WithDigits : function(spec){
			spec.regex = regexLatin1WithDigits;
			return validateRegex(spec);
		},

		testRegexLatin1WithDigitsPunctuation : function(spec){
			spec.regex = regexLatin1WithDigitsPunctuation;
			return validateRegex(spec);
		}
	};

	return publicInterfaceRegex;

	}()]

);
