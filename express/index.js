const express = require("express");
const users = require("./MOCK_DATA.json")
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
.put((req, res)=>{
    const updatedUserInfo = req.body;
    const id = Number(req.params.id);
    const userIndex = users.find(user => user.id === id);

    if(userIndex !== -1){
        users[userIndex] = {...users[userIndex], ...updatedUserInfo}

        res.status(200).json(users[userIndex])
    }else{
        res.send(200).json({message: "user not found"})
    }
})
.delete((req, res)=> {
    const id = Number(req.params.id);
    const IndexToRemove = users.findIndex(user => user.id === id)
    if(IndexToRemove != -1){
        users.splice(IndexToRemove, 1);
        res.sendStatus(200).json({message: "user removed"})
    }else{
        res.sendStatus(200).json({message: "user not found"})
    }
})


app.post('/api/users', (req, res)=> {
    const user = req.body;
    console.log(user, "check");
    users.push(user);

    res.status(200).json({message: 'user added'})
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