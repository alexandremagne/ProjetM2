

var index = {};
var data = {};//objet ) transmettre au routeur

index.start = function () {
	index.btn_check_information_for_loan_demand_();//action du bouton check loan demand
	index.btn_check_login_formular_();//action du bouton login
	

};

index.btn_check_information_for_loan_demand_ = function(){
	//ce quil se passe quand on appuie sur le bouton check
	$( "#check_formulaire_" ).submit(function( event ) {
		index.fill_data_loan_demand_();
	 index.post(data, index.callback);
	 event.preventDefault();//à laisser
	});
};

index.btn_check_login_formular_ = function(){
	//ce quil se passe quand on appuie sur le bouton login
	$( "#log_in_formular_" ).submit(function( event ) {
	 index.fill_data_login();//action pour remplir data
	 index.post(data, index.callback);
	 event.preventDefault();//à laisser
	});
};

index.fill_data_login = function(){
	//pour remplir l'objet data avec le username et password et l'action à réaliser
	data.ac = "check_login_process_";
	data.userName = document.getElementById('input_username_').value;
	data.password = document.getElementById('input_password_').value;
};

index.fill_data_loan_demand_ = function(){
	data.ac="check_loan_info_action_";
	data.input_borrowed_capital_ = document.getElementById('input_borrowed_capital_').value;
	data.input_age_of_demander_ = document.getElementById('input_age_of_demander_').value;
	data.input_monthly_incomes_ = document.getElementById('input_monthly_incomes_').value;
	data.input_duration_loan_in_years_ = document.getElementById('input_duration_loan_in_years_').value;
};

//fonction post
index.post = function (data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};

//fonction de retour de demande de pret
index.callback = function () {
	if (this.readyState == 4 && this.status == 200) {

		var r = JSON.parse(this.responseText);
		if (r.message == "ok_loan_demande_") {
			alert("demande de pret envoyée !");
		}else if(r.message == "ok_login_"){			
			alert("demande de login envoyée !");
		}else{
			alert("demande  rejetée !");
		}
	}
};

window.onload = function(){
		setTimeout(index.start, 1);
};