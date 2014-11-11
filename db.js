var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


/*
####################################
####################################
FONCITION POUR AFFICHER TOUTE LA BASE
RETOURNE JE NE SAIS PLUS QUOI DONC A REMPLI
####################################
####################################
*/
exports.afficher_toute_la_base = function(){
MongoClient.connect('mongodb://alexandre:magne@dogen.mongohq.com:10036/ProjetEsme', function(err, db) {
    if(err) throw err;//si erreur de connections
	
	 var collection = db.collection('test1');//on veut acceder à la collection test 1 de la db ProjetEsme
	 collection.find().toArray(function(err, results) {
    	if (err) throw err;
	
      console.log(results);
        
        // Let's close the db
      db.close();
   });

});
};

exports.login=function(username, pwd, res){
/*
Fonction pour le bouton login, pour se connecter avec un identifiant et un mot de passe
*/
MongoClient.connect('mongodb://alexandre:magne@dogen.mongohq.com:10036/ProjetEsme', function(err, db) {
	if(err) throw err; // si erreur de connexion à la db
	
	var collection = db.collection('users'); // on veut acceder à la collection users de la db ProjetEsme
	collection.find({}).toArray( function(err, results){
		if (err) throw err; // si echec d'accès à la collection
		
		results.forEach( function(infos){			
			if(infos.username==username && infos.pwd == pwd){//connecion autorisée
				infos.message="login_connexion_autorised"; // ajout d'un attribut message a l'objet pour gérer les cas dans index.js
				res.end(JSON.stringify(infos)); // conversion de l'objet JSON en string
			}else {//non autorisée
				res.end(JSON.stringify({message: "login_connexion_refused"})); // on convertit le string en objet
			}	
				
		});
									
		
		
	db.close(); // on referme la db
});
});
};

/*
####################################
####################################
FONCTION POUR AJOUTER LES INFOS DE DEMANDE DE PRET
A FAIRE
####################################
####################################
*/

/*
####################################
####################################
FONCTION POUR AJOUTER LES COOKIES DANS UNE **AUTRE COLLECTION** QUE CELLE OU LON MET LES INFOS DE DEMANDE DE PRET
A FAIRE
####################################
####################################
*/

/*
####################################
####################################
FONCTION POUR RECUPERER LES COOKIES DANS LA COLLECTION APPARTENANT A CELLE DES COOKIES
A FAIRE
####################################
####################################
*/