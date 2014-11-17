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
	if(err) {
						throw err;
						res.end(JSON.stringify({message: "login_connexion_refused"})); // on convertit le string en objet
					}
	
	var collection = db.collection('users'); // on veut acceder à la collection users de la db ProjetEsme
	collection.find({username:username,pwd:pwd}).toArray( function(err, results){
		if (err) {
						throw err;
						res.end(JSON.stringify({message: "login_connexion_refused"})); // on convertit le string en objet
					}
		else{
			// création du cookie
				var cookie = {}; //mon objet cookie
				cookie.value = ""+username.substring(0,3)+Math.floor(Math.random() * 100000000); //valeur du cookie
				cookie.expire = new Date(new Date().getTime()+900000).toUTCString(); //expire au bout de 1 heure
				
				// MAJ BDD
				collection.update({username: username, pwd: pwd},{ $set: {cookie:cookie}}, { upsert: true }, function(err, docs){
					if(err) {
						throw err;
						res.end(JSON.stringify({message: "login_connexion_refused"})); // on convertit le string en objet
					}else{
										infos={};
										res.writeHead(200, {"Content-Type": "'text/plain'", "Set-Cookie" : 'cookieName='+cookie.value+';expires='+cookie.expire});
										if(results[0].indice == 0){//si c'est un client
												infos.message="login_connexion_autorised_client_"; // ajout d'un attribut message a l'objet pour gérer les cas dans index.js
										}else if(results[0].indice == 1){//si c'est un admin
												infos.message="login_connexion_autorised_admin_"; // ajout d'un attribut message a l'objet pour gérer les cas dans index.js
										}										
										res.end(JSON.stringify(infos)); // conversion de l'objet JSON en string
										db.close(); // on referme la db
					}
				});
					}						

});
});	
};


exports.valid_cookie = function(c,obj,fct){
	/*
	fonction pour voir si le cookie existe ou non dans la db
	il faut prendre dans cookieName= la valeur aprés et vérifier 
	avec cookie.value dans la DB USERS
	*/
	if (c){
				MongoClient.connect('mongodb://alexandre:magne@dogen.mongohq.com:10036/ProjetEsme', function(err, db) {
				    if(err) throw err;	
					var collection = db.collection('users');//pour aller choper le cookie dans la db
					c = c.split("cookieName=");//car c ="GA=iyiuyeuiyizeu ; cookieName=rom19282839" par excemple donc on eneleve le cookieName
collection.find({"cookie.value": c[1]}).toArray(function(err, results) {
					 if (err){
					 	console.log(err);
					 	obj[fct](false);
					 	db.close(); // on referme la db	 
					 }else if (results[0]){	 	
					 	obj[fct]({a:true,b:results[0].indice});	 
					 	db.close(); // on referme la db
					 }else if (!results[0]){	 	
					 	obj[fct](false);	 
					 	db.close(); // on referme la db
					 }	 
					 });	
				});
}else{
					obj[fct](false);
}
};


exports.stock_autorisation = function(borrowed_capital, res){	
	var infos={};
	if(borrowed_capital<100000){
		infos.autorisation=true;
		infos.message="pret_accepte";
		res.end(JSON.stringify(infos)); // conversion de l'objet JSON en string
	} else {
			res.end(JSON.stringify({message: "pret_refuse"})); // on convertit le string en objet
	}
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