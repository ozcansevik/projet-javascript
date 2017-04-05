myApp.addModule.apply(myApp,["gui",{}]);

//fonction de géneration de l'ID d'un élement HTML de type input
// precedé par l'ID du formulaire
myApp.addModule.apply(myApp.gui,["getInputId",function(inputSpec){
  return inputSpec.formId+"_"+inputSpec.propertyName;
}]);

//publie auprès du Mediator un évenment onchange d'un input
myApp.addModule.apply(myApp.gui,["publishInputChange",function(formId,propertyName){
  myApp.ctrl.mediatorInputFilter.publish(formId, propertyName);
}]);

//génération du code HTML de l'inputId
//message d'erreur s'il y en a + valeur de l'input
myApp.addModule.apply(myApp.gui,["getInputCode",function(inputSpec){
    var inputId=myApp.gui.getInputId(inputSpec);
    var propertyValue=inputSpec.objetMetier.getProperty(inputSpec.propertyName)||"";
    var errorMessage=inputSpec.objetMetier.getErrorMessage(inputSpec.propertyName)!==undefined
                    ?inputSpec.objetMetier.getErrorMessage(inputSpec.propertyName)
                    +"&nbsp":"";

  // CALLBACK de gestion du filtrage de l'input
  myApp.ctrl.mediatorInputFilter.subscribe(inputSpec.formId, inputSpec.propertyName,function(){
    var resultatTestRegex=inputSpec.objetMetier.testRegex(inputSpec.propertyName,document.getElementById(inputId).value);
    if(resultatTestRegex!==true){
      document.getElementById("error_"+inputId).innerHTML=resultatTestRegex+"<br/>";
    }else{
      document.getElementById("error_"+inputId).innerHTML="";
    }
  }); // fin du CALLBACK

  //recupération de différentes valeurs
  var inputType=inputSpec.inputType===undefined ? "text":inputSpec.inputType;
  var inputSize=inputSpec.inputSize===undefined ? "10":inputSpec.inputSize;
  var labelText=inputSpec.objetMetier.getLabelText(inputSpec.propertyName);

  //retour du code HTML de l'input
  return "<span style=\"color:#B40404;\" id=\"error_"+inputId+"\">" + errorMessage+
        "</span>"+  "</br>"+
        "<label for=\""+inputSpec.propertyName+"\">"+labelText+":</label>"+
        "<input style=\"margin-left:15px;\" type=\""+inputType+"\"name=\""+inputSpec.propertyName+
        "\" id=\""+inputId+"\""+"value=\""+propertyValue+"\" "+
        "size=\""+inputSize+"\"" + "onchange=\"myApp.gui.publishInputChange('"+inputSpec.formId+ "', '"+inputSpec.propertyName+"')\""+"/>" + "</br>";
}]);

// génération du code HTML de l'ensemble des inputs d'un formulaire
myApp.addModule.apply(myApp.gui,["getHtmlFormInputs",function(objetMetier,formId){

  var metierCommonInstanceMethods=new Interface(["getPropertyList","getLabelText","testRegex","getProperty",
                                  "setProperty","hasError","getErrorMessage","getErrorList"]);

  var testInterface=metierCommonInstanceMethods.isImplementedBy(objetMetier);
  var message;

  if(testInterface!==true){
    throw new Error(testInterface);
  }

  //ajout du formulaire mainForm au Mediator qui gererea
  //ses événements
  myApp.ctrl.mediatorInputFilter.addForm(formId);

  var htmlCode="";

  var propertyList=objetMetier.getPropertyList();

  for(var i=0;i<propertyList.length;i++){
    var propertyName=propertyList[i];

    if(propertyName!="id"){
      htmlCode+=myApp.gui.getInputCode({
      objetMetier:objetMetier,
      propertyName:propertyList[i],
      labelText:objetMetier.getLabelText(propertyList[i]),
      formId:formId
      })+"<br/>";
    }
  }

  //champ caché representant l'id de l'instance
  htmlCode+="<input type=\"hidden\"id=\""+formId+"_id\"value=\"" + objetMetier.getProperty('id')+"\"/>";

  return htmlCode;
}]);
