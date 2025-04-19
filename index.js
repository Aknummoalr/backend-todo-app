const express = require("express");
const morgan = require('morgan');
require('dotenv').config();
require('./config/db.js')
const authRoutes = require('./routers/auth.js');
const todoRoutes  = require('./routers/todos.js')
const adminRoutes = require('./routers/admin.js');
const checkAuthentication = require('./middlewares/authMiddleware.js')
const authorise = require('./middlewares/authorise.js')
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions ={
    origin:'http://localhost:5173'
}


app.use(cors(corsOptions)); 
app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.use('/auth', authRoutes);
app.use('/todos',checkAuthentication, todoRoutes);
app.use('/admin',checkAuthentication,authorise(["ADMIN"]), adminRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});