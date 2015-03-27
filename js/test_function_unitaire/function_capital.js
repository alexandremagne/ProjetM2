//var fs=require("fs");
// Cette fonction calcul une pondération pour la capacité.
// Elle récupère 3 champs du formulaire: Contribution, TYpe of bank account et Loan amount needed
// Les trois champs qu'elle récupère sont en rouge dans le formulaire de la page client.html

var asset = function(contribution, loan_amount, assets_type) {
		
		var division = contribution / loan_amount;
		if (division >= 0.2) {								// si capital => 0.2 montant du prêt
			var poids_1 = 60;
			//alert(poids_1);
			if (assets_type == 1) {								// si CC + epargne
				var poids_10 = 40;
				//alert(poids_1 + poids_10);
				return (poids_1+poids_10);
			}
			else if(assets_type == 2) {							// si CC
				var poids_11 = 25;
				//alert(poids_1 + poids_11);
				return (poids_1+poids_11);
			}
			else if(assets_type == 3) {							// si epargne
				var poids_12 = 15;
				//alert(poids_1 + poids_12);
				return (poids_1+poids_12);
			}
			else {												// si aucun
				var poids_13 = 0;
				//alert(poids_1 + poids_13);
				return (poids_1+poids_13);
			}
		}

		else {												// si capital <= 0.2 montant du prêt
			var poids_2 = -10;
			//alert(poids_2)
			if (assets_type == 1) {								// si CC + epargne
				var poids_20 = 40;
				//alert(poids_2 + poids_20);
				return (poids_2+poids_20);
			}

			else if(assets_type == 2) {							// si CC
				var poids_21 = 25;
				//alert(poids_2 + poids_21);
				return (poids_2+poids_21);
			}
			else if(assets_type == 3) {							// si epargne
				var poids_22 = 15;
				//alert(poids_2 + poids_22);
				return (poids_2+poids_22);
			}
			else {												// si aucun
				var poids_23 = 0;
				//alert(poids_2 + poids_23);
				return (poids_2+poids_23);
			}
		}
	}

/*
var tab = new Array();
var compteur=0;
for(var i=1; i<10000000; i+=5000){
	for(var j=1; j<10000000; j+=100000){
		for(var k=0; k<=3; k++){
			var obj={};
			obj.i=i;
			obj.j=j;
			obj.k=k;
			obj.division=i/j;
			obj.result=asset(i,j,k);
			tab.push(obj); //[{},{}]
			console.log(compteur++);
		}
	}
}

fs.writeFile('capacite.txt', JSON.stringify(tab), function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});
*/
