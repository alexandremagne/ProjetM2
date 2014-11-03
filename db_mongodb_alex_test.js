var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

afficher_toute_la_base = function(){//fonction pour ajouter un USER

MongoClient.connect('mongodb://romain:cunault94@dogen.mongohq.com:10034/alexandremagne', function(err, db) {
    if(err) throw err;//si erreur de connections
	 var collection = db.collection('collection_1');//on veut acceder à la collection test 1 de la db ProjetEsme
	 collection.find().toArray(function(err, results) {
    	if (err) throw err;
        console.log(results);
        // Let's close the db
       	db.close();
   });

});
};

afficher_toute_la_base();