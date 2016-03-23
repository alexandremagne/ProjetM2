var util = require("util"); 
var url = require("url"); 
var fs = require("fs");
var db = require("./db.js");
var algo = require("./js/algo.js");

var verification_data_entrantes = {};

/**
* This method is used to process the request * @param req (Object) the request object
* @param resp (Object) the response object */

exports.router = function (req, resp) {
	var inc_request = new srouter(req, resp);
	inc_request.run();
	inc_request = null;
};

/* --------*/

srouter = function (req, resp) {
	 if (req && resp) {
			this.req = req;
			this.resp = resp;
			this.pathname = "";
			this.filetype = "";
			this.path = "";
			this.image_file = "jpg png jpeg bmp gif"; 
	} else {
			util.log("ERROR - A srouter object need a request and a response object");
			return;
			}
};

srouter.prototype = {
run:
	function () { 
		this.rest_method();
	},

rest_method:
	function () {
		if (this.req.method == "GET") { 
			this.get_method();
		} else if (this.req.method == "POST") {
			this.post_method();
		} else {
			this.resp.writeHead(501,{"Content -Type": "application/json"});
			this.resp.write(JSON.stringify({message: "Not Implemented"}));
			this.resp.end();
			return;
		}
},



get_method:
	function () {
		var u = url.parse(this.req.url, true, true);
		var regexp = new RegExp("[/]+", "g");
		this.pathname = u.pathname.split(regexp);
		this.pathname = this.pathname.splice(1, this.pathname.length - 1); this.filetype = this.pathname[this.pathname.length - 1].split(".");
		this.filetype = this.filetype[this.filetype.length - 1];
		this.path = "." + u.path; //the website in the same directory than the node server
		console.log(this.path);
		if (u.path == "/html/private/affichage_demande.html")//pour voir dans quel page on va
			{				
				db.valid_cookie(this.req.headers.cookie, this, "check_user"); // on verifie si c un user (si oui il accede aux pages ou il faut être admin sinon on le redirige sur la page d'accueil)
			}
		else{
			this.read_file();
			}
		},

check_user:
	function (ret) {
		console.log(ret);
		if (ret.a == true && ret.b == 1) {			
			this.read_file();
		}else{
			this.resp.end('<p>Non connect&eacute</p><A HREF="../../index.html">Cliquer pour aller au menu principal</A><script>window.onload=function(){setTimeout(function(){window.location="../../index.html"},2000)}</script>');
		}
	},

post_method:
	function (){
		var _this = this;
        var buff = "";
        this.req.on("data", function (c) {
            buff += c;
        });
        this.req.on("end", function () {
           if(buff) _this.go_post(buff);
           else{
           	util.log('hack attempt BRO');
           }
        });
    },
    
go_post:
	function (b) {
		b = JSON.parse(b);
		this.b = b;
		if (b.ac == "login_process_") {			
			db.login(b.userName, b.password, this.resp);
			console.log("ENVOIE D'UNE DEMANDE DE LOGIN");
		}
		else if (b.ac == "register_process_"){			
			var r = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
			if(!r.test(b.email)){//si mail non valide				
				this.resp.writeHead(200,{"Content-Type": "application/json" });
				this.resp.write(JSON.stringify({message:"register_email_not_valid"}));
				this.resp.end();
			}else{
				b.indice = 0;		
				db.register(b,this.resp);
				console.log("ENVOIE D'UNE DEMANDE DE REGISTER");
			}
		}else if(b.ac == "affichage_demande"){
			db.affichage_demande(this.resp);
		}else if(b.ac == "update_ok_pret"){
			//console.log(b);
			db.update_resultat_banquier("ok",b.mail,this.resp);
		}else if(b.ac == "update_ko_pret"){
			//console.log(b);
			db.update_resultat_banquier("ko",b.mail,this.resp);
		}

		else {
			db.valid_cookie(this.req.headers.cookie, this, "cb_cookie");
		}

		
		
	},

cb_cookie:
	function (ret) {		
		var b = this.b;
		if (ret.a == true) {	
/*++++++++++++++++++++++++++++++++++++++++++++MY WALLET++++++++++++++++++++++++++++*/		


			if(b.ac == "demande_stockage_pret"){//premier test
				this.resp.writeHead(200,{"Content -Type": "application/json"});
				db.store_loan_demand(this.req.headers.cookie, b, this.resp);
				return;
			} 

			else if (b.ac=="save_loan_request"){//deuxiem test
				this.resp.writeHead(200,{"Content -Type": "application/json"});
				db.store_loan_request_5C(this.req.headers.cookie, b, this.resp);
				return;
			}

			else if (b.ac=="check_cookie"){				
				return;
			}

			else if (b.ac=="affichage_spider"){	
				db.affichage_spider(this.req.headers.cookie, this.resp);
				return;
			}

			else if (b.ac == "delete-cookie"){
				console.log("SUPPRESSION DU COOKIE");
				this.resp.writeHead(200, {"Content -Type": "application/json"});
				db.delete_cookie(this.req.headers.cookie, this.resp);
				return;
			}

			else if (b.ac == 'get-money'){
				this.resp.writeHead(200,{"Content -Type": "application/json"});
				db.get_money(this.req.headers.cookie, this.resp);
				return;
			}
			
			else if (b.ac == "reset-btn"){
				this.resp.writeHead(200,{"Content -Type": "application/json"});
				db.reset_btn(this.req.headers.cookie, this.resp);
				return;		
			}
/*++++++++++++++++++++++++++++++GET ID JS++++++++++++++++++++++++++++*/			
			else if (b.ac == 'get-id'){
				this.resp.writeHead(200,{"Content -Type": "application/json"});

				db.get_id(this.req.headers.cookie, this.resp);
				return;
			}
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++CHATROOM++++++++++++++++++++++++++++*/
			else if(b.ac == "post-btn"){
				if (b.content.length <= 151){ // si le message est inférieur a 150 caractères
					this.resp.writeHead(200,{"Content -Type": "application/json"});
					db.insert_message_forum(b.id, b.content, b.date, this.resp);
					return;
				}else {
					this.resp.end(JSON.stringify({message: "long"}));
				}
			}
			else if(b.ac == "get-content"){
				this.resp.writeHead(200,{"Content -Type": "application/json"});
				db.get_message_forum(this.resp);
				return;	
			}
				else if(b.ac == "get-id-chat"){
				this.resp.writeHead(200,{"Content -Type": "application/json"});
				db.get_id_chat(this.resp);
				return;	
			}
/*+++++++++++++++++++++++++++++++++++++++++ADMIN++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

			/*+++++++++++++++++++++++++++++++++++++++++on recup les id+++++++++++++++++++++++++*/
			else if(b.ac == "get-content2"){
				this.resp.writeHead(200,{"Content -Type": "application/json"});
				db.get_id_admin(this.resp);
				return;
			}
			/*++++++++++++++++++++++++++++set un compte en admin ou en normal ou en suspend+++++++++++++++++++++++++*/
			else if (b.ac == "set-account-admin"){
				this.resp.writeHead(200,{"Content -Type": "application/json"});
				db.set_account_admin(b.id, b.statue, this.resp);
				return;
			}
/*================pour supprimer un cookie ++++++++++++++++++++++++++++++++++++++++*/
			else if (b.ac == "delete-cookie"){
			
				this.resp.writeHead(200,{"Content -Type": "application/json"});
				db.delete_cookie(this.req.headers.cookie, this.resp);
				return;
			}

		

/*+++++++++++++++++++++++++++POUR LA PAGE SETTINGS+++++++++++++++++++++++++++++*/
	
			// on envoie à la db via le cookie, le mdp récupérer dans settings.html via settings.js
			else if (b.ac == "change-mdp") {
			this.resp.writeHead(200,{"Content-Type": "application/json" });
				db.change_mdp(this.req.headers.cookie, b.password, b.npassword, this.resp);
				return;
			// DONE Récupérer dans la db, le mdp selon l'id présent ds le cookie
			
			}
			
			// on envoie à la db via le cookie, l'email récupérer dans settings.html via settings.js
			else if (b.ac == "change-email") {
			this.resp.writeHead(200,{"Content-Type": "application/json" });
				db.change_email(this.req.headers.cookie, b.email, b.pw, this.resp);
				return;
			}
			
			// on envoie à la db via le cookie, le mdp récupérer dans settings.html via settings.js
			else if (b.ac == "delete-account") {
			this.resp.writeHead(200,{"Content-Type": "application/json" });
				db.delete_account(this.req.headers.cookie, b.pwd, this.resp);
				return;
			}
			
			
		
		
		/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
		} 
				
		util.log("INFO - Action not found : " + b.ac);
		//this.resp.writeHead(501, {"Content -Type": "application/json"});
		this.resp.end(JSON.stringify({message: "nocookie"}));
		
	},

		
read_file:
function () {
	if(!this.pathname[0]){ // Quand il n'y pas rien dans l'url on redirige l'utiisateur vers la page index.html par default
		this.pathname = "./index.html";
		this.path = "./index.html";
		this.filetype = "html";
	} else if (this.pathname[0] == "router.js" || this.pathname[0] == "server.js" || this.pathname[0] == "db.js") {
		util.log("ALERT - Hack attempt, resquest on : " + util.inspect(this.pathname));
		this.pathname = "./index.html";
		this.path = "./index.html";
		this.filetype = "html";
	} 

	this.load_file();
},
	
load_file:
	function () {
		var _this = this;
		fs.exists(this.path, function (ex) {
			if (ex) {
				fs.readFile(_this.path, function (e, d) {
					if (e) {
						util.log("ERROR - Problem reading file : " + e);
					} else {
						_this.file = d;
						//util.puts("GET on path : " + util.inspect(_this.path));
						_this.file_processing();
			} });
			} else {
				util.log("INFO - File requested not found : " + _this.path);
				_this.resp.writeHead(404,{"Content-Type":"text/html"});
				_this.resp.end(); 
				//_this.resp.writeHead(200,{"Content -Type":"text/html"});
				//_this.resp.end('<h1 style="text-align:center">La page n\'existe pas</h1><div><img src="../../images/404/404_not_found.png"></div>');
			}
		});
	},
	
file_processing:
	function () {
		if (this.filetype == "htm") {
			this.resp.writeHead(200,{"Content-Type": "text/html"});
		} else if (this.image_file.indexOf(this.filetype) >= 0) {
			this.resp.writeHead(200,{"Content-Type" : "image/" + this.filetype });
		} else {
			this.resp.writeHead(200,{"Content-Type" : "text/" + this.filetype });
		}
		this.file_send();
	},
	
file_send:
function () {
	this.resp.write(this.file);
	this.resp.end();
	}
}


// Pour vérifier les données entrante

verification_data_entrantes.check_data_loan_demand_individual_client_ = function(data){
	/*
	Fonction qui prend l'objet transmis par le client
	VERIFICATION : 
	1) on regarde si les champs existent (HTML5 renvoi un champ vide si une lettre est transmise, par exemple sur iphone, 
											qunant tu fais une erreur dans le formulaire, ca envoi quand meme, et si c un caractere autre que chiffre
											ca envoie un champ vide)
	2) on regarde si les champs sont composés que de chiffres
	3) on retourne vrai si le regexp passe et faux sinon
	*/
	regex = new RegExp("^[0-9]+$");//regexp pour que des chiffre ET pas vide ou pas espace
	if(data.input_duration_loan_in_years_ && data.input_annual_incomes_ && data.input_age_of_demander_&& data.input_borrowed_capital_){
		var stringAtester = ""+data.input_duration_loan_in_years_+data.input_annual_incomes_+data.input_age_of_demander_+data.input_borrowed_capital_;
		return regex.test(stringAtester);	
	}else return false;	
};

