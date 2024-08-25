const fs = require("fs");
const os = require("os");

// fs.writeFile("text.txt","Hello there",(err, res)=>{
//     if(err){
//         console.log(err, "Error");
//     }else{
//         console.log(res);
//     }
// })

// fs.writeFileSync("text.txt", "from sync");

// fs.renameSync("./text.txt", "hello.txt");

fs.appendFile('./hello.txt', new Date().getDate().toLocaleString(), (err, res)=>{
    if(err){
        console.log(err, "Error");
    }else{
        console.log(res);
    }
})

console.log(os.cpus().length);