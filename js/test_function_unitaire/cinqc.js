var cinqc=function(collateral_user, capacity_user){
	
	console.log("fonction 5c");
	var obj5c={};
	//Coefficients à appliquer au 5c
	var coef5c = {
		'capacity': 0.273291925,
		'capital': 0.273291925,
		'collateral': 0.277639752,
		'condition': 0.076397516,
		'caractere': 0.144720497
	};

	obj5c.collateral=coef5c.collateral*collateral_user;
	obj5c.capacity=coef5c.capacity*capacity_user;
	obj5c.default_probability=1-obj5c.collateral+obj5c.capacity;

	console.log("proba default: " + obj5c.default_probability);

	return obj5c;
};