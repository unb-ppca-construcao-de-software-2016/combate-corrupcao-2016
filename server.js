var express = require('express');
 
var server = express();
server.use(express.static(__dirname));
 
var port = process.env.PORT || 8080;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});
