var mysql = require ('mysql');
var inquirer = require ('inquirer');
require("dotenv").config(); 

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: 3306,
    database:'bamazonDB'
  });
  

connection.connect(function(err) {
    if (err) throw err;
    itemSearch ();
  });


 function itemSearch (){
    // console.log('please work!');

    inquirer.prompt({
        name:"id",
        type:"input",
        message:" what items would you like to search?"
    }).then(function(answer){
        var query= "SELECT * FROM products Where?";
        connection.query(query,{ product_name: answer.id }, function(err, result) {

            for (var i=0; i< result.length; i++){
                console.log("ID:" +""+ result[i].product_name);
                console.log("product Name:" +""+ result[i].product_name);
                console.log("Department Name:" +""+ result[i].department_name);
                console.log("Price:"+""+ result[i].price);
                console.log("Stock Quantity:" +""+ result[i].stock_quantity);
                
            }
            itemSearch ();
                
        })
    })
}



