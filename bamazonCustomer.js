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
    connection.query("SELECT * FROM products", function(err, result) {
        for (var i=0; i< result.length; i++){
            console.log("ID:" +""+ result[i].id);
            console.log("product Name:" +""+ result[i].product_name);
            console.log("Department Name:" +""+ result[i].department_name);
            console.log("Price:"+""+ result[i].price);
            console.log("Stock Quantity:" +""+ result[i].stock_quantity);
            // console.log(result);
        }
        idsearch();
  });
})

function idsearch(){inquirer.prompt({
    name:"id",
    type:"input",
    message:" what items ID would you like to search?",
    validate: (value) => {
        let valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number'
    }
}).then(function(answer){
    //  The first should ask them the ID of the product they would like to buy.
var query = "SELECT * FROM products Where?";
connection.query(query, {id:answer.id}, function(err, result){
    for (var i=0; i< result.length; i++){
        console.log("ID:" +""+ result[i].id);
        console.log("product Name:" +""+ result[i].product_name);
        console.log("Department Name:" +""+ result[i].department_name);
        console.log("Price:"+""+ result[i].price);
        console.log("Stock Quantity:" +""+ result[i].stock_quantity);
    }
 
    inquirer.prompt([{
        name:"stock_quantity",
        type:"input",
        message:"How many units of the product would like to buy?",
        validate: (value) => {
            let valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number'
        }

}]).then(function(answer){
    var quantity = answer.stock_quantity;
    var itemId = answer.id;
// connection.query(query, {stock_quantity: answer.stock_quantity},function(err, result){
    // console.log(result);
        for (var i=0; i< result.length; i++){
            if (result[i].stock_quantity - quantity <= 0 ){
                console.log("Insufficient quantity! Currently we only have "+ result[i].stock_quantity+ result[i].product_name);
            }else
                console.log("ID:" +""+ result[i].id);
                console.log("product Name:" +""+ result[i].product_name);
                console.log("Stock Quantity:" +""+ result[i].stock_quantity);
                console.log("You total is"+(result[i].stock_quantity *result[i].price));
    
    connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [result[i].stock_quantity - quantity, itemId],
                function(err, result) {
                    if (err) throw err;
    
                    // displayProducts();
                }); 
           
        }
        // displayProducts();
    // })
  
})
})
});
}
