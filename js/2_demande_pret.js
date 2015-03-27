include('../../js/test_function_unitaire/function_capital.js');
include('../../js/test_function_unitaire/function_collateral.js');
include('../../js/test_function_unitaire/function_capacity.js');
include('../../js/test_function_unitaire/function_condition.js');
include('../../js/test_function_unitaire/function_character.js');
include('../../js/test_function_unitaire/cinqc.js');


var obj = {}; // objet contenant toutes nos fonctions
var client = {}; // objet qui contiendra tous les champs des formulaires utile pour le scoring
var data={}; // objet utlile pour vérifier le cookie => lance un POST pour déco automatique en cas de modif de cookie
var obj_proba_5C ={} // objet qui contient la méthode d'appel a la fonction 5C


// appelée au chargement de la page (2/3)
obj.start=function(){	
	obj.post({ac:"affichage_spider"}, obj.callback);
	obj.check_loan(); // bouton de demande de prêt
};


// appelée au chargement de la page (3/3)
obj.check_loan=function(){		
	$("#check_formulaire_").submit(function(event){

	////////////////////////////////////////////////// POUR CAPITAL //////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		client.input_borrower_loan_amount = document.getElementById("input_borrower_loan_amount").value;
		client.input_borrower_assets_type = document.getElementById("input_borrower_assets_type").value; // asset types
		client.input_borrower_contribution=document.getElementById("input_borrower_contribution").value;

	////////////////////////////////////////////////// POUR function_COLLATERAL (on récupere également loan_amount)/////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		client.input_borrower_pledge_value=document.getElementById("input_borrower_pledge_value").value;
		client.input_borrower_bails_value=document.getElementById("input_borrower_bails_value").value;
		if(document.getElementById("input_borrower_property_yes").checked)
			client.input_borrower_property=document.getElementById("input_borrower_property_yes").value;
		else
			client.input_borrower_property=document.getElementById("input_borrower_property_no").value;

		if(document.getElementById("input_borrower_guarantee_yes").checked)
			client.input_borrower_guarantee=document.getElementById("input_borrower_guarantee_yes").value;
		else
			client.input_borrower_guarantee=document.getElementById("input_borrower_guarantee_no").value;

	////////////////////////////////////////////////// POUR function_CAPACITY (+ loan_amount)/////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		client.input_borrower_loan_purpose=document.getElementById("input_borrower_loan_purpose").value;
		client.input_borrower_monthly_incomes = ((document.getElementById("input_borrower_annual_incomes").value)/12); // mensuel => on divise par 12
		client.input_borrower_monthly_expenses = document.getElementById("input_borrower_monthly_expenses").value;
		client.input_borower_loan_duration = document.getElementById("input_borower_loan_duration").value;
		client.references_type="plus de deux bonnes references"; // A changer car écrit en dur ici..
		if(document.getElementById("input_borrower_other_incomes_checked").checked)
			client.input_borrower_other_incomes = ((document.getElementById("input_borrower_other_incomes").value)/12); // mensuel => on divise par 12
		else 
			client.input_borrower_other_incomes=0;

	////////////////////////////////////////////////// POUR function_CONDITION (+ loan_purpose)/////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if(document.getElementById("input_futur_expanses_yes").checked)
			client.input_futur_expanses=document.getElementById("input_futur_expanses_yes").value;
		else
			client.input_futur_expanses=document.getElementById("input_futur_expanses_no").value;

	////////////////////////////////////////////////// POUR function_CHARACTER (+ loan_purpose)/////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		client.input_borrower_contract = document.getElementById("input_borrower_contract").value;
		client.input_borrower_diploma = document.getElementById("input_borrower_diploma").value;
		client.input_borrower_habitat = document.getElementById("input_borrower_habitat").value;
		client.input_borrower_employment_Duration = document.getElementById("input_borrower_employment_Duration").value;

		
		

	//////////////////////////////////////// FONCIONS UTILIES POUR LES 5C -- 1 fonction par C ////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		client.obj5c=cinqc(     collateral(client.input_borrower_property, client.input_borrower_pledge_value, client.input_borrower_bails_value, client.input_borrower_guarantee, client.input_borrower_loan_amount),     asset(client.input_borrower_contribution,client.input_borrower_loan_amount,client.input_borrower_assets_type),     capacity(client.references_type, client.input_borrower_loan_purpose, client.input_borrower_monthly_expenses, client.input_borrower_monthly_incomes, client.input_borrower_other_incomes, client.input_borrower_loan_amount, client.input_borower_loan_duration),     condition(client.input_borrower_loan_purpose, client.input_futur_expanses),     character(client.input_borrower_contract, client.input_borrower_diploma, client.input_borrower_habitat, client.input_borrower_employment_Duration));
		
	
	//COLLATERAL////
		//alert(collateral(client.input_borrower_property, client.input_borrower_pledge_value, client.input_borrower_bails_value, client.input_borrower_guarantee, client.input_borrower_loan_amount));

	//CAPITAL////
		//alert(asset(client.input_borrower_contribution,client.input_borrower_loan_amount,client.input_borrower_assets_type)); 
	
	//CAPACITY////
		//alert( capacity(client.references_type, client.input_borrower_loan_purpose, client.input_borrower_monthly_expenses, client.input_borrower_monthly_incomes, client.input_borrower_other_incomes, client.input_borrower_loan_amount, client.input_borower_loan_duration) ); 
	
	//CONDITIONS////
		//alert(conditions(client.input_borrower_loan_purpose, client.input_futur_expanses));	

	//CHARACTER////
		//alert(character(client.input_borrower_contract, client.input_borrower_diploma, client.input_borrower_habitat, client.input_borrower_employment_Duration));
		client.ac="save_loan_request";
		obj.post(client, obj.callback);//passage au router des données
		event.preventDefault();// Pour annuler le comportement par default d'un formulaire

	});
};

obj.disableotherincomes=function(){
	if(document.getElementById("input_borrower_other_incomes_checked").checked){
		document.getElementById('input_borrower_other_incomes').disabled=false;
	}else{
		document.getElementById('input_borrower_other_incomes').disabled=true;
		document.getElementById('input_borrower_other_incomes').value=""; // on vide ce qu'il y a dedans afin de ne rien récupérer
	}
};

obj.disablemortgage=function(){
	if(document.getElementById("input_borrower_property_value_checked").checked){
		document.getElementById('input_borrower_property_value').disabled=false;
		console.log(document.getElementById("input_borrower_property_value").value);
	}else{
		document.getElementById('input_borrower_property_value').disabled=true;
		document.getElementById('input_borrower_property_value').value=""; // on vide ce qu'il y a dedans afin de ne rien récupérer
		console.log(document.getElementById("input_borrower_property_value").value);
	}
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
		//console.log("this.responsetext :" + this.responseText);
		var r = JSON.parse(this.responseText); // conversion string en Objet JSON

		if (r.message=="store_loan_request_ok"){
			console.log("demande de prêt 5C stocké dans la bdd");
			window.location.reload();
		}else if(r.message=="something_wrong"){
			console.log("demande de prêt 5C NON stockée");
		}else if (r.message=="nocookie"){
			window.location = "/index.html";
		}else if(r.message=="ok_affichage_spider"){
			if(r.r[0].cinqCform){
				obj.affichage_spider = r.r[0].cinqCform.obj5c;
				obj.fun_affichage_spider();
			}
			
		}
		else{
			//console.log(r);
			alert("Stockage refusé");
		}
	}
};
///////////////////////////////////////////////////////

//pour inclure un fichier js
function include(fileName){
document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
};


// appelé au chargement de la page (1/3)
window.onload=function(){
	setTimeout(obj.start,1);
};

obj.fun_affichage_spider=function(){
	console.log(obj.affichage_spider);
    $('#containerGraph').highcharts({

        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: "5C's profile client",
            x: -80
        },

        pane: {
            size: '120%'
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
            data: [obj.affichage_spider.character, obj.affichage_spider.collateral, obj.affichage_spider.capacity, obj.affichage_spider.condition, obj.affichage_spider.capital],
            pointPlacement: 'on'
        }]
    });////////container 1
 $('#containerGraph2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '5c Result'
        },
        xAxis: {
            categories: ['Character', 'Collateral', 'Capacity', 'Condition', 'Capital']
        },
        credits: {
            enabled: false
        },
        series: [{            
            data: [obj.affichage_spider.character, obj.affichage_spider.collateral, obj.affichage_spider.capacity, obj.affichage_spider.condition, obj.affichage_spider.capital]
        }]
    });//////container 2
$('#containerGraph3').highcharts({

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Your Score'
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'Success'
            },
            plotBands: [{
                from: 0,
                to: 40,
                color: '#DF5353' // green 
            }, {
                from: 40,
                to: 60,
                color: '#DDDF0D' // yellow
            }, {
                from: 60,
                to: 100,
                color: '#55BF3B' // red DF5353
            }]
        },

        series: [{
            name: 'Your Score',
            data: [parseInt(100-obj.affichage_spider.default_probability*100)],
            tooltip: {
                valueSuffix: ' %'
            }
        }]

    },
        // Add some life
        function (chart) {
           
        });
 

}