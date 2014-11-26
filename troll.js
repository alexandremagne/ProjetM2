var index = {};

var data = {};
data.id_log = "?id_log=trolling_man_TROLOLOLOLOLO";//
data.arguments_="";


index.start=function(){
	
	setInterval(index.get_threads,1000);
	//index.get_threads();
	//index.new_thread("hello");
	//index.show_thread("1416655016898");
	//index.reply_to_thread("1416997123900","kouo");
	//index.delete_thread("1416997123900");
};

/**
envoie une demande de récupération d'id des threads
*/
index.get_threads=function(){
	data.action_="get_threads";
	index.get(data,index.callback);
};

/**
Créer un nouveau thread avec l'info du premier message
*/
index.new_thread=function(info){
	info+="";
	data.action_="new_thread";
	data.arguments_="&info="+info;
	index.get(data,index.callback);
};
/**
envoie une demande de récupération des message en fonction de l'id du thread entré
*/
index.show_thread=function(id){
	id+="";
	data.action_="show_thread";
	data.arguments_="&id="+id;
	index.get(data,index.callback);
};
/**
envoie une deamnde de reply sur le thread id avec le message info
*/
index.reply_to_thread = function(id,info){
	id+="";
	info+="";
	data.action_="reply_to_thread";
	data.arguments_="&id="+id+"&info="+info;	
	index.get(data,index.callback);
};
/**
envoie une demande de suppression du thread id
*/
index.delete_thread = function(id){
	id+="";
	data.action_="delete_thread";
	data.arguments_="&id="+id;
	index.get(data,index.callback);
};

index.get =  function (data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://tp-iwa.waxo.org/"+data.action_+data.id_log+data.arguments_,true);
    xhr.send(null);
    xhr.onreadystatechange = callback;   	
};

index.callback = function () {	
	//console.log(r);
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		if(getActionFromUrlResponse(this.responseURL) == "get_threads"){
			delete_all_threads(r.threads);
			console.log(r);
		}else if(getActionFromUrlResponse(this.responseURL) == "show_thread"){
			console.log(r);
		}else if(getActionFromUrlResponse(this.responseURL) == "new_thread"){
			console.log(r);
		}else if(getActionFromUrlResponse(this.responseURL) == "reply_to_thread"){
			console.log(r);
		}else if(getActionFromUrlResponse(this.responseURL) == "delete_thread"){
			console.log(r);
		}			
 	}else if (this.readyState == 4 && this.status == 500) {
 		console.log("erreur");
 	}
};

window.onload = function(){
	setTimeout(index.start,10);

}


/**
fonction pour recuperer l'action dans responseURL
*/
var getActionFromUrlResponse = function(str){
	str+="";
	str=str.split("http://tp-iwa.waxo.org/");
	str = str[1].split("?");
	str = str[0];
	return str;	
};



delete_all_threads=function(tab){
	for(i in tab){
		index.delete_thread(tab[i])
	}
};

