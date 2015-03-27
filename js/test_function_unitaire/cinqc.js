var cinqc=function(collateral_user, capital_user, capacity_user, condition_user, character_user ){
	
	console.log("fonction 5c");
	console.log("collateral_user: " + collateral_user + " capital_user : " + capital_user + " capacity_user : " + capacity_user + " condition_user : " + condition_user + " character_user : " + character_user);

	var obj5c={};

	//Coefficients à appliquer au 5c
	var coef5c = {
		'collateral': 0.277639752,
		'capital': 0.273291925,
		'capacity': 0.273291925,
		'condition': 0.076397516,
		'character': 0.144720497
	};
	console.log("coef5c.collateral : " + typeof(coef5c.collateral));
	console.log("collateral_user : " + typeof(collateral_user));
	console.log("character_user : " + typeof(character_user));


	obj5c.collateral=coef5c.collateral*(parseInt(collateral_user)/100);
	obj5c.capital=coef5c.capital*(parseInt(capital_user)/100);
	obj5c.capacity=coef5c.capacity*(parseInt(capacity_user)/100);
	obj5c.condition=coef5c.condition*(parseInt(condition_user)/100);
	obj5c.character=coef5c.character*(parseInt(character_user)/100);

	obj5c.default_probability= 1 - obj5c.collateral-obj5c.capital-obj5c.capacity-obj5c.condition-obj5c.character;
	console.log("probabilité de défaut du client : " + (obj5c.default_probability*100) + "%");
	if(obj5c.default_probability<0)
		obj5c.default_probability=0;

	obj5c.collateral=collateral_user/100;
	obj5c.capital=capital_user/100;
	obj5c.capacity=capacity_user/100;
	obj5c.condition=capacity_user/100;
	obj5c.character=character_user/100;

	console.log("probabilité de défaut du client : " + (obj5c.default_probability) + "%");

	return obj5c; // on retourne tout l'objet de manière a afficher un spider graph
};