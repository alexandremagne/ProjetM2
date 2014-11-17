// DOCUMENT PARTIE SERVEUR 

var db = require("../db.js");

// var data_algo = {};

exports.calcul_autorisation = function(borrowed_capital, age_of_demander, annual_incomes, duration_loan_in_years, rep){
		db.stock_autorisation(borrowed_capital, rep);
};


/*

	results.forEach( function(infos){			
			if(infos.username==username && infos.pwd == pwd){ //connecion autorisée
			
			// création du cookie
				var cookie = {}; //mon objet cookie
				cookie.value = ""+username.substring(0,3)+Math.floor(Math.random() * 100000000); //valeur du cookie
				cookie.expire = new Date(new Date().getTime()+900000).toUTCString(); //expire au bout de 1 heure
				
				// MAJ BDD
				collection.update({username: username, pwd: pwd},{username: username, pwd: pwd, cookie:cookie}, { upsert: true }, function(err, docs){
					if(err) {
						throw err;
						res.end(JSON.stringify({message: "login_connexion_refused"})); // on convertit le string en objet
					}else{
										res.writeHead(200, {"Content-Type": "'text/plain'", "Set-Cookie" : 'cookieName='+cookie.value+';expires='+cookie.expire});										
										infos.message="login_connexion_autorised"; // ajout d'un attribut message a l'objet pour gérer les cas dans index.js
										res.end(JSON.stringify(infos)); // conversion de l'objet JSON en string
										db.close(); // on referme la db
					}
				});

			}else {//non autorisée
				res.end(JSON.stringify({message: "login_connexion_refused"})); // on convertit le string en objet
				db.close(); // on referme la db
			}					
		});

*/