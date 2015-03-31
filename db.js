var MongoClient = require('mongodb').MongoClient,
         format = require('util').format;

var field_to_connect_db = {};

field_to_connect_db.adress='mongodb://alexandre:magne@dogen.mongohq.com:10036/ProjetEsme';


/*
####################################
####################################
FONCITION POUR AFFICHER TOUTE LA BASE
RETOURNE JE NE SAIS PLUS QUOI DONC A REMPLI
####################################
####################################
*/
exports.afficher_toute_la_base = function(){
MongoClient.connect(field_to_connect_db.adress, function(err, db) {
    if(err) throw err;//si erreur de connections
	
	 var collection = db.collection('test1');//on veut acceder à la collection test 1 de la db ProjetEsme
	 collection.find().toArray(function(err, results) {
     if (err) throw err;

      console.log(results);
      db.close();
   });
});
};

exports.update_resultat_banquier = function(message,mail,res){
	MongoClient.connect(field_to_connect_db.adress, function(err, db){
	if(err){
		res.writeHead(503, {"Content-Type": "application/json" });
		res.end(JSON.stringify({message: "connexion_error"}));
		return;
	}
	else{
		res.writeHead(200, {"Content-Type": "application/json" });
		var collection = db.collection('users'); // on veut acceder à la collection users de la db ProjetEsme				
				collection.update( {email: mail },{ $set: {"resultat_banquier":message} }, { upsert: false },function(err, docs){
					if(err) {
						throw err;
						res.end(JSON.stringify({message: "error"}));
						db.close(); // on referme la db
					}else{						
						res.end(JSON.stringify({message: "resultat_banquier_sent"}));
						db.close(); // on referme la db									
					}
				});	
	}
});
};	

exports.affichage_demande = function(res){
MongoClient.connect(field_to_connect_db.adress, function(err, db) {
    if(err) throw err;//si erreur de connections
	
	 var collection = db.collection('users');//on veut acceder à la collection test 1 de la db ProjetEsme
	 collection.find().toArray(function(err, results) {
     if (err) throw err;	
      		res.writeHead(200, {"Content-Type": "application/json" });
      		var data = {};
      		data.message = "ok_affichage_demande";
      		data.r = results;
			res.end(JSON.stringify(data));
			db.close();
      db.close();
   });
});
};

exports.register = function(b,res){
	MongoClient.connect(field_to_connect_db.adress, function(err, db) {
	if(err) {//en cas d'erreur de connection
						console.log("DB : erreur de connexion au niveau de register: "+err);
						res.writeHead(503, {"Content-Type": "application/json" });
						res.end(JSON.stringify({message: "connexion_error"}));
						return;
			}
	else{
		res.writeHead(200, {"Content-Type": "application/json" });
		db.collection('users').insert(b,function(err, doc){
			if(err){				
				res.end(JSON.stringify({message:"register_doublon"}));
				db.close();
			}else{				
				res.end(JSON.stringify({message:"register_ok"}));
				db.close();
			}
		});
	}
});
};

exports.login=function(email, pwd, res){
/*
Fonction pour le bouton login, pour se connecter avec un identifiant et un mot de passe
*/
MongoClient.connect(field_to_connect_db.adress, function(err, db){
	if(err){
		console.log("DB : erreur de connexion au niveau de login: "+err);
		res.writeHead(503, {"Content-Type": "application/json" });
		res.end(JSON.stringify({message: "connexion_error"}));
		return;
	}
	else{
		res.writeHead(200, {"Content-Type": "application/json" });
		var collection = db.collection('users'); // on veut acceder à la collection users de la db ProjetEsme
		collection.find({email:email,pwd:pwd}).toArray( function(err, results){
		if (err){//email ou pwd faux
			throw err;
			res.end(JSON.stringify({message: "login_connexion_refused"}));
			db.close(); // on referme la db
		}else if(results.length == 0){//si pas de resultat un peu pareil mais cas particulier
			res.end(JSON.stringify({message: "login_connexion_refused"}));
			db.close(); // on referme la db
		}
		else{
			// création du cookie
				var cookie = {}; //mon objet cookie
				cookie.value = ""+email.substring(0,3)+Math.floor(Math.random() * 100000000); //valeur du cookie
				cookie.expire = new Date(new Date().getTime()+900000).toUTCString(); //expire au bout de 1 heure
				
				// MAJ BDD
				collection.update({email: email, pwd: pwd},{ $set: {cookie:cookie}}, { upsert: true }, function(err, docs){
					if(err) {
						throw err;
						res.end(JSON.stringify({message: "login_connexion_refused"}));
						db.close(); // on referme la db
					}else{
									infos={};
									res.writeHead(200, {"Content-Type": "'text/plain'", "Set-Cookie" : 'cookieName='+cookie.value+';expires='+cookie.expire});
									if(results[0].indice == 0){//si c'est un client
										infos.message="login_connexion_autorised_client_"; 
									}else if(results[0].indice == 1){//si c'est un admin
										infos.message="login_connexion_autorised_admin_"; 
									}else{
										infos.message="something_wrong_in_bdd";
									}
										res.end(JSON.stringify(infos)); // conversion de l'objet JSON en string
										db.close(); // on referme la db									
					}
				});
		}//else			

	});
}
});	
};


exports.delete_cookie=function(cookie, res){
	console.log("delete_cookie");
	MongoClient.connect(field_to_connect_db.adress, function(err, db){
	if(err){
		res.writeHead(503, {"Content-Type": "application/json" });
		res.end(JSON.stringify({message: "connexion_error"}));
		return;
	}
	else{
		res.writeHead(200, {"Content-Type": "application/json" });
		var collection = db.collection('users'); // on veut acceder à la collection users de la db ProjetEsme
		var m = cookie.split("cookieName=");
		console.log("valeur du cookie :" + m[1]);
				collection.update( {"cookie.value": m[1] },{ $set: {"cookie.value":"0"} }, { upsert: false },function(err, docs){
					if(err) {
						throw err;
						res.end(JSON.stringify({message: "error"}));
						db.close(); // on referme la db
					}else{
						console.log("LOGOUT DU CLIENT");
						res.end(JSON.stringify({message: "logout"}));
						db.close(); // on referme la db									
					}
				});	
	}
});
};	



exports.store_loan_demand=function(cookie, b, res){
	MongoClient.connect(field_to_connect_db.adress, function(err, db) {
	if(err) {//en cas d'erreur de connection
		console.log("DB : erreur de connexion à la db au niveau de store_loan_demand: "+err);
		res.writeHead(503, {"Content-Type": "application/json" });
		res.end(JSON.stringify({message: "store_loan_demand_error"}));
		return;
	} else{
		res.writeHead(200, {"Content-Type": "application/json" });

			var user = db.collection('users');//pour aller choper le cookie dans la db
			var  loan_demands = db.collection("loan_demands");
			c = cookie.split("cookieName=");
			user.update({"cookie.value":c[1]},{ $set: {pret_ok_or_not:b}}, { upsert: false }, function(err, docs){		
					if(err) {
						throw err;
						res.end(JSON.stringify({message: "no_cookie"}));
						db.close(); // on referme la db
					}else{
						res.end(JSON.stringify({message:"store_loan_demand_ok"}));																			
						}
		});
		}
	});
};

// pour la demande de pret final, on stocke ce ue nous renvoie la fonction 5C => la valeur de chacun des C (sur 5) ainsi que la proba de defaut
exports.store_loan_request_5C=function(cookie, b, res){
	MongoClient.connect(field_to_connect_db.adress, function(err, db) {
	if(err) {//en cas d'erreur de connection
		console.log("DB : erreur de connexion à la db au niveau de store_loan_demand: "+err);
		res.writeHead(503, {"Content-Type": "application/json" });
		res.end(JSON.stringify({message: "store_loan_request_error"}));
		return;
	} else{
		res.writeHead(200, {"Content-Type": "application/json" });

			var user = db.collection('users');//pour aller choper le cookie dans la db			
			c = cookie.split("cookieName=");
			user.update({"cookie.value":c[1]},{ $set: {cinqCform:b}}, { upsert: false }, function(err, docs){	
					if(err) {
						throw err;
						res.end(JSON.stringify({message: "no_cookie"}));
						db.close(); // on referme la db
					}else{									
							res.end(JSON.stringify({message:"store_loan_request_ok"}));																							
						}
		});
		}
	});
};

exports.affichage_spider = function(cookie, res){
MongoClient.connect(field_to_connect_db.adress, function(err, db) {
	c = cookie.split("cookieName=");
    if(err) throw err;//si erreur de connections
	
	 var collection = db.collection('users');//on veut acceder à la collection test 1 de la db ProjetEsme
	 collection.find({"cookie.value":c[1]}).toArray(function(err, results) {
	 res.writeHead(200, {"Content-Type": "application/json" });
     if (err){
     	throw err;
		res.end(JSON.stringify({message: "no_cookie"}));
		db.close(); // on referme la db
     }if(results){
      		var data = {};
      		data.message = "ok_affichage_spider";
      		data.r = results;
			res.end(JSON.stringify(data));
			db.close();      		
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
				MongoClient.connect(field_to_connect_db.adress, function(err, db) {
				    if(err) throw err;	
					var collection = db.collection('users');//pour aller choper le cookie dans la db
					c = c.split("cookieName=");//car c ="GA=iyiuyeuiyizeu ; cookieName=rom19282839" par excemple donc on eneleve le cookieName
collection.find({"cookie.value": c[1]}).toArray(function(err, results) {
					 if (err){
					 	console.log(err);
					 	obj[fct](false);
					 	db.close(); // on referme la db	 
					 }else if (results[0]){	 	
					 	obj[fct]({a:true,b:results[0].indice}); // on vérifie l'indice (user ou admin) au passage à chaque fois que l'on vérifie le cookie 
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