
        var capacity = function(references_type, purposes_type, monthly_expenses, monthly_incomes, others_incomes, loan_amount, loan_duration) {


            // Nouvelles dépenses qui incluent la demande de prêt actuelle, nous devons donc actuzaliser et mensualiser la demande de prêt
            var new_monthly_debt_expenses=parseInt(monthly_expenses) + calculation_of_monthly_payments(loan_amount, loan_duration, 3);
            console.log("Nouvelles depenses mensuelles incluant le pret demandé " + new_monthly_debt_expenses); // REMARQUE: TODO le rate est a déduire d'une matrice de taux dépendant de la durée du pret
            
            var new_monthly_debt_expenses = parseInt(monthly_expenses) + parseInt((loan_amount/(loan_duration*12)));
            var new_debts_ratio = ((new_monthly_debt_expenses/(monthly_incomes+others_incomes)) < (1/3)); // ratio d'endettement (pret inclus)
            console.log("Nouveau debt ration incluant les autres revenus : " + new_debts_ratio);
          
            if (references_type == "plus de deux bonnes references") 
                references_type = parseInt("1");
            else if (references_type == "une ou deux bonne(s) reference(s)")
                references_type = parseInt("2");
            else if (references_type == "aucune bonne reference")
                references_type = parseInt("3");
            else if (references_type == "reporte")
                references_type = parseInt("4");
            else 
                references_type=parseInt("0"); // error

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


            if (references_type == 1) {                                                                             // si + de 2 bonnes references
                var poids_references = 15;
                console.log(poids_references);
            }
            else if(references_type == 3) {                                                                         // si 2 <= bonnes references < 0
                var poids_references = 5;
            }
            else if(references_type == 4) {                                                                         // si aucune bonne reference
                var poids_references = 0;
            }
            else {                                                                                                  // si reporte
                var poids_references = -10; 
            }


            if (purposes_type == 1) {    
            console.log(poids_purposes);                                                                           // si auto-financement
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


            if (new_debts_ratio) {                                                                             // si ratio d'endettement < 1/3
                var poids_debts = 40;
                console.log("poids_debts");
                console.log(poids_debts); 
            }
            else {                                                                                                  // si ration d'endettement > 1/3
                var poids_debts = -10;    
            }


            if (loan_amount <= 1000) {                                                                              // si montant prêt <= 1k
                var poids_amount = 20;
                console.log("poids_amount");
                 console.log(poids_amount);
            }
            else if ((loan_amount > 1000) && (loan_amount <= 10000)) {                                              // si 1k < montant prêt <= 10k
                var poids_amount = 10;
            }
            else if ((loan_amount > 10000) && (loan_amount <= 100000)) {                                            // si 10k < montant prêt <= 100k
                var poids_amount = 5;
            }
            else {                                                                                                  // si 10k < montant prêt <= 100k
                var poids_amount = 1;
            }


            if (loan_duration <= 1) {                                                                               // si durée prêt <= 1 an
                var poids_duration = 15;
                 console.log("poids_duration");
                 console.log(poids_duration);
            }
            else if ((loan_duration > 1) && (loan_duration <= 2)) {                                                 // si 1 < durée prêt <= 2 ans
                var poids_duration = 10;
            }
            else if ((loan_duration > 2) && (loan_duration <= 5)) {                                                 // si 2 < durée prêt <= 5 ans
                var poids_duration = 5;
            }
            else if ((loan_duration > 5) && (loan_duration <= 10)) {                                                // si 5 < durée prêt <= 10 ans
                var poids_duration = 2;
            }
            else {                                                                                                  // si durée prêt > 10 ans
                var poids_duration = 1;
            }

            console.log("retour de function capacity : ");
            console.log(poids_debts);
            console.log(poids_references);
            console.log(poids_purposes);
            console.log(poids_amount);
            console.log(poids_duration);
            return(poids_debts + poids_references + poids_purposes + poids_amount + poids_duration);
            
    };


var calculation_of_monthly_payments = function(amount, duration, rate){
    //console.log(rate/1200);
    var variables_formule= {};
        if(rate!=0){
            variables_formule.result= (amount / ( (1- (Math.pow( (1+(rate/1200)), ((-1)*(duration*12)) )) ) / (rate/1200))); // mensualités
            variables_formule.credit_cost=((variables_formule.result*12*duration)-amount); // Intérets
        } else {
            variables_formule.result= (amount / (12*duration));
            variables_formule.credit_cost=((variables_formule.result*12*duration)-amount);
        }
    
    console.log("Dépenses mensuelles du pret demandé " + variables_formule.result);
    return variables_formule.result;
   
};

        //capacity(4,3,500,500,3000,101,0.5);
