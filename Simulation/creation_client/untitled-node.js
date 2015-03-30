var fs=require('fs');


var demande_pret = function(contract_type,duration_contract,monthly_incomes,monthly_expenses,loan_duration,other_incomes){
		//client.ac="demande_stockage_pret";
		var debt_ratio = monthly_expenses/monthly_incomes<=0.66;

	if(contract_type == 1){//si c'est un CDI
		if(debt_ratio){//si ratio d'endettement <= 33%
			return 1;
			//alert("pret possible");
		}else{//si ratio d'endettement > 33%
			return 0;
			//alert("pret refusé");	
		}
	}else if(contract_type == 2 || contract_type == 4 || contract_type == 3){//CDD ou stage ou Interim
		if(loan_duration<duration_contract){//durée du pret < durée du contrat
			if(debt_ratio){//si ratio d'endettement <= 33%
				return 1;
				//alert("pret possible");
			}else{//si ratio d'endettement > 33%
				return 0;
				//alert("pas de pret possible");
			}
		}else{
			if(other_incomes == 1){// si autres revenu				
				return 2;
				//alert("type particulier");
			}else{//si pas 	d'autres revenus
				return 0;
				//alert("pas de pret possible");
			}
		}
	}else{
		return 3;
		//alert("type non répertorié");
	}
}
//var tab = new Array();
var obj_global = {};
obj_global.cdi_ok = 0;
obj_global.cdi_ko = 0;
obj_global.else_ok = 0;
obj_global.else_ko = 0;
obj_global.else_particulier = 0;
obj_global.else_error = 0;
obj_global.compteur = 0;


for(var i = 2; i<3; i++){
	for(var j = 1; j<25; j++){
		for(var k = 0; k<5000; k+=100){
			for(var l = 0; l<5000; l+=100){
				for(var m = 1; m<25 ; m++){
					for(var n = 0; n<2 ; n++){
						var obj = {};						
						obj.i = i;
						obj.j = j;
						obj.k = k;
						obj.l = l;
						obj.m = m;
						obj.n = n;
						result = demande_pret(i,j,k,l,m,n);

						if(i == 1 && result == 1){//si CDI et prêt ok
							obj_global.cdi_ok+=1;
						}else if(i == 1 && result == 0){//si CDI et prêt ko
							obj_global.cdi_ko+=1;
						}else if(i != 1 && result == 1){//si pas CDI et prêt ok
							obj_global.else_ok+=1;
						}else if(i != 1 && result == 0){//si pas CDI et prêt ko
							obj_global.else_ko+=1;
						}else if(result == 3){
							obj_global.else_error+=1;
						}else if(result== 2){
							obj_global.else_particulier+=1;
						}
						//tab.push(obj);
						obj_global.compteur +=1;
						console.log(obj_global.compteur);
										
					}
				}
			}
		}
	}
}

obj_global.cdi_ok = obj_global.cdi_ok/obj_global.compteur*100;
obj_global.cdi_ko = obj_global.cdi_ko/obj_global.compteur*100;
obj_global.else_ok = obj_global.else_ok/obj_global.compteur*100;
obj_global.else_ko = obj_global.else_ko/obj_global.compteur*100;
obj_global.else_particulier = obj_global.else_particulier/obj_global.compteur*100;
obj_global.else_error = obj_global.else_error/obj_global.compteur*100;

 fs.writeFileSync("./dataSG.csv", JSON.stringify(obj_global));