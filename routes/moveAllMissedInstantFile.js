var express = require("express");
var router = express.Router();
const config = require('../package.json')

router.post("/",async function(req, res, next) { 
    try{
        const  compiledDestPath= config.path.compiledDirPath;
        const  instantDestPath= config.path.instantDirPath;
        const fs = require('fs')
        const path = require('path')
        const FilesList =req.body.FileList
        await FilesList.map(async (files)=>{
            if(fs.existsSync(files.FilePath))
            {
                var f=path.basename(files.FilePath);
                if(files.IsChecked)
                {                                
                    var dest=path.resolve(instantDestPath,f)
                }
                else{
                    var dest=path.resolve(compiledDestPath,f)                   
                }
                await fs.rename(files.FilePath,dest,(err)=>{
                    if(err) return err.message;
                    else return "OK";
                })
            }
        })
        return res.send("OK");
    }
    catch(err){
        return res.send(err.message);
    } 
});

module.exports = router;