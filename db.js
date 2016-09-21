var MongoClient = require('mongodb').MongoClient


// Configurando mongo
//var uri = 'mongodb://heroku_7ftmgqmj:99jljcsej6f1mdqh20cgm5pv1v@ds139735.mlab.com:39735/heroku_7ftmgqmj';

var state = {
  db: null,
}

exports.connect = function(url, done) {
  if (state.db) return done()

  MongoClient.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db
    done()
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}