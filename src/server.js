const express = require("express");
const cors = require("cors");
const ConnectDb = require("./app/config/db");
const userRouter = require("./app/Route/userRouter");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));


// Router
app.use("/api" , userRouter);

app.get("/" , (req , res) =>{
    res.send({message : "Authentication system server"});
});

ConnectDb();

// app.listen(port , () =>{
//     console.log("Server run success");
//     console.log(`http://localhost:${port}`);
// });

module.exports = app