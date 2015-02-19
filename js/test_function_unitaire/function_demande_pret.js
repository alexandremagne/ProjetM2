var demande_pret = function(contract_type,duration_contract,monthly_incomes,monthly_expenses,loan_duration,other_incomes){
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