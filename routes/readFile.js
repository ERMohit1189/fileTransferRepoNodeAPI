var express = require("express");
const stream = require('stream')
var router = express.Router();

router.post("/", function(req, res, next) { 
    const  path= req.body.FilePath;
    const fs = require('fs')
    if(path!='' && path!=null)
    {    
    const r = fs.createReadStream(path)
    const ps = new stream.PassThrough()
    stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
         if (err) {
           console.log(err) // No such file or any other kind of error
           return res.sendStatus(400); 
         }
       })
       ps.pipe(res) // <---- this makes a trick with stream error handling
    // fs.readFile(path, function(err, data) {
    //     if (err) throw err; // Fail if the file can't be read.
    //       res.writeHead(200, {'Content-Type': 'image/jfif'});
    //       res.end(data); // Send the file data to the browser.               
    //   });
    }
    
});

module.exports = router;