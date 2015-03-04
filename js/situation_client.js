include('../../js/test_function_unitaire/function_demande_pret.js');

var obj = {}; // objet contenant toutes nos fonctions
var client = {}; // objet qui contiendra tous les champs des formulaires utile pour le scoring
var data={};

// appelée au chargement de la page (2/3)
obj.start=function(){
	obj.check_cookie();
	obj.post(data, obj.callback);
	obj.check_loan(); // bouton de demande de prêt
};

obj.check_cookie=function(){
	data.ac="check_cookie";
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

		if (r.message=="store_loan_demand_ok"){
			console.log("demande de prêt stocké dans la bdd");
			window.location="client.html";
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