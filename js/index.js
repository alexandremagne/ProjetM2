/*
		UNE SEULE FONCTION POST ET UNE SEULE CALLBACK PAR PAGE POUR UNE LISIBILITE ET COMPREHENSION PLUS FACILE

		CHANGER JUSTE LE MESSAGE DE RETOUR DU ROUTER POUR COMPRENDRE CE QUIL SE PASSE
*/

var index = {}; // objet contenant toutes nos fonctions
var data = {}; //objet : transmettre au routeur
var contenuHTML = {};//objet qui va contenir temporairement le code html (du bouton login par exemple)

// fonction appelée au chargement de la page (voir window.onload au bas de la page)
index.start = function () {
	index.btn_check_login_formular_(); //action du bouton login
	index.btn_check_information_for_loan_demand_(); //action du bouton check loan demand
};

index.btn_check_information_for_loan_demand_ = function(){
	//ce quil se passe quand on appuie sur le bouton check
	$( "#check_formulaire_" ).submit( function(event){
		index.fill_data_loan_demand_();
	 	index.post(data, index.callback);
	 	event.preventDefault(); // On désactive le fonctionnement par défault du bouton. Ainsi en cliquant dessus, on ne recharge pas la page
	});
};

index.btn_check_login_formular_ = function(){
	//ce quil se passe quand on appuie sur le bouton login
	$( "#log_in_formular_" ).submit( function(event){
	 index.fill_data_login(); //action pour remplir data
	 index.replace_content_by_animation_GIF_loader("button_login");//pour remplacer le bouton par un chargement
	 index.post(data, index.callback);//passage au router des données
	 event.preventDefault();//à laisser
	} );
};

index.fill_data_login = function(){
	//pour remplir l'objet data avec le username et password et l'action à réaliser
	data.ac = "check_login_process_"; // action a traité pour le routeur
	data.userName = document.getElementById('input_username_').value;
	data.password = document.getElementById('input_password_').value;
};

index.fill_data_loan_demand_ = function(){
	data.ac="check_loan_info_action_";
	data.input_borrowed_capital_ = document.getElementById('input_borrowed_capital_').value;
	data.input_age_of_demander_ = document.getElementById('input_age_of_demander_').value;
	data.input_monthly_incomes_ = document.getElementById('input_monthly_incomes_').value;
	data.input_duration_loan_in_years_ = document.getElementById('input_duration_loan_in_years_').value;
};

//fonction post
index.post = function (data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};

// fonction de retour pour notre objet index
index.callback = function () {
	// si tout s'est bien passé
	if (this.readyState == 4 && this.status == 200) {
		console.log("this.responsetext :" + this.responseText);
		var r = JSON.parse(this.responseText); // conversion string en Objet JSON
		if (r.message=="login_connexion_autorised"){
			alert("Connexion autorisée");
			window.location = "../html/private/admin.html";
		}else if (r.message=="login_connexion_refused"){
			document.getElementById(contenuHTML.id).innerHTML = contenuHTML.string;//pour remettre le bouton originel
			alert("Erreur de connexion");
		}else if(r.message == "ok_loan_demande_") {
			alert("demande de pret envoyée !");
		}else if(r.message == "ok_login_"){			
			alert("demande de login envoyée !");
		}else{
			alert("demande  rejetée !");
		}
	}
};

index.replace_content_by_animation_GIF_loader = function(id){
	contenuHTML.string = document.getElementById(id).innerHTML;
	contenuHTML.id = id;
	document.getElementById(id).innerHTML = '<img src="./images/gif_loader/ajax_loader_blue_48.gif" style="height:40px" >';
};

window.onload = function(){
		setTimeout(index.start, 1);
};