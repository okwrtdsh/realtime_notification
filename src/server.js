var fs = require("fs");
var http = require("http");
var socketio = require("socket.io");
var pg = require('pg');
var io;
var config;

main();

function main(){
  fs.readFile("./config.json", function (err, content){
    if(err){
      console.log(err);
      process.exit();
    }
    try{
      config = JSON.parse(content.toString());
      console.log(config);
      setupServer();
      setupPGConnection();
    }
    catch(error){
      console.log(error);
      process.exit();
    }
  });
}


function setupServer(){
  var server = http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "text/html"});
    var output = fs.readFileSync(config.http.html_path, "utf-8");
    res.end(output);
  }).listen(config.http.port);
  io = socketio.listen(server);
  io.sockets.on("connection", function(socket){
    socket.on("change", function(dict_list){
      io.sockets.emit("change", dict_list);
    });
  });
}


function setupPGConnection(){
  var pgConString = config.db.protocol + "://"
                    + config.db.user + ":"
                    + config.db.password + "@"
                    + config.db.host + ":"
                    + config.db.port + "/"
                    + config.db.name;
  var sql_query;
  fs.readFile(config.db.query_path, function (err, content){
    if(err){
      console.log(err);
      process.exit();
    }
    sql_query = content.toString();
    console.log(sql_query);
  });
  pg.connect(pgConString, function(err, client){
    if(err){
      console.log(err);
      process.exit();
    }
    client.on('notification', function(msg){
      console.log(msg);
      client.query(sql_query, function(err, result){
        if(err){
          console.log(err);
        }
        else{
          console.log(result.rows);
          io.sockets.emit("change", result.rows);
        }
      });
    });
    client.query("LISTEN listen_notification");
  });
}
