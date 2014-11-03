var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

afficher_toute_la_base = function(){
MongoClient.connect('mongodb://alexandre:magne@dogen.mongohq.com:10036/ProjetEsme', function(err, db) {
    if(err) throw err;//si erreur de connections
	
	 var collection = db.collection('test1');//on veut acceder à la collection test 1 de la db ProjetEsme
	 collection.find().toArray(function(err, results) {
    	if (err) throw err;

        console.log(results);
        // Let's close the db
       	db.close();
   });

});
};

afficher_toute_la_base();