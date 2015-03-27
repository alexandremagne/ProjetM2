var character = function(education_level_type, housing_type, contract_type, stability_duration) {

		// l'attribut "value" dans le code html remplace tous le code ci-dessous

		/*if (education_level_type == "Doctor (+8)") education_level_type = Integer.parseInt("1");
        else if (education_level_type == "Master (+5)") education_level_type = Integer.parseInt("2");
        else if (education_level_type == "License (+3)") education_level_type = Integer.parseInt("3");
        else if (education_level_type == "Bac") education_level_type = Integer.parseInt("4");
        else if (education_level_type == "No graduate") education_level_type = Integer.parseInt("5");
        else education_level_type == 0;

        if (housing_type == "Owner") housing_type = Integer.parseInt("1");
        else if (housing_type == "Parent's house") housing_type = Integer.parseInt("2");
        else if (housing_type == "Renting") housing_type = Integer.parseInt("3");
        else if (housing_type == "Others") housing_type = Integer.parseInt("4");
        else alert("error");	

        if (contract_type == "CDI") contract_type = Integer.parseInt("1");
        else if (contract_type == "Retirement") contract_type = Integer.parseInt("2");
        else if (contract_type == "CDD") contract_type = Integer.parseInt("3");
        else if (contract_type == "Interim") contract_type = Integer.parseInt("4");
        else if (contract_type == "Internship") contract_type = Integer.parseInt("5");
        else if (contract_type == "Student") contract_type = Integer.parseInt("6");
        else if (contract_type == "Unemployed with help") contract_type = Integer.parseInt("7");
        else alert("error");*/



		if (education_level_type == 1) {												// si doctorat
			var poids_education = 30;
		}
		else if (education_level_type == 2) {											// si master
			var poids_education = 20;
		}
		else if (education_level_type == 3) {											// si license
			var poids_education = 15;
		}
		else if (education_level_type == 4) {											// si bac
			var poids_education = 5;
		}
		else {																			// si non diplome
			var poids_education = 0;
		}



		if (housing_type == 1) {														// si proprietaire
			var poids_housing = 15;
		}
		else if (housing_type == 2) {													// si parents
			var poids_housing = 10;
		}
		else if (housing_type == 3) {													// si location
			var poids_housing = 5;
		}
		else {																			// si autres
			var poids_housing = 1;
		}



		if ((contract_type == 1) || (contract_type == 2)) {								// si CDI ou retraite
			var poids_contract = 25;
		}
		else if ((contract_type == 3) || (contract_type == 4)) {						// si CDD ou Interim
			var poids_contract = 10;
		}
		else if (contract_type == 5) {													// si stage
			var poids_contract = 5;
		}
		else if (contract_type == 6) {													// si etudiant
			var poids_contract = 1;
		}
		else {																			// si chomage avec aides
			var poids_contract = -5;	
		}



		if (stability_duration > 15) {															// si > 15 ans
			var poids_stability = 30;
		}
		else if ((stability_duration <= 15) && (stability_duration > 12)) {						// si 12 - 15 ans
			var poids_stability = 15;
		}
		else if ((stability_duration <= 12) && (stability_duration > 3)) {						// si 3 - 12 ans
			var poids_stability = 10;
		}
		else {																					// si 0 - 3 ans
			var poids_stability = 5;
		}

		return(poids_education + poids_housing + poids_contract + poids_stability);
		
	}

	//test_unitaire du 14 mars 2015
	// character(1,4,2,30);
