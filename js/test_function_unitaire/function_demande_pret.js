
// cette fonction est une première barrière avant d'aller plus loin dans le formulaire.
// EN effet si la demande de prêt n'est PAS favorable, on refuse le prêt. => Il ne s'agit pas encore des 5C, il n'y a pas de pondérations à ce stade.
// Si la demande de prêt est FAVORABLE, on poursuit le formulaire, et on utilise les 5C 

var demande_pret = function(contract_type,duration_contract,monthly_incomes,monthly_expenses,loan_duration,other_incomes){
		client.ac="demande_stockage_pret";
		var debt_ratio = monthly_expenses/monthly_incomes<=0.33;		
	if(contract_type == 1){//si c'est un CDI
		if(debt_ratio){//si ratio d'endettement <= 33%
			console.log("pret possible");
			alert("pret possible");
		}else{//si ratio d'endettement > 33%
			console.log("pret refusé");
			alert("pret refusé");	
		}
	}else if(contract_type == 2 || contract_type == 4 || contract_type == 3){//CDD ou stage ou Interim
		if(loan_duration<duration_contract){//durée du pret < durée du contrat
			if(debt_ratio){//si ratio d'endettement <= 33%
				console.log("pret possible");
				alert("pret possible");
			}else{//si ratio d'endettement > 33%
				console.log("pas de pret possible");
				alert("pas de pret possible");
			}
		}else{
			if(other_incomes){// si autres revenu
				console.log("type particulier");
				alert("type particulier");
			}else{//si pas 	d'autres revenus
				console.log("pas de pret possible");
				alert("pas de pret possible");
			}
		}
	}else{
		console.log("type non répertorié");
		alert("type non répertorié");
	}
	obj.post(client, obj.callback);//passage au router des données



}

//test unitaire valable du 14 février 2015
/*

demande_pret(1,0,10000,3000,12,false); //->pret possible
demande_pret(1,0,4000,3000,12,false); //-> pret refusé
demande_pret(2,6,4000,3000,12,false); //-> pas de pret possible
demande_pret(2,6,4000,3000,12,true); //-> type particulier
demande_pret(2,6,4000,3000,3,true); //-> pas de pret possible
demande_pret(2,6,10000,3000,3,true); //-> pret possible

*/