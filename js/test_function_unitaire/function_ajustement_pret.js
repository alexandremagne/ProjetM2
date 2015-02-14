var ajustement_pret = function(monthly_incomes, monthly_expenses, loan_duration, loan_amount){

// ici rate est le taux sans riques avec taux de rendement = taux sans risque + spread de credit. Le spread = 0 pour le moment
var rate=0;
if(loan_duration<5){
	rate=2;
}else if(loan_duration>5 && loan_duration<=10){
	rate=3;
} else{
	rate=4;
}

	monthly_required= (loan_amount / ( (1- (Math.pow( (1+(rate/1200)), ((-1)*(loan_duration*12)) )) ) / (rate/1200))); // mensualités
	maximum_repayment_capacity=monthly_incomes*0.33 - monthly_expenses;
	console.log(monthly_required); // combien il veut emprunter
	console.log(maximum_repayment_capacity); // combien il peut emprunter
	var loan_allowed=maximum_repayment_capacity>monthly_required;
	if(loan_allowed){
		console.log("Prêt ACCORDE");
	} else {
		console.log("Prêt A REVOIR");
	}
}


//test unitaire valable du 14 février 2015


ajustement_pret(10000,300,10,100000); //->pret accorde
ajustement_pret(3000,300,10,10000); //->pret a revoir



