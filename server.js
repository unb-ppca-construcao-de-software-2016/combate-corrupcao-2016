var express = require('express');
var bodyParser = require('body-parser');


var app = express();

var db = require('./db')

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true
}));
var port = process.env.PORT || 8080;
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/Index.html");
});
app.post("/search/qualios", function(req, res) {
    var search = req.body.search.toLowerCase();
    var collection = db.get().collection('qualis');

    //var query = {$or: [{"Sigla": new RegExp('^'+search+'$', "i")},{"Nome": new RegExp('^'+search+'$', "i")}]};
    var query = {$or: [{"Sigla": new RegExp(search, 'i')},{"Nome": new RegExp(search, 'i')},{"Estrato": new RegExp(search, 'i')}]};
    // var query = {$or: [{"Sigla": new RegExp(".*"+ search+".*", 'i')},{"Nome": new RegExp(".*"+ search+".*", 'i')}]};
    var result = collection.find(query, { _id : 0 }).toArray(function(err, items) {
        if(err){
            res.send(err);
        }
        res.json(items);
    })
});
app.post("/search/publications", function(req, res) {
    var search = req.body.search;
    var collection = db.get().collection('publippca');

    var query = {$or: [{"title": new RegExp(search, 'i')},{"event-sigla": new RegExp(search, 'i')},{"event": new RegExp(search, 'i')},{"abstract": new RegExp(search, 'i')},{"collection-title": new RegExp(search, 'i')}]};
    var result = collection.find(query, { _id : 0, id: 0, type: 0, "deadline-submission": 0, "event-place": 0, issued: 0, abstract: 0 }).toArray(function(err, items) {
        if(err){
            res.send(err);
        }
        res.json(items);
    })
});

// Connect to Mongo on start
db.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/searchBD', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    } 
    var collection = db.get().collection('qualis');
    collection.ensureIndex( { Sigla: "text", Nome: "text", Estrato: "text" } );
    var publications = db.get().collection('publippca');
    publications.ensureIndex({"title": "text", "event-sigla":"text", "event": "text", "abstract":"text", "collection-title":"text", "author":"text" });
    app.listen(port, function() {
        console.log('Servidor rodando na porta' + port);
    })
});
