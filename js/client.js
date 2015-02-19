include('../../js/test_function_unitaire/function_demande_pret.js');

var obj = {}; // objet contenant toutes nos fonctions
var client = {}; // objet qui contiendra tous les champs des formulaires utile pour le scoring

// appelée au chargement de la page (2/3)
obj.start=function(){
	obj.check_loan(); // bouton de demande de prêt
};

// appelée au chargement de la page (3/3)
obj.check_loan=function(){		
	$("#check_formulaire_").submit(function(event){

		var input_borrower_loan_amount = document.getElementById("input_borrower_loan_amount").value;
		var input_borrower_annual_incomes = document.getElementById("input_borrower_annual_incomes").value;
		var input_borower_loan_duration = document.getElementById("input_borower_loan_duration").value;
		var input_borrower_monthly_expenses = document.getElementById("input_borrower_monthly_expenses").value;
		var input_borrower_contract = document.getElementById("input_borrower_contract").value;
		var input_borrower_employment_Duration = document.getElementById("input_borrower_employment_Duration").value;
		var input_borrower_other_incomes_checked = document.getElementById("input_borrower_other_incomes_checked").checked;
		
		event.preventDefault();// Pour annuler le comportement par default d'un formulaire

		// vérifier si on peut demander un pret (donc ne prend pas en compte le montant du prêt)
		demande_pret(input_borrower_contract,input_borrower_employment_Duration,input_borrower_annual_incomes/12,input_borrower_monthly_expenses,input_borower_loan_duration,input_borrower_other_incomes_checked); //->pret possible

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

//pour inclure un fichier js
function include(fileName){
document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
};


// appelé au chargement de la page (1/3)
window.onload=function(){
	setTimeout(obj.start,1);
};