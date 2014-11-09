

var index = {};

index.start = function () {
	index.btn_check_information_for_loan_demand_();//action du bouton check loan demand
	index.btn_check_login_formular_();
};

index.btn_check_information_for_loan_demand_ = function(){
	//ce quil se passe quand on appuie sur le bouton check
	$( "#check_formulaire_" ).submit(function( event ) {
	data={ac:"check_loan_info_action_",ar:0};
	 index.post(data, index.callback);
	 event.preventDefault();//à laisser
	});
};

index.btn_check_login_formular_ = function(){
	//ce quil se passe quand on appuie sur le bouton check
	$( "#log_in_formular_" ).submit(function( event ) {
	data={ac:"check_login_process_"};
	 index.post(data, index.callback);
	 event.preventDefault();//à laisser
	});
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