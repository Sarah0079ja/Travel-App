const express = require('express');
const mongoose = require('mongoose');
const config = require("config");

//middleware bodyparser
const app = express(); 

app.use(express.json({ extended: false}));

// db config
const db = config.get('mongoURI');
// connect mongo 
mongoose
  .connect(db, {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Mongodb connected..."))
  .catch(err => console.log(err));

//use routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`server started on port ${port}`));

