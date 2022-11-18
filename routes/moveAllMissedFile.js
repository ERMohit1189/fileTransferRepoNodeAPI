var express = require("express");
var router = express.Router();
const config = require('../package.json')

router.post("/",async function(req, res, next) { 
    try{
        const  destPath= config.path.missedDirPath;
        const  rootDirPath= config.path.rootDirPath;
        const fs = require('fs')
        const path = require('path')
        const dirList =req.body.DirList
        await dirList.map(async (dir,index)=>{
            if(fs.existsSync(rootDirPath+'/'+dir.DirName))
            {
                if(dir.Files.length>0)
                {
                    await dir.Files.map(async (files,fileindex)=>{
                        if(fs.existsSync(files.FilePath))
                        {
                            var f=path.basename(files.FilePath);
                            var dest=path.resolve(destPath,f)
                        
                            await fs.rename(files.FilePath,dest,(err)=>{
                                if(err) return err.message;
                                else return "OK";
                            })
                        }
                    })
                }
            }
        })
        return res.send("OK");
    }
    catch(err){
        return res.send(err.message);
    } 
});

module.exports = router;