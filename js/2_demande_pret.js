include('../../js/test_function_unitaire/function_capital.js');
include('../../js/test_function_unitaire/function_collateral.js');
include('../../js/test_function_unitaire/function_capacity.js');
include('../../js/test_function_unitaire/function_condition.js');
include('../../js/test_function_unitaire/function_character.js');
include('../../js/test_function_unitaire/cinqc.js');


var obj = {}; // objet contenant toutes nos fonctions
var client = {}; // objet qui contiendra tous les champs des formulaires utile pour le scoring
var data={}; // objet utlile pour vérifier le cookie => lance un POST pour déco automatique en cas de modif de cookie
var obj_proba_5C ={} // objet qui contient la méthode d'appel a la fonction 5C


// appelée au chargement de la page (2/3)
obj.start=function(){	
	obj.post({ac:"affichage_spider"}, obj.callback);
	obj.check_loan(); // bouton de demande de prêt
};


// appelée au chargement de la page (3/3)
obj.check_loan=function(){		
	$("#check_formulaire_").submit(function(event){

	////////////////////////////////////////////////// POUR CAPITAL //////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		client.input_borrower_loan_amount = document.getElementById("input_borrower_loan_amount").value;
		client.input_borrower_assets_type = document.getElementById("input_borrower_assets_type").value; // asset types
		client.input_borrower_contribution=document.getElementById("input_borrower_contribution").value;

	////////////////////////////////////////////////// POUR function_COLLATERAL (on récupere également loan_amount)/////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		client.input_borrower_pledge_value=document.getElementById("input_borrower_pledge_value").value;
		client.input_borrower_bails_value=document.getElementById("input_borrower_bails_value").value;
		if(document.getElementById("input_borrower_property_yes").checked)
			client.input_borrower_property=document.getElementById("input_borrower_property_yes").value;
		else
			client.input_borrower_property=document.getElementById("input_borrower_property_no").value;

		if(document.getElementById("input_borrower_guarantee_yes").checked)
			client.input_borrower_guarantee=document.getElementById("input_borrower_guarantee_yes").value;
		else
			client.input_borrower_guarantee=document.getElementById("input_borrower_guarantee_no").value;

	////////////////////////////////////////////////// POUR function_CAPACITY (+ loan_amount)/////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		client.input_borrower_loan_purpose=document.getElementById("input_borrower_loan_purpose").value;
		client.input_borrower_monthly_incomes = ((document.getElementById("input_borrower_annual_incomes").value)/12); // mensuel => on divise par 12
		client.input_borrower_monthly_expenses = document.getElementById("input_borrower_monthly_expenses").value;
		client.input_borower_loan_duration = document.getElementById("input_borower_loan_duration").value;
		client.references_type="plus de deux bonnes references"; // A changer car écrit en dur ici..
		if(document.getElementById("input_borrower_other_incomes_checked").checked)
			client.input_borrower_other_incomes = ((document.getElementById("input_borrower_other_incomes").value)/12); // mensuel => on divise par 12
		else 
			client.input_borrower_other_incomes=0;

	////////////////////////////////////////////////// POUR function_CONDITION (+ loan_purpose)/////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if(document.getElementById("input_futur_expanses_yes").checked)
			client.input_futur_expanses=document.getElementById("input_futur_expanses_yes").value;
		else
			client.input_futur_expanses=document.getElementById("input_futur_expanses_no").value;

	////////////////////////////////////////////////// POUR function_CHARACTER (+ loan_purpose)/////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		client.input_borrower_contract = document.getElementById("input_borrower_contract").value;
		client.input_borrower_diploma = document.getElementById("input_borrower_diploma").value;
		client.input_borrower_habitat = document.getElementById("input_borrower_habitat").value;
		client.input_borrower_employment_Duration = document.getElementById("input_borrower_employment_Duration").value;

		
		

	//////////////////////////////////////// FONCIONS UTILIES POUR LES 5C -- 1 fonction par C ////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		client.obj5c=cinqc(     collateral(client.input_borrower_property, client.input_borrower_pledge_value, client.input_borrower_bails_value, client.input_borrower_guarantee, client.input_borrower_loan_amount),     asset(client.input_borrower_contribution,client.input_borrower_loan_amount,client.input_borrower_assets_type),     capacity(client.references_type, client.input_borrower_loan_purpose, client.input_borrower_monthly_expenses, client.input_borrower_monthly_incomes, client.input_borrower_other_incomes, client.input_borrower_loan_amount, client.input_borower_loan_duration),     condition(client.input_borrower_loan_purpose, client.input_futur_expanses),     character(client.input_borrower_contract, client.input_borrower_diploma, client.input_borrower_habitat, client.input_borrower_employment_Duration));
		
	
	//COLLATERAL////
		//alert(collateral(client.input_borrower_property, client.input_borrower_pledge_value, client.input_borrower_bails_value, client.input_borrower_guarantee, client.input_borrower_loan_amount));

	//CAPITAL////
		//alert(asset(client.input_borrower_contribution,client.input_borrower_loan_amount,client.input_borrower_assets_type)); 
	
	//CAPACITY////
		//alert( capacity(client.references_type, client.input_borrower_loan_purpose, client.input_borrower_monthly_expenses, client.input_borrower_monthly_incomes, client.input_borrower_other_incomes, client.input_borrower_loan_amount, client.input_borower_loan_duration) ); 
	
	//CONDITIONS////
		//alert(conditions(client.input_borrower_loan_purpose, client.input_futur_expanses));	

	//CHARACTER////
		//alert(character(client.input_borrower_contract, client.input_borrower_diploma, client.input_borrower_habitat, client.input_borrower_employment_Duration));
		client.ac="save_loan_request";
		obj.post(client, obj.callback);//passage au router des données
		event.preventDefault();// Pour annuler le comportement par default d'un formulaire

	});
};

obj.disableotherincomes=function(){
	if(document.getElementById("input_borrower_other_incomes_checked").checked){
		document.getElementById('input_borrower_other_incomes').disabled=false;
	}else{
		document.getElementById('input_borrower_other_incomes').disabled=true;
		document.getElementById('input_borrower_other_incomes').value=""; // on vide ce qu'il y a dedans afin de ne rien récupérer
	}
};

obj.disablemortgage=function(){
	if(document.getElementById("input_borrower_property_value_checked").checked){
		document.getElementById('input_borrower_property_value').disabled=false;
		console.log(document.getElementById("input_borrower_property_value").value);
	}else{
		document.getElementById('input_borrower_property_value').disabled=true;
		document.getElementById('input_borrower_property_value').value=""; // on vide ce qu'il y a dedans afin de ne rien récupérer
		console.log(document.getElementById("input_borrower_property_value").value);
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

		if (r.message=="store_loan_request_ok"){
			console.log("demande de prêt 5C stocké dans la bdd");
			window.location.reload();
		}else if(r.message=="something_wrong"){
			console.log("demande de prêt 5C NON stockée");
		}else if (r.message=="nocookie"){
			window.location = "/index.html";
		}else{
			console.log(r);
			alert("Stockage refusé");
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