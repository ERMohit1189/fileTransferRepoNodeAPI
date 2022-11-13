var express = require("express");
var router = express.Router();
const config = require('../package.json')
const date = require('date-and-time')

router.get("/", function(req, res, next) { 
  var  path= config.path.missedDirPath;
  const fs = require('fs')
  const getDirectories= []

  fs.readdirSync(path).filter(function (file) {
    if(fs.statSync(path+'/'+file).isFile())
    { 
      const filename=file;
      const filetime=date.format(fs.statSync(path+'/'+file).mtime,"DD/MMM/YYYY HH:mm:ss");
      getDirectories.push({"FileName":filename,"FileTime":filetime,"FilePath":path+'/'+file})   
    }
  });
  
  path= config.path.compiledDirPath;
  fs.readdirSync(path).filter(function (file) {
    if(fs.statSync(path+'/'+file).isFile())
    { 
      const filename=file;
      const filetime=date.format(fs.statSync(path+'/'+file).mtime,"DD/MMM/YYYY HH:mm:ss");
      getDirectories.push({"FileName":filename,"FileTime":filetime,"FilePath":path+'/'+file})   
    }
  });
  
  path= config.path.instantDirPath;
  fs.readdirSync(path).filter(function (file) {
    if(fs.statSync(path+'/'+file).isFile())
    { 
      const filename=file;
      const filetime=date.format(fs.statSync(path+'/'+file).mtime,"DD/MMM/YYYY HH:mm:ss");
      getDirectories.push({"FileName":filename,"FileTime":filetime,"FilePath":path+'/'+file})   
    }
  });
  
  getDirectories.sort((a, b) => {
    return new Date(a.FileTime) - new Date(b.FileTime); // descending
  })
  res.json(getDirectories);
});

module.exports = router;