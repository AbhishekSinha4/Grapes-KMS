var sqlite3 	=	require('sqlite3').verbose();
var db = new sqlite3.Database('Grapes.db');
var createEmployeeTable="create table if not exists employees(empID TEXT PRIMARY KEY, passw TEXT NOT NULL, emp_name TEXT NOT NULL, emp_dob TEXT NOT NULL, emp_email TEXT NOT NULL, emp_number NUMBER NOT NULL, emp_address TEXT NOT NULL, emp_dept TEXT NOT NULL)"

db.run(createEmployeeTable,function(err1){
	db.each("select * from employees", function(err2,row){
		//if (err) throw err;
		console.log("EmpID: "+row['empID']+" Password: "+row['passw'])
	})
});
// console.log('HI')

db.close()