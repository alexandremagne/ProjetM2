/*
		UNE SEULE FONCTION POST ET UNE SEULE CALLBACK PAR PAGE POUR UNE LISIBILITE ET COMPREHENSION PLUS FACILE

		CHANGER JUSTE LE MESSAGE DE RETOUR DU ROUTER POUR COMPRENDRE CE QUIL SE PASSE
*/

var index = {}; // objet contenant toutes nos fonctions
var data = {}; //objet : transmettre au routeur
var contenuHTML = {};//objet qui va contenir temporairement le code html (du bouton login par exemple)

// fonction appelée au chargement de la page (voir window.onload au bas de la page)
index.start = function () {
	
	var r2 = new RegExp(/^[a-z\u00E0-\u00FC]+$/i) // regexsui accepte uniquement les lettres et accents	
	console.log(r2.test("Rémi"));

	index.btn_login_formulaire_();//formulaire du login
	index.btn_register_formulaire_();//formulaire du register
	index.btn_button_calculator_();//formulaire du calculator

	index.regozoo();

};

index.btn_register_formulaire_ = function(){
	$( "#register_formulaire_" ).submit( function(event){
	index.data_register_();
	index.replace_content_by_animation_GIF_loader("button_register");//pour remplacer le bouton par un chargement
	index.post(data, index.callback);//passage au router des données
	//$('#modal-reg').modal('hide');
	 event.preventDefault();//à laisser
	} );
};

index.data_register_ = function(){
	//objet data pour register
	data.ac = "register_process_"; // action a traité pour le routeur

	data.name = document.getElementById('register_name').value;
	data.firstname = document.getElementById('register_firstname').value;

	data.register_birthdate_day = document.getElementById('register_birthdate_day').value;
	data.register_birthdate_month = document.getElementById('register_birthdate_month').value;
	data.register_birthdate_year = document.getElementById('register_birthdate_year').value;

	data.male = document.getElementById("register_male").checked;
	data.email = document.getElementById('register_email').value;
	data.pwd = document.getElementById('register_password').value;
	data.c_pwd = document.getElementById('register_confirm_password').value;
	
};



index.btn_login_formulaire_ = function(){
	//ce quil se passe quand on appuie sur le bouton login
	$( "#log_in_formular_" ).submit( function(event){
	 index.data_login(); //action pour remplir data	 
	 index.replace_content_by_animation_GIF_loader("button_login");//pour remplacer le bouton par un chargement
	 index.post(data, index.callback);//passage au router des données
	 event.preventDefault();//à laisser
	} );
};

index.data_login = function(){
	//pour remplir l'objet data avec le username et password et l'action à réaliser pour le router
	data.ac = "login_process_"; // action a traité pour le routeur
	data.userName = document.getElementById('input_username_').value.toLowerCase();
	data.password = document.getElementById('input_password_').value;
};

index.btn_button_calculator_ = function(){
	//ce quil se passe quand on appuie sur le bouton check du calculator
	$( "#check_formulaire_" ).submit( function(event){
	 index.data_calculator(); //action pour remplir data	 
	// index.replace_content_by_animation_GIF_loader("button_calculator");//pour remplacer le bouton par un chargement
	 //index.post(data, index.callback);//passage au router des données
	 event.preventDefault();//à laisser
	} );
};

index.data_calculator = function(){
	//pour remplir l'objet data avec le montant, year, rate et l'action à réaliser pour le router ???????????????
	//data.ac = "calculator_"; // action a traité pour le routeur
	data.amount = parseInt(document.getElementById('input_loan_amount_').value.replace(/ /g,""));
	data.duration = parseInt(document.getElementById('input_loan_duration_').value);
	data.rate = parseFloat(document.getElementById('input_interest_rate_').value);
	console.log("Vos trois valeurs: " + data.amount + " " + data.duration + " " + data.rate);
	index.calculation_of_monthly_payments(data.amount, data.duration, data.rate);
};

index.calculation_of_monthly_payments=function(amount, duration, rate){
	//console.log(rate/1200);
	var result= (amount / ( (1- (Math.pow( (1+(rate/1200)), ((-1)*(duration*12)) )) ) / (rate/1200)));
	credit_cost=((result*12*duration)-amount);
	//<h3>Example heading <span class="label label-default">New</span></h3>
	var string_result="<h3>Your monthly repayment: <span class=\"label label-success\">"+ Math.round(result*100)/100 +"€</span></h3><h3>Total cost of the credit: <span class=\"label label-success\">"+ Math.round(credit_cost*100)/100+" €</span></h3>";
	document.getElementById("result_calculator").innerHTML=string_result;
	console.log(result);
};

document.getElementById("input_loan_amount_").onkeyup=function(){
		index.regexnumber();
};

document.getElementById("input_loan_duration_").onkeyup=function(){
		index.regexnumber2();
};


document.getElementById("input_loan_amount_").onblur=function(){
	console.log("onblur");
	var nombre_separe=index.lisibilite_nombre(document.getElementById("input_loan_amount_").value);
	document.getElementById("input_loan_amount_").value=nombre_separe;
};
	

index.lisibilite_nombre=function (nbr) {
	console.log("visibilit");
		var nombre = ''+nbr;
		var retour = '';
		var count=0;
		for(var i=nombre.length-1 ; i>=0 ; i--)
		{
			if(count!=0 && count % 3 == 0)
				retour = nombre[i]+' '+retour ;
			else
				retour = nombre[i]+retour ;
			count++;
		}
		//alert('nb : '+nbr+' => '+retour);
		return retour;
};

index.regexnumber=function(){
	var exp = new RegExp("[^0-9]","gi");
	document.getElementById("input_loan_amount_").value=document.getElementById("input_loan_amount_").value.replace(exp,"");
};

index.regexnumber2=function(){
	var exp = new RegExp("[^0-9]","gi");
	document.getElementById("input_loan_duration_").value=document.getElementById("input_loan_duration_").value.replace(exp,"");
	var duration= parseInt(document.getElementById("input_loan_duration_").value);
	if(duration>25){
		document.getElementById('input_loan_duration_').value="25";
	} else if (duration<=0){
		document.getElementById('input_loan_duration_').value="1";
	}

};


index.regozoo=function(){
	console.log("fct_internet");
	var half = 1/2;
 
	/*
	 * On détermine le séparateur décimal du système (O.S.) de l'utilisateur
	 * et on impose la valeur de dec et d'alpha en fonction des besoins.
	 * Si le résultat contient une virgule le séparateur
	 * décimal est la virgule sinon le point.
	 */
	var dec = (half.toString().match(/,/)) ? ',' : '.';
 
	// Par opposition, on détermine celui qui ne l'est pas.
	var alpha = (dec == '.') ? ',' : '.';
 
	/*
	 * On teste, au moment de la frappe, chaque caractère saisi
	 * par l'utilisateur et on apporte les corrections nécessaires.
	*/ 
	$('.rate').keyup(function(){
		console.log("on push");
		var field = $(this);
		var valNum = field.val();
 
		/*
		 * On remplace le non séparateur par le séparateur.
		 * Si la chaîne commence par le séparateur, on met un zéro devant.
		 */ 
		valNum = valNum.replace(new RegExp("["+alpha+"]"), dec);
		valNum = valNum.replace(new RegExp("^["+dec+"]"), '0.');
 
		if (valNum != ''){
			/*
			 * Si la chaîne est au format monétaire (9999.99)
			 * alors on ne change rien
			 * sinon on teste si la chaîne comporte d'autres caractères que de 0 
			 * à 9 ou le séparateur
			 * alors, s'il la chaîne comporte d'autres caractères, on les supprime
			 * sinon on limite le nombre de décimales à 2
			 */ 
			valNum = (new RegExp("^[0-9]+("+dec+"[0-9]{,2})?$").test(valNum))
			       ? valNum 
			       : (valNum.match(new RegExp("[^0-9"+dec+"]"))) 
				    ? valNum.replace(new RegExp("[^0-9"+dec+"]","g"),'') 
				    : valNum.match(new RegExp("^[0-9]+(["+dec+"][0-9]{0,2})?"))[0];
		}
 
		field.val(valNum);
	});
 
	// On s'assure du format de la saisie en fixant le nombre de décimales à 2
	$('.rate').blur(function(){

		var rate_loan= parseInt(document.getElementById("input_interest_rate_").value);
			if(rate_loan>100){
				document.getElementById('input_interest_rate_').value="100";
			} else if (rate_loan<=0){
				document.getElementById('input_interest_rate_').value="0";
			}

		var field = $(this);
		var valNum = (field.val() * 1).toFixed(2);

		
 
		field.val(valNum);
	});

	
};


index.post = function (data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};

// fonction de retour pour notre objet index
index.callback = function () {
	// si tout s'est bien passé
	if (this.readyState == 4 && this.status == 200) {
		console.log("this.responsetext :" + this.responseText);
		var r = JSON.parse(this.responseText); // conversion string en Objet JSON
		/***
			LOGIN CALLBACKS
		*/
		if (r.message=="login_connexion_autorised_admin_"){
			window.location = "./html/private/admin.html"; // JE RENVOIE L'ADMIN VERS LA PAGE CLIENT POUR LE MOMENT CAR PAS DE PAGE ADMIN ENCORE TODO
		}else if(r.message=="login_connexion_autorised_client_"){
			window.location = "./html/public/client.html";
		}else if (r.message=="login_connexion_refused"){
			document.getElementById(contenuHTML.id).innerHTML = contenuHTML.string;//pour remettre le bouton originel (car gif qui tourne)
			index.mettre_les_cases_en_rouges_du_formulaire("boites_pour_entrer_les_login_");
			alert("Erreur de connexion");
		}/***
			REGISTER CALLBACKS
		*/
		else if(r.message=="register_doublon"){
			console.log("doublon dans la bdd sur le mail"); // clé unique sur l'email
			document.getElementById(contenuHTML.id).innerHTML = contenuHTML.string;//pour remettre le bouton originel (car gif qui tourne)
		}else if(r.message=="register_ok"){
			console.log("register ok");
			document.getElementById(contenuHTML.id).innerHTML = contenuHTML.string;//pour remettre le bouton originel (car gif qui tourne)
		}
		else{
			console.log(r);
			document.getElementById(contenuHTML.id).innerHTML = contenuHTML.string;//pour remettre le bouton originel (car gif qui tourne)
			alert("demande  rejetée !");
		}
}
};

index.replace_content_by_animation_GIF_loader = function(id){
	contenuHTML.string = document.getElementById(id).innerHTML; // objet contenuHTML créé en haut du doc
	contenuHTML.id = id;
	document.getElementById(id).innerHTML = '<img src="./images/gif_loader/loading_connexion.gif" style="height:auto width:auto" >';
	
	// script qui simule l'evenement clique sur un bouton (ici celui qui lance le modal dans le fichier index.html
	/*var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
	document.getElementById("bt1").dispatchEvent(evt);*/
};

index.mettre_les_cases_en_rouges_du_formulaire = function(classname){
	/*
	prend en paramettre le classname
	et ajoute has error a la classe pour dire que c pas bon et entoure la case en rouge
	*/
	var arr =document.getElementsByClassName(classname);
	if(arr.length>0){
		for(i=0;i<arr.length;i++){
			arr[i].className=arr[i].className+" has-error";
		}
	}
	return;
};

window.onload = function(){
		setTimeout(index.start, 1);
};



index.btn_check_information_for_loan_demand_ = function(){
	//ce quil se passe quand on appuie sur le bouton check
	$( "#check_formulaire_" ).submit( function(event){
		index.fill_data_loan_demand_individual_client_(); // voir fonction plus bas
	 	index.post(data, index.callback);
	 	event.preventDefault(); // On désactive le fonctionnement par défault du bouton. Ainsi en cliquant dessus, on ne recharge pas la page
	});
};

index.fill_data_loan_demand_individual_client_ = function(){
	data.ac="envoie_demande_de_pret_individuelle_";
	data.input_borrowed_capital_ = document.getElementById('input_borrowed_capital_').value;
	data.input_age_of_demander_ = document.getElementById('input_age_of_demander_').value;
	data.input_annual_incomes_ = document.getElementById('input_annual_incomes_').value;
	data.input_duration_loan_in_years_ = document.getElementById('input_duration_loan_in_years_').value;
};