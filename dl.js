var http = require('http');
var url = "http://localhost:5984/db/a08bd70449cd46e529fd405e4800577d/EpicInstaller-9.7.0.msi";

var download_file_httpget = function(file_url) {
  http.get(url, function(res) {
    console.log("size", res.headers["content-length"]);

    res.on('data', function(data) {
            //console.log("*******");
            //console.log(data);
            //console.log("*******");
        })
    .on('end', function() {
            console.log("END", new Buffer.from("Bb/yLVXyHfuQmZiWOCPKqA==", "base64").toString("hex"));
        });
    });
  };

  download_file_httpget(url);