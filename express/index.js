const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs");
const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
    const html = `
        <style>
        body{
                background-color: black;
                color: white; /* Optional: Sets text color to white for better contrast */
            }
        </style>

        <h1>Hello From Home Page</h1>
    `
    res.send(html)
})

app.get('/api/users', (req, res) => {
    users.sort();
    res.send(users);
})

app.get('/users', (req, res)=>{
    const html = `
    <ul>
        ${users.map( user => `<li>${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

// app.get('/api/users/:id', (req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id)
//     res.send(user);
// })

app.route('/api/users/:id')
.get((req, res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id)
    res.send(user);
})
.patch((req, res)=>{
    const updatedUserInfo = req.body;
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex !== -1){
        users[userIndex] = {...users[userIndex], ...updatedUserInfo}

        fs.readFile("./MOCK_DATA.json", 'utf-8', (err, data)=>{
            if(err){
                console.error("error from patch");
                return res.send("Internal server error")
            }
            try {
                const usersFile = JSON.parse(data);
                const userFileIndex = usersFile.findIndex(user => user.id === id);

                if(userFileIndex !== -1){
                    usersFile[userFileIndex] = {...usersFile[userFileIndex],...updatedUserInfo};

                    fs.writeFile("./MOCK_DATA.json", JSON.stringify(usersFile), 'utf-8', (err)=>{
                        if(err){
                            console.error("Internal server error")
                            return res.send("Internal server error")
                        }

                        return res.status(200).json(users[userIndex]);
                    })
                }

            } catch (error) {
                console.error("Inter Server Parse error");
                return res.send("Internal server error")
            }
        })
    }else{
        return res.status(200).json({message: "user not found"})
    }
})
.delete((req, res)=> {
    const id = Number(req.params.id);
    const IndexToRemove = users.findIndex(user => user.id === id)
    if(IndexToRemove !== -1){
        users.splice(IndexToRemove, 1);
        fs.readFile("./MOCK_DATA.json", 'utf-8', (err, data)=>{
            if(err){
                console.error("Internal server error")
                return res.send("Internal Server Error")
            }
            try {
                const usersFile = JSON.parse(data);
                const IndexToRemoveFile = usersFile.findIndex(user => user.id === id);

                if(IndexToRemoveFile != -1){
                    usersFile.splice(IndexToRemoveFile, 1);

                    fs.writeFile("./MOCK_DATA.json", JSON.stringify(usersFile), 'utf-8', (err)=>{
                        if(err){
                            console.error("Internal server error")
                            return res.send("Internal Server Error")
                        }

                        return res.status(200).json({message: "user removed"})
                    })
                }
            } catch (error) {
                console.error("Internal server parse error")
                return res.send("Internal Server parse Error")
            }
        })
    }else{
        res.status(200).json({message: "user not found"})
    }
})


app.post('/api/users', (req, res)=> {
    const user = req.body;
    console.log(user, "check");

    users.push({id: users.length + 1, ...user });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        if(err){
            console.log(err, "user not added");
        }
        return res.status(200).json({message: 'user added', id: users.length});
    })


})

// app.put('/api/users/:id', (req, res)=>{
//     const updatedUserInfo = req.body;
//     const id = Number(req.params.id);
//     const userIndex = users.find(user => user.id === id);

//     if(userIndex !== -1){
//         users[userIndex] = {...users[userIndex], ...updatedUserInfo}

//         res.status(200).json(users[userIndex])
//     }else{
//         res.send(200).json({message: "user not found"})
//     }
// })

// app.delete('/api/users.:id', (req, res)=> {
//     const id = Number(req.params.id);
//     const IndexToRemove = users.map(user => user.id === id)
//     if(IndexToRemove !== -1){
//         users.splice(IndexToRemove, 1);
//         res.status(200).json({message: "user removed"})
//     }else{
//         res.status(200).json({message: "user not found"})
//     }
// })


app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))