
var obj = {}; // objet contenant toutes nos fonctions

// appelée au chargement de la page (2/3)
obj.start=function(){
	document.getElementById('affichage_pret').innerHTML='<img src="../../images/gif_loader/loading_connexion.gif" style="height:auto width:auto" >';
	obj.post({ac:"affichage_demande"}, obj.callback);//passage au router des données
};

////////////// Communication avec le router via la méthode POST ////////////
obj.post = function (client, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(client));
};

obj.callback=function(){
	if (this.readyState == 4 && this.status == 200) {
		console.log("this.responsetext :" + this.responseText);
		var r = JSON.parse(this.responseText); // conversion string en Objet JSON
		if (r.message=="ok_affichage_demande"){
			obj.r = r.r;
			console.log("demandes bien recu");
			affichage_demande_function_html();
		}else{
			console.log("error");
		}
	}
};
///////////////////////////////////////////////////////
var affichage_demande_function_html = function(){

	if(obj.r[0]){
		compteur =0;
		var str_to_show ='';
		str_to_show+="<tr><td>N°</td><td>Name</td><td>Mail</td><td>Résultat</td></tr>";		
		for(a in obj.r){			
			
			if(obj.r[a].resultat_fonction){
				str_to_show+="<tr><td>"+compteur+"</td><td>"+obj.r[a].firstname+"</td><td>"+obj.r[a].email+"</td><td>"+obj.r[a].pret_ok_or_not.resultat_fonction+"</td></tr>";
				compteur++;
			}
		}
		document.getElementById('affichage_pret').innerHTML=str_to_show;
	}else{
		document.getElementById('affichage_pret').innerHTML="pas de fiche";
	}
}

// appelé au chargement de la page (1/3)
window.onload=function(){
	setTimeout(obj.start,1);
};