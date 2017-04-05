myApp.addModule.apply(myApp, ["modele", {
	selectedMusique: null,
	musiques: [],
	}]);


myApp.modele.musiques.push(myApp.metier.musique.createInstance({
	id:  "012345ee89",
	titre: "Musique1",
	artiste: "Artiste1",
	avisFav: "1"
	}));



myApp.modele.musiques.push(myApp.metier.musique.createInstance({
	id:  "1234567891",
	titre: "Musique2",
	artiste: "Artiste2",
	avisFav: "2"
	}));

	myApp.modele.musiques.push(myApp.metier.musique.createInstance({

		}));

		myApp.modele.musiques.push(myApp.metier.musique.createInstance({
			id:  "1234567892",
			titre: "Musique3",
			artiste: "Artiste3",
			avisFav: "4*e"
			}));
