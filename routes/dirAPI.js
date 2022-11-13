var express = require("express");
var router = express.Router();
const config = require('../package.json')

router.get("/", function(req, res, next) { 
    const  path= config.path.rootDirPath;
    const fs = require('fs')
    // for(i=0;i<500;i++){
    //   // directory path
    //   const dir = path+'/'+i;
    //   // create new directory
    //   fs.mkdir(dir, err => {
    //     if (err) {
    //       throw err
    //     }
    //     else{
    //       for(j=0;j<500;j++){
    //       fs.writeFile(dir+"/"+j+".txt", "Hey there!", function(err) {
    //         if(err) {
    //             console.log(err);
    //         } else {
    //             console.log("The file was saved!");
    //         }
    //       });
    //     }
    //   }
    // })
    // }
    const getDirectories= []
      fs.readdirSync(path).filter(function (file) {
        const date = require('date-and-time')
        const dirname=file;
        const dirtime=date.format(fs.statSync(path+'/'+file).mtime,"DD/MMM/YYYY HH:mm:ss");
        if(fs.statSync(path+'/'+file).isDirectory())
        {
          const getImageDirectories= []
          fs.readdirSync(path+'/'+file).filter(function (imgfile) {
            if(fs.statSync(path+'/'+file+'/'+imgfile).isFile())
            {
              const filename=imgfile;
              const filetime=date.format(fs.statSync(path+'/'+file+'/'+imgfile).mtime,"DD/MMM/YYYY HH:mm:ss");
              getImageDirectories.push({"FileName":filename,"FileTime":filetime,"FilePath":path+'/'+file+'/'+imgfile})   
            }
          });
          if(getImageDirectories.length==0)
          {
            getImageDirectories.push({"FileName":"","FileTime":"","FilePath":""})  
          }
          getDirectories.push({"DirName":dirname,"DirTime":dirtime, "Files":getImageDirectories});
        }
      });
      getDirectories.sort((a, b) => {
        return new Date(a.FileTime) - new Date(b.FileTime); // descending
      })
      res.json(getDirectories);
});

module.exports = router;