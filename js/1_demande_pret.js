

var obj = {}; // objet contenant toutes nos fonctions
var client = {}; // objet qui contiendra tous les champs des formulaires utile pour le scoring
var data={};

// appelée au chargement de la page (2/3)
obj.start=function(){
	document.addEventListener("click", obj.on_click);
	obj.check_cookie();
	obj.post(data, obj.callback);
	obj.check_loan(); // bouton de demande de prêt
};

obj.check_cookie=function(){
	data.ac="check_cookie";
};


obj.on_click = function (ev) {
    var src = ev.target;
    if (src.has_class("logout")) {
    	console.log("biehzz");
        obj.deleteCookie();
    }
};


// ============pour logout ==============

obj.deleteCookie = function () {
    var data = {ac: "delete-cookie"};
    obj.post(data, obj.callback);
};

HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};

// appelée au chargement de la page (3/3)
obj.check_loan=function(){		
	$("#check_formulaire_").submit(function(event){
		client.input_borrower_annual_incomes = document.getElementById("input_borrower_annual_incomes").value;
		client.input_borower_loan_duration = document.getElementById("input_borower_loan_duration").value;
		client.input_borrower_monthly_expenses = document.getElementById("input_borrower_monthly_expenses").value;
		client.input_borrower_contract = document.getElementById("input_borrower_contract").value;
		client.input_borrower_employment_Duration = document.getElementById("input_borrower_employment_Duration").value;
		client.input_borrower_other_incomes_checked = document.getElementById("input_borrower_other_incomes_checked").checked;
		
		event.preventDefault();// Pour annuler le comportement par default d'un formulaire

		// vérifier si on peut demander un pret (donc ne prend pas en compte le montant du prêt)
		demande_pret(client.input_borrower_contract,client.input_borrower_employment_Duration,client.input_borrower_annual_incomes/12,client.input_borrower_monthly_expenses,client.input_borower_loan_duration,client.input_borrower_other_incomes_checked); //->pret possible

	});
};

obj.disableotherincomes=function(){
	if(document.getElementById("input_borrower_other_incomes_checked").checked){
		document.getElementById('input_borrower_other_incomes').disabled=false;
	}else{
		document.getElementById('input_borrower_other_incomes').disabled=true;
		document.getElementById('input_borrower_other_incomes').value="";
	}
};



////////////// Communication avec le router via la méthode POST ////////////
obj.post = function (client, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(client));
};

obj.callback=function(){
	if (this.readyState == 4 && this.status == 200) {
		console.log("this.responsetext :" + this.responseText);
		var r = JSON.parse(this.responseText); // conversion string en Objet JSON
		if (r.message=="logout"){
			console.log("delete ok");
            window.location = "../../index.html";
		}else if (r.message=="store_loan_demand_ok"){
			console.log("demande de prêt stocké dans la bdd");
			window.location="2_demande_pret.html";
		}else if(r.message=="something_wrong"){
			console.log("demande de prêt NON stocké");
		}else if (r.message=="nocookie"){
			window.location = "/index.html";
		}else{
			console.log(r);
			alert("Stockage  refusé");
		}
	}
};
///////////////////////////////////////////////////////

//pour inclure un fichier js
function include(fileName){
document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
};


// appelé au chargement de la page (1/3)
window.onload=function(){
	setTimeout(obj.start,1);
};

var demande_pret = function(contract_type,duration_contract,monthly_incomes,monthly_expenses,loan_duration,other_incomes){
		client.ac="demande_stockage_pret";		
		var debt_ratio = monthly_expenses/monthly_incomes<=0.33;
		client.debt_ration = debt_ratio;
	if(contract_type == 1){//si c'est un CDI
		if(debt_ratio){//si ratio d'endettement <= 33%
			client.resultat_fonction=("Lend possible");
			alert("Lend possible");
			obj.post(client, obj.callback);//passage au router des données
		}else{//si ratio d'endettement > 33%
			client.resultat_fonction=("Lend rejected");
			alert("Lend rejected");
			location.reload();
		}
	}else if(contract_type == 2 || contract_type == 4 || contract_type == 3){//CDD ou stage ou Interim
		if(loan_duration<duration_contract){//durée du pret < durée du contrat
			if(debt_ratio){//si ratio d'endettement <= 33%
				client.resultat_fonction=("Lend possible");
				alert("Lend possible");
				obj.post(client, obj.callback);//passage au router des données
			}else{//si ratio d'endettement > 33%
				client.resultat_fonction=("Lend rejected");
				alert("Lend rejected");
				location.reload();
			}
		}else{
			if(other_incomes){// si autres revenu
				client.resultat_fonction=("Type particulier");
				alert("type particulier");
				obj.post(client, obj.callback);//passage au router des données
			}else{//si pas 	d'autres revenus
				client.resultat_fonction=("Lend rejected");
				alert("Lend rejected");
				location.reload();
			}
		}
	}else{
		client.resultat_fonction=("Err Function");
		alert("Err Function");
		location.reload();
	}
	
}