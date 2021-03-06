/*
		UNE SEULE FONCTION POST ET UNE SEULE CALLBACK PAR PAGE POUR UNE LISIBILITE ET COMPREHENSION PLUS FACILE

		CHANGER JUSTE LE MESSAGE DE RETOUR DU ROUTER POUR COMPRENDRE CE QUIL SE PASSE
*/

var index = {}; // objet contenant toutes nos fonctions
var data = {}; //objet : transmettre au routeur
var contenuHTML = {};//objet qui va contenir temporairement le code html (du bouton login par exemple)
var variables_formule ={};

// fonction appelée au chargement de la page (voir window.onload au bas de la page)
index.start = function () {
	var r2 = new RegExp(/^[a-z\u00E0-\u00FC]+$/i) // regexsui accepte uniquement les lettres et accents	
	index.btn_login_formulaire_();//formulaire du login
	index.btn_register_formulaire_();//formulaire du register
	index.btn_button_calculator_();//formulaire du calculator

	index.regozoo();

};

index.btn_register_formulaire_ = function(){
	$( "#register_formulaire_" ).submit( function(event){
	if(document.getElementById('register_password').value != document.getElementById('register_confirm_password').value){//si pwd != confirm pwd
		document.getElementById('problem_confirm_pwd').innerHTML="<strong>You have entered different passwords!</strong>";//on affiche le message d'erreur
		document.getElementById('couleur_register_pwd').className="form-group col-md-6 has-error";//mettre case en rouge pwd et c pwd
		document.getElementById('couleur_register_confirm_pwd').className="form-group col-md-6 has-error";
	}else{//pwd et confirm password sont les même
		document.getElementById('problem_confirm_pwd').innerHTML="";//on supprime le message d'erreur au cas où il y ait
		document.getElementById('couleur_register_pwd').className="form-group col-md-6 has-success";//mettre case en vert pwd et c pwd
		document.getElementById('couleur_register_confirm_pwd').className="form-group col-md-6 has-success";
		index.data_register_();
		index.replace_content_by_animation_GIF_loader("button_register");//pour remplacer le bouton par un chargement
		index.post(data, index.callback);//passage au router des données
		//$('#modal-reg').modal('hide');
	}
	 event.preventDefault();//à laisser
	});

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
	var amount = parseInt(document.getElementById('input_loan_amount_').value.replace(/ /g,""));
	var duration = parseInt(document.getElementById('input_loan_duration_').value);
	var rate = parseFloat(document.getElementById('input_interest_rate_').value);
	index.calculation_of_monthly_payments(amount, duration, rate);	
	 event.preventDefault();
	} );
};

index.calculation_of_monthly_payments=function(amount, duration, rate){
	//console.log(rate/1200);
	if(rate!=0){
		variables_formule.result= (amount / ( (1- (Math.pow( (1+(rate/1200)), ((-1)*(duration*12)) )) ) / (rate/1200))); // mensualités
		variables_formule.credit_cost=((variables_formule.result*12*duration)-amount); // Intérets
	} else {
		variables_formule.result= (amount / (12*duration));
		variables_formule.credit_cost=((variables_formule.result*12*duration)-amount);
	}
	//<h3>Example heading <span class="label label-default">New</span></h3>
	var string_result="<h1 style=\"color:grey\">Results</h1><h3>Your monthly repayment: <span class=\"label label-success\">"+ Math.round(variables_formule.result*100)/100 +" <span class=\"glyphicon glyphicon-eur\" aria-hidden=\"true\"></span></span></h3><h3>Total cost of the credit: <span class=\"label label-success\">"+ Math.round(variables_formule.credit_cost*100)/100+" <span class=\"glyphicon glyphicon-eur\" aria-hidden=\"true\"></span></span></h3><h3>Total Price (Loan amount + Interest) : <span class=\"label label-success\">"+ Math.round((amount+variables_formule.credit_cost)*100)/100 +" <span class=\"glyphicon glyphicon-eur\" aria-hidden=\"true\"></span></span></h3>";
	document.getElementById("result_calculator").innerHTML=string_result;
	console.log(variables_formule.result);
};


document.getElementById("input_loan_amount_").onkeyup=function(){
	var llme= parseInt(document.getElementById("input_loan_amount_").value);
	if (llme==0){		
			var elts=document.getElementsByClassName("has-feedback-amount");
				for (var i = 0; i < elts.length ; i++) {
					elts[i].classList.add("has-warning");
				}
	} else{
			var elts=document.getElementsByClassName("has-feedback-amount");
				for (var i = 0; i < elts.length ; i++) {
					elts[i].classList.remove("has-warning");
				}
	}
		index.regexnumber();
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
	var amount_loan= parseInt(document.getElementById("input_loan_amount_").value.replace(/ /g,""));
	if(amount_loan>10000000){
		document.getElementById('input_loan_amount_').value="10000000";
	} else if (amount_loan<=0){
		document.getElementById('input_loan_amount_').value="0";
	}


	var rate_loan= parseInt(document.getElementById("input_interest_rate_").value);
	var loan_amount=parseInt(document.getElementById("input_loan_amount_").value);
	if(rate_loan>100 && loan_amount<=0){
				document.getElementById("check_calculator").disabled=true;
			} else if (loan_amount<=0){
				document.getElementById("check_calculator").disabled=true;
			} else if (loan_amount>0){
				document.getElementById("check_calculator").disabled=false;
			}
};

document.getElementById("input_loan_duration_").onblur=function(){
	if( (document.getElementById("input_loan_duration_").value=="0") || (document.getElementById("input_loan_duration_").value=="") ){
		document.getElementById("input_loan_duration_").value="1";
	}
		index.regexnumber2();
};


index.regexnumber2=function(){
	var exp = new RegExp("[^0-9]","gi");
	document.getElementById("input_loan_duration_").value=document.getElementById("input_loan_duration_").value.replace(exp,"");
	var duration= parseInt(document.getElementById("input_loan_duration_").value);
	if(duration>25){
		document.getElementById('input_loan_duration_').value="25";
	} else if (duration<=0){
				
			var elts=document.getElementsByClassName("has-feedback-duration");
				for (var i = 0; i < elts.length ; i++) {
					elts[i].classList.add("has-warning");
				}
	} else{
			var elts=document.getElementsByClassName("has-feedback-duration");
				for (var i = 0; i < elts.length ; i++) {
					elts[i].classList.remove("has-warning");
				}
	}

};


index.regozoo=function(){
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

		var rate_loan= parseInt(document.getElementById("input_interest_rate_").value);
		var loan_amount=parseInt(document.getElementById("input_loan_amount_").value);
			if(rate_loan>100){
				document.getElementById('input_interest_rate_').value="100";
			}

			

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
		var field = $(this);
		var valNum = (field.val() * 1).toFixed(2);
 
		field.val(valNum);
	});

	$('.rate').focus(function(){
		document.getElementById("input_interest_rate_").select();
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
		var r = JSON.parse(this.responseText); // conversion string en Objet JSON
		/***
			LOGIN CALLBACKS
		*/
		if (r.message=="login_connexion_autorised_admin_"){
			window.location = "./html/private/affichage_demande.html"; // JE RENVOIE L'ADMIN VERS LA PAGE CLIENT POUR LE MOMENT CAR PAS DE PAGE ADMIN ENCORE TODO
		}else if(r.message=="login_connexion_autorised_client_"){
			window.location = "./html/public/1_demande_pret.html";
		}else if (r.message=="login_connexion_refused"){
			document.getElementById(contenuHTML.id).innerHTML = contenuHTML.string;//pour remettre le bouton originel (car gif qui tourne)
			index.changer_couleur_case("boites_pour_entrer_les_login_");
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
			alert('Register successful');
			location.reload();
		}else if(r.message=="register_email_not_valid"){
			alert("email format invalid");
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

index.changer_couleur_case = function(classname){
	/*
	prend en paramettre le classname
	et ajoute has error a la classe pour dire que c pas bon et entoure la case en rouge
	*/
	var arr =document.getElementsByClassName(classname);
	if(arr.length>0){
		for(i=0;i<arr.length;i++){
			arr[i].classList.add("has-error");
		}
	}
	return;
};

window.onload = function(){
		setTimeout(index.start, 1);
};
