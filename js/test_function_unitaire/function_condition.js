 var condition = function(purposes_type, futur_expanses) {


    	if(futur_expanses=="yes")
    		var poids_futur_expanses=parseInt("-10");
    	else if(futur_expanses=="no")
    		var poids_futur_expanses=parseInt("90");
    	else
    		var poids_futur_expanses=parseInt("0");


    	if (purposes_type == "Consumption credit") 
                purposes_type = parseInt("1");
            else if (purposes_type == "Buy property (New building)") 
                purposes_type = parseInt("2");
             else if (purposes_type == "Buy property (Old building)") 
                purposes_type = parseInt("3");
            else if (purposes_type == "Buy Car / vehicles") 
                purposes_type = parseInt("4");
            else if (purposes_type == "Others") 
                purposes_type = parseInt("5");
            else 
                 purposes_type = parseInt("0"); // error
             
 			if (purposes_type == 1) {                                                                               // si auto-financement
                var poids_purposes = 10;
            }
            else if(purposes_type == 2) {                                                                           // si immobilier
                var poids_purposes = 7;
            }
            else if(purposes_type == 3) {                                                                           // si immobilier
                var poids_purposes = 5;
            }
            else if(purposes_type == 4) {                                                                           // si automobile
                var poids_purposes = 3;
            }
            else {                                                                                                  // si autre but
                var poids_purposes = 1; // Others
            }

            return(poids_purposes + poids_futur_expanses);
    };