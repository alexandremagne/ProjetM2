// Cette fonction calcul une pondération pour la capacité.
// Elle récupère 3 champs du formulaire: Contribution, TYpe of bank account et Loan amount needed
// Les trois champs qu'elle récupère sont en rouge dans le formulaire de la page client.html

var asset = function(contribution, loan_amount, assets_type) {
		
		var division = contribution / loan_amount;
		if (division >= 0.2) {								// si capital => 0.2 montant du prêt
			var poids_1 = 60;
			alert(poids_1);
			if (assets_type == 1) {								// si CC + epargne
				var poids_10 = 40;
				alert(poids_1 + poids_10);
			}
			else if(assets_type == 2) {							// si CC
				var poids_11 = 25;
				alert(poids_1 + poids_11);
			}
			else if(assets_type == 3) {							// si epargne
				var poids_12 = 15;
				alert(poids_1 + poids_12);
			}
			else {												// si aucun
				var poids_13 = 0;
				alert(poids_1 + poids_13);
			}
		}

		else {												// si capital <= 0.2 montant du prêt
			var poids_2 = -10;
			alert(poids_2)
			if (assets_type == 1) {								// si CC + epargne
				var poids_20 = 40;
				alert(poids_2 + poids_20);
			}

			else if(assets_type == 2) {							// si CC
				var poids_21 = 25;
				alert(poids_2 + poids_21);
			}
			else if(assets_type == 3) {							// si epargne
				var poids_22 = 15;
				alert(poids_2 + poids_22);
			}
			else {												// si aucun
				var poids_23 = 0;
				alert(poids_2 + poids_23);
			}
		}
	}

