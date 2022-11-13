var express = require("express");
var router = express.Router();
const config = require('../package.json')

router.post("/", function(req, res, next) { 
    try{
        const  filePath= req.body.FilePath;
        const  destPath= config.path.missedDirPath;
        const fs = require('fs')
        const path = require('path')
        if(fs.existsSync(filePath))
        {
            var f=path.basename(filePath);
            var dest=path.resolve(destPath,f)
        
            fs.rename(filePath,dest,(err)=>{
                if(err) return res.send(err.message);
                else return res.send("OK");
            })
        }
        else{
            res.send("File Dose Not Exists.");
        }
    }
    catch(err){
        return res.send(err.message);
    } 
});

module.exports = router;