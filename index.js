const express=require('express');
const path=require('path');
const port=8000;
const app=express();

//setting up the db
const db=require('./congif/mongoose');
const Note=require('./models/note');

//setting up the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middleware
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){
    Note.find({}, function(err, notes){
        if(err){
            console.log("error in fetching notes from db");
            return;
        }
        return res.render('home',{
            title: "Note Maker",
            note_list: notes
        });

    })
})

//controller for creating note
app.post('/create-note',function(req,res)
{
    console.log(req.body);
    Note.create({
        heading:req.body.heading,
        content:req.body.content,
        category:req.body.category,
        deadline:req.body.deadline
    },function(err,newNote){
        if(err){
            console.log(`Error in creating Note: ${err}`);
            return;
        }
        return res.redirect('back');
    })
});

//controller for deleting note
app.get('/delete-note',function (req,res) {
    let id=req.query.id;
    Note.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })
})
app.listen(port,function(err){
    if(err){
        console.log(`Error in firing up the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
})