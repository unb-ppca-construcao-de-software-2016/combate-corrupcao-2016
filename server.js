var express = require('express');
 
var server = express();
server.use(express.static(__dirname));
 
var port = process.env.PORT || 8080;
server.listen(port, function() {
    console.log('Servidor rodando na porta' + port);
});

// Configuração do Keen

var keenIO = require('keen.io');

var keen = keenIO.configure({
    projectId: process.env['KEEN_PROJECT_ID'],
    writeKey: process.env['KEEN_WRITE_KEY']
});


// Configurando mongo

var mongodb = require('mongodb');
var uri = 'mongodb://heroku_7ftmgqmj:99jljcsej6f1mdqh20cgm5pv1v@ds139735.mlab.com:39735/heroku_7ftmgqmj';

