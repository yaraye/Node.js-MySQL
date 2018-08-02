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
    displayProducts();
  });

  function displayProducts(){
      inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "what items would you like to search?", 
            "what ID of the product would like to buy?", 
            "How many units of the product would like to buy?"
        ] }).then(function (answer){
          switch(answer.action){
              case  "what items would you like to search?":
              itemSearch ();
              break;

              case  "what ID of the product would like to buy?":
              idsearch();
              break;

              case  "How many units of the product would like to buy?":
                productSearch();
                break;

          }
      })
  }
  

 function itemSearch (){
    inquirer.prompt({
        name:"id",
        type:"input",
        message:" what items would you like to search?"
    }).then(function(answer){
        var query= "SELECT * FROM products Where?";
        // display all of the items available for sale
        connection.query(query,{ product_name: answer.id }, function(err, result) {

            for (var i=0; i< result.length; i++){
                console.log("ID:" +""+ result[i].id);
                console.log("product Name:" +""+ result[i].product_name);
                console.log("Department Name:" +""+ result[i].department_name);
                console.log("Price:"+""+ result[i].price);
                console.log("Stock Quantity:" +""+ result[i].stock_quantity);
                
            }
            displayProducts();
                
        })
    })
}



function idsearch(){inquirer.prompt({
    name:"number",
    type:"input",
    message:"what ID of the product would like to buy?",
    validate: (value) => {
        let valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number'
    }
}).then(function(answer){
    //  The first should ask them the ID of the product they would like to buy.
var query = "SELECT * FROM products Where?";
connection.query(query, {id:answer.number}, function(err, result){
    for (var i=0; i< result.length; i++){
        console.log("ID:" +""+ result[i].id);
        console.log("product Name:" +""+ result[i].product_name);
        console.log("Department Name:" +""+ result[i].department_name);
        console.log("Price:"+""+ result[i].price);
        console.log("Stock Quantity:" +""+ result[i].stock_quantity);
    }
    displayProducts();
})
})

}

//  The second message should ask how many units of the product they would like to buy.
function productSearch(){
    inquirer.prompt({
    name:"number",
    type:"input",
    message:"How many units of the product would like to buy?",
    validate: (value) => {
        let valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number'
    }
}).then(function(answer){
    //  The first should ask them the ID of the product they would like to buy.
var query = "SELECT * FROM products Where?";
connection.query(query, {id:answer.number}, function(err, result){
    for (var i=0; i< result.length; i++){
        console.log("ID:" +""+ result[i].id);
        console.log("product Name:" +""+ result[i].product_name);
        console.log("Stock Quantity:" +""+ result[i].stock_quantity);
    }
    displayProducts();
})
})

}