
	var collateral = function(properties_type, pledges_type, bails_type, guarantee_type, loan_amount) {

		//on attribue en fonction des paramètres rentrés par l'user, des valeurs pour affecter une pondération. Celle-ci est encore très simpliste
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		if(properties_type=="yes"){
			properties_type=parseInt("1");
			console.log(properties_type);
		}
		else if(properties_type=="no"){
			properties_type=parseInt("0");
			console.log(properties_type);
		}

		if(guarantee_type=="yes"){
			guarantee_type=parseInt("1");
			console.log(guarantee_type);
		}
		else if(guarantee_type=="no"){
			guarantee_type=parseInt("0");
			console.log(guarantee_type);
		}

		if(pledges_type>= (0.2*loan_amount))
			pledges_type=1;
		else 
			pledges_type=0;

		if(bails_type>=(0.2*loan_amount))
			bails_type=1;
		else
			bails_type=0;


		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////


		if (properties_type == 1) {												// si hypotheque
			var poids_1 = 40;
			//(poids_1);
			if (pledges_type == 1) {												// si investissement
				var poids_11 = 30;
				//(poids_1 + poids_11);
				if (bails_type == 1) {													// si caution
					var poids_111 = 15;
					//(poids_1 + poids_11 + poids_111);									
					if (guarantee_type == 1) {												// si garantie
						var poids_1111 = 15;
						return(poids_1 + poids_11 + poids_111 + poids_1111);
					}
					else {																	// si aucune garantie
						var poids_1112 = 0;
						return(poids_1 + poids_11 + poids_111 + poids_1112);					
					}
				}
				else {																	// si aucune caution
					var poids_112 = 0;
					//(poids_1 + poids_11 + poids_112);
					if (guarantee_type == 1) {												// si garantie
						var poids_1121 = 15;
						return(poids_1 + poids_11 + poids_112 + poids_1121);
					}
					else {																	// si aucune garantie
						var poids_1122 = 0;
						return(poids_1 + poids_11 + poids_112 + poids_1122);					
					}						
				}
			}
			else {																	// si aucun investissement
				var poids_12 = 0;
				//(poids_1 + poids_12);
				if (bails_type == 1) {													// si caution
					var poids_121 = 15;
					//(poids_1 + poids_12 + poids_121);
					if (guarantee_type == 1) {												// si garantie
						var poids_1211 = 15;
						return(poids_1 + poids_12 + poids_121 + poids_1211);
					}
					else {																	// si aucune garantie
						var poids_1212 = 0;
						return(poids_1 + poids_12 + poids_121 + poids_1212);					
					}	
				}
				else {																	// si aucune caution
					var poids_122 = 0;
					//(poids_1 + poids_12 + poids_122);
					if (guarantee_type == 1) {												// si garantie
						var poids_1221 = 15;
						return(poids_1 + poids_12 + poids_122 + poids_1221);
					}
					else {																	// si aucune garantie
						var poids_1222 = 0;
						return(poids_1 + poids_12 + poids_122 + poids_1222);					
					}						
				}
			}
		}

		else {															// si aucune hypotheque
			var poids_2 = 0;
			//(poids_2);
			if (pledges_type == 1) {												// si investissement
				var poids_21 = 30;
				//(poids_2 + poids_21);
				if (bails_type == 1) {													// si caution
					var poids_211 = 15;
					//(poids_2 + poids_21 + poids_211);
					if (guarantee_type == 1) {												// si garantie
						var poids_2111 = 15;
						return(poids_2 + poids_21 + poids_211 + poids_2111);
					}
					else {																	// si aucune garantie
						var poids_2112 = 0;
						return(poids_2 + poids_21 + poids_211 + poids_2112);					
					}
				}
				else {																	// si aucune caution
					var poids_212 = 0;
					//(poids_2 + poids_21 + poids_212);
					if (guarantee_type == 1) {												// si garantie
						var poids_2121 = 15;
						return(poids_2 + poids_21 + poids_212 + poids_2121);
					}
					else {																	// si aucune garantie
						var poids_2122 = 0;
						return(poids_2 + poids_21 + poids_212 + poids_2122);					
					}						
				}
			}
			else {																	// si aucun investissement
				var poids_22 = 0;
				//(poids_2 + poids_22);
				if (bails_type == 1) {													// si caution
					var poids_221 = 15;
					//(poids_2 + poids_22 + poids_221);
					if (guarantee_type == 1) {												// si garantie
						var poids_2211 = 15;
						return(poids_2 + poids_22 + poids_221 + poids_2211);
					}
					else {																	// si aucune garantie
						var poids_2212 = 0;
						return(poids_2 + poids_22 + poids_221 + poids_2212);					
					}
				}
				else {																	// si aucune caution
					var poids_222 = 0;
					//(poids_2 + poids_22 + poids_222);
					if (guarantee_type == 1) {												// si garantie
						var poids_2221 = 15;
						return(poids_2 + poids_22 + poids_222 + poids_2221);
					}
					else {																	// si aucune garantie
						var poids_2222 = 0;
						return(poids_2 + poids_22 + poids_222 + poids_2222);					
					}						
				}
			}
		}

	}
			
	//collateral(0,0,0,0);

