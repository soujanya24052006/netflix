 const express=require("express");

const bodyParser=require("body-parser");

const db=require("./db");

const app=express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));



// HOME PAGE

app.get("/",(req,res)=>{

db.query(

"SELECT * FROM subscriptions",

(err,result)=>{

if(err)
throw err;

res.render(
"index",
{data:result}
);

});

});




// OPEN ADD PAGE

app.get("/add",(req,res)=>{

res.render("add");

});




// INSERT SUBSCRIPTION

app.post("/add",(req,res)=>{

const{

plan_name,
monthly_price,
video_quality,
screens_allowed,
status

}=req.body;

let sql=

`INSERT INTO subscriptions
(plan_name,
monthly_price,
video_quality,
screens_allowed,
status)

VALUES(?,?,?,?,?)`;

db.query(

sql,

[
plan_name,
monthly_price,
video_quality,
screens_allowed,
status
],

(err)=>{

if(err)
throw err;

res.redirect("/");

});

});




// OPEN EDIT PAGE

app.get("/edit/:id",

(req,res)=>{

let id=req.params.id;

db.query(

"SELECT * FROM subscriptions WHERE id=?",

[id],

(err,result)=>{

if(err)
throw err;

res.render(
"edit",
{data:result[0]}
);

});

});




// UPDATE

app.post("/update/:id",

(req,res)=>{

let id=req.params.id;

const{

plan_name,
monthly_price,
video_quality,
screens_allowed,
status

}=req.body;

let sql=

`UPDATE subscriptions

SET

plan_name=?,
monthly_price=?,
video_quality=?,
screens_allowed=?,
status=?

WHERE id=?`;

db.query(

sql,

[
plan_name,
monthly_price,
video_quality,
screens_allowed,
status,
id
],

(err)=>{

if(err)
throw err;

res.redirect("/");

});

});




// DELETE

app.get("/delete/:id",

(req,res)=>{

let id=req.params.id;

db.query(

"DELETE FROM subscriptions WHERE id=?",

[id],

(err)=>{

if(err)
throw err;

res.redirect("/");

});

});



app.listen(3000,()=>{

console.log(
"Server Running"
);

});