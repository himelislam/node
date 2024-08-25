const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res)=>{
    if(req.url === '/favicon.ico'){
        return res.end()
    }
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    console.log(req.url);
    const log = `TIME:${Date.now()}: New Entry added\nHost: ${req.headers.host}\nPath: ${req.url}\n\n`
    fs.appendFile("./log.txt", log, (err, data) =>{
        if(err){
            console.log(err,"from appendfile");
        }else{
            console.log("Added");
        }
    } )
    // depanding on the url will end diferent message
    switch(myUrl.pathname){
        case '/':
            res.end("Homepage")
            break
        case '/about':
            const query = myUrl.query.name;
            res.end(`Hello ${query}`)  
            break
        case '/contact':
            res.end("Contact here: +8804323432343")
            break
        default:
            res.end("Not found 404")
    }
})

myServer.listen(8000, ()=> console.log('Server Running'))

