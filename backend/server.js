const express = require("express");

const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
    origin: "127.0.0.1:8081"
};

app.use(cors(corsOptions));

// parse the requests using json
app.use(express.json());

//parse the content type app/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//routes:
app.get('/', (req,res) => {
    res.json({message: 'Auth template application'});
})


//server port 
const port = process.env.port || 8080;
app.listen(port, () =>{
    console.log(`Server is up and running! ${port}`);
})