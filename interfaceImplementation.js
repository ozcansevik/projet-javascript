var Interface=function(methods){

  if(methods.length===undefined){
    throw{
      name:"IllegalArgument",
      message:"Une interface nécessite un array(ouarray−like)de noms de méthodes."
    };
  }

  this.methods=[];
  //pour chaque nom de méthode
  for(var i=0;i<methods.length;++i){
    //Vérification de type
    if(typeof methods[i]!=='string'){
      throw{
        name:"IllegalArgument",
        message:"Les noms de méthodes d'une interface doivent être de type string."
      };
    }
    //Ajout du nom de méthode
    this.methods.push(methods[i]);
  }
};

Interface.prototype.isImplementedBy=function(objet){
  //pour chaque nom de méthode
  for(var i=0;i<this.methods.length;++i){
    var methodName=this.methods[i];
    //Si l'objet n'a pas de propriété de ce nom qui soit de type fonction
    if(!objet[methodName]||typeof objet[methodName]!=='function'){
      return "L'objetn'implémente pas la méthode"+methodName;
    }
  }
  return true;
}
