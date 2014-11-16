// DOCUMENT PARTIE SERVEUR 

var db = require("../db.js");

// var data_algo = {};

exports.calcul_autorisation = function(borrowed_capital, age_of_demander, annual_incomes, duration_loan_in_years, rep){
		console.log("Accès au fichier algo.js");
		db.stock_autorisation(borrowed_capital, rep);
};