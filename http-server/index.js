const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res)=>{
    // console.log(req.url);
    const log = `TIME:${Date.now()}: New Entry added\nHost: ${req.headers.host}\nPath: ${req.url}\n\n`
    fs.appendFile("./log.txt", log, (err, data) =>{
        if(err){
            console.log(err,"from appendfile");
        }else{
            console.log("Added");
        }
    } )
    // depanding on the url will end diferent message
    switch(req.url){
        case '/':
            res.end("Homepage")
            break
        case '/about':
            res.end("Hello Im Himel")
            break
        case '/contact':
            res.end("Contact here: +8804323432343")
            break
        default:
            res.end("Not found 404")
    }
})

myServer.listen(8000, ()=> console.log('Server Running'))

