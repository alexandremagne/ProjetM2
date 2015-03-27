
var obj = {}; // objet contenant toutes nos fonctions

// appelée au chargement de la page (2/3)
obj.start=function(){
	document.addEventListener("click", obj.on_click);
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
		str_to_show+="<tr><td>N°</td><td>Name</td><td>Mail</td><td>Résultat</td><td>Détails</td></tr>";		
		for(a in obj.r){			
			
			if(obj.r[a].pret_ok_or_not){//premier test
				var string=JSON.stringify(obj.r[a]);
				str_to_show+='<tr><td>'+compteur+'</td><td>'+obj.r[a].firstname+'</td><td>'+obj.r[a].email+'</td><td>'+obj.r[a].pret_ok_or_not.resultat_fonction+'</td><td><button onclick=\'afficher_mail('+string+')\' type=\'button\' data-toggle=\'modal\' data-target=\'#myModal2\'class=\'btn btn-warning\'>Détails</button></td></tr>';
				compteur++;
			}
		}
		document.getElementById('affichage_pret').innerHTML=str_to_show;
	}else{
		document.getElementById('affichage_pret').innerHTML="pas de fiche";
	}
}

afficher_mail = function(id){
	if(id.cinqCform){
		document.getElementById("modal2").innerHTML='<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">  <div class="modal-dialog">    <div class="modal-content">      <div class="modal-header">        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>        <h4 class="modal-title" id="myModalLabel">Personne concernée: ' + id.firstname+'</h4>     </div>       <div class=\'modal-body\'>  <span class=\'bg-info\'>Probabilité de défaut: '+ id.cinqCform.obj5c.default_probability +' %  </span><br/><br/><div id=\'spiderclient\' style=\'min-width: 400px; max-width: 600px; height: 400px; margin: 0 auto\'></div>    </div>      <div class="modal-footer">        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>        <button type="button" class="btn btn-primary">Save changes</button>      </div>    </div>  </div></div>';	
		console.log((id.cinqCform.obj5c));
		obj.Affichage_spider(id.cinqCform.obj5c);
	} else{
		document.getElementById("modal2").innerHTML='<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">  <div class="modal-dialog">    <div class="modal-content">      <div class="modal-header">        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>        <h4 class="modal-title" id="myModalLabel">Personne concernée: ' + id.firstname+'</h4>     </div>       <div class=\'modal-body\'>  <span class=\'bg-danger\'>Probabilité de défaut: Non répertorié     </span></div>      <div class="modal-footer">        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>        <button type="button" class="btn btn-primary">Save changes</button>      </div>    </div>  </div></div>';	
	}
	//alert(id);

}


obj.Affichage_spider=function(datagraph){
    $('#spiderclient').highcharts({

        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: "5C's profile client",
            x: -80
        },

        pane: {
            size: '60%'
        },

        xAxis: {
            categories: ['Character', 'Collateral', 'Capacity', 'Condition', 'Capital'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="colorr:{series.colorr}">{series.name}: <b>%{point.y:,.0f}</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },

        series: [{            
            data: [datagraph.character,datagraph.collateral,datagraph.capacity,datagraph.condition,datagraph.capital],
            pointPlacement: 'on'
        }]
    });}////////container 1



/*
obj.afficher_clas()=function(){

}

HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};
*/



// appelé au chargement de la page (1/3)
window.onload=function(){
	setTimeout(obj.start,1);
};