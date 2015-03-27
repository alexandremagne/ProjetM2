 var condition = function(purposes_type, futur_expanses) {
    var poids_futur_expanses = 0;
    var poids_purposes = 0;

    	if(futur_expanses=="yes")
    		poids_futur_expanses=parseInt("-10");
    	else if(futur_expanses=="no")
    		poids_futur_expanses=parseInt("90");
    	else
    		poids_futur_expanses=parseInt("0");


    	if (purposes_type == "Consumption credit") 
                poids_purposes = 10;
            else if (purposes_type == "Buy property (New building)") 
                poids_purposes = 7;
             else if (purposes_type == "Buy property (Old building)") 
                poids_purposes = 5;
            else if (purposes_type == "Buy Car / vehicles") 
                poids_purposes = 3;
            else if (purposes_type == "Others") 
                poids_purposes = 1; // Others
            else 
                 poids_purposes = 1; // Others           

            return(poids_purposes + poids_futur_expanses);
    };