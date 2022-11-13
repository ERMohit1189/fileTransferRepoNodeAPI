var express = require("express");
var router= express.Router();
var chokidar= require("chokidar");

router.get("/",function(req,res,next){
    var path= "./api/www";
    var watcher = chokidar.watch(path, {ignored: /^\./, persistent: true});

    watcher
      .on('add',function() {
        res.send('a');
        watcher.close();
      })
      .on('change', function() {
        res.send('c');
        watcher.close();
      })
      .on('unlink', function() {
        res.send('u');
        watcher.close();
      })
      .on('error', function(error) {
        res.send(error);
        watcher.close();
      });      
})

module.exports = router;