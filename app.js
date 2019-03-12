const express	=	require('express')
// const isBase64	=	require('is-base64')
const path		= 	require('path')
// const fs		= 	require('fs')
var bodyParser 	=	require('body-parser');
var sqlite3 	=	require('sqlite3').verbose();
var session 	= require('express-session')
// const cors 		=	require('cors')
const app		=	express()
const portNo	=	2000
// app.use(express.static(path.join(__dirname, 'frontEnd')))
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'ejs');

app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
  	saveUninitialized: true, 
	cookie: { maxAge: 86400000 }
}))


app.get("/",function(req,res,err){
	if(!req.session.empID)	//res.sendFile(path.join(__dirname, 'index.html'))
		res.render('index',{loggedIn: false})
	else 
		res.render('index',{loggedIn: true, empName: req.session.empName})
})

app.get("/users/new",function(req,res,err){
	if(!req.session.empID)	//res.sendFile(path.join(__dirname, 'index.html'))
		res.render('addUser',{loggedIn: false})
	else 
		res.render('index',{loggedIn: true, empName: req.session.empName})
})
app.post("/users/add",function(req,res,err){
	var db = new sqlite3.Database('Grapes.db');
	db.get("select * from employees where empID='"+req.body.empID+"'",function(err,row){
		if(!row){
				db.run("insert into employees values('"+req.body.empID+"','"+req.body.passw+"','"+req.body.emp_name+"','"+req.body.emp_dob+"','"+req.body.emp_email+"',"+req.body.emp_number+",'"+req.body.emp_address+"','"+req.body.emp_dept+"')")
				req.session.empID 		=	req.body.empID
				req.session.passw 		=	req.body.passw
				req.session.empName 	=	req.body.emp_name
				req.session.empDob 		=	req.body.emp_dob
				req.session.empEmail 	=	req.body.emp_email
				req.session.empNumber 	=	req.body.emp_number
				req.session.empAddress 	=	req.body.emp_address
				req.session.empDept 	=	req.body.emp_dept
				res.redirect("/")		
		}
		else res.status(400).send({message:"Employee is already part of the KMS!"})
	})
	db.close();
})

app.get("/users/logIn",function(req,res,err){
	if(!req.session.empID)
		res.render('logIn',{loggedIn: false})
	else 
		res.render('index',{loggedIn: true, empName: req.session.empName})
})

app.post("/users/logIn",function(req,res,err){
	var db = new sqlite3.Database('Grapes.db');
	db.get("select * from employees where empID='"+req.body.empID+"'",function(err,row){
		if(row){
				req.session.empID 		=	row.empID
				req.session.passw 		=	row.passw
				req.session.empName 	=	row.emp_name
				req.session.empDob 		=	row.emp_dob
				req.session.empEmail 	=	row.emp_email
				req.session.empNumber 	=	row.emp_number
				req.session.empAddress 	=	row.emp_address
				req.session.empDept 	=	row.emp_dept
				res.redirect("/")		
		}
		else res.render("logIn",{loggedIn: false, status: "emp_not_exist"})
	})
	db.close();
})
app.get("/users/logOut",function(req,res,err){
	req.session.destroy();
	console.log("delete ho jaana chaahiye")
	res.redirect("/")
})
app.listen(portNo)