//from mongoose documentation present online 

//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/notes_db');

//acquire the connection
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error connnecting to db'));
db.once('open',function () {  
    console.log('connected to db');
})