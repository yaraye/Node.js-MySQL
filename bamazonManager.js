// var bamazonCustomer = require("./bamazonCustomer.js");
var inquirer = require('inquirer');
var mysql = require('mysql');
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
    search();
})

function search(){
    inquirer
    .prompt({
        name:"action",
        type:"list",
        message:"what would you like to do?",
        choices:[
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }).then(function(answer){
            switch(answer.action){
                case  "View Products for Sale":
                forSaleInventory();
                break;

                case "View Low Inventory":
                viewInventory();
                break;

                case  "Add to Inventory":
                addInventory();
                break;

                case "Add New Product":
                newProduct();
                break;
            
            }
          
        });
}

// If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
function forSaleInventory(){
   console.log("sale");
   connection.query("SELECT * FROM products", function(err, result) {
            for (var i=0; i< result.length; i++){
                console.log("ID:" +""+ result[i].id);
                console.log("product Name:" +""+ result[i].product_name);
                console.log("Department Name:" +""+ result[i].department_name);
                console.log("Price:"+""+ result[i].price);
                console.log("Stock Quantity:" +""+ result[i].stock_quantity);
                console.log("------------------------------");
            }
            search();
             });
}
//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function viewInventory(){
    connection.query("SELECT * FROM products", function(err, result) {
    console.log(result);
    for (var i=0; i< result.length; i++){
        if (result[i].stock_quantity <=5 ){
            console.log("Insufficient quantity! Currently we only have "+ " "+ result[i].stock_quantity+ result[i].product_name);
            console.log("------------------------------");  
        }else {
            console.log("Sufficient quantity! Currently we have "+ " "+ result[i].stock_quantity+ result[i].product_name);
        }
    }
});   
}
//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory(){
        inquirer
        .prompt([{
            name:"id",
            type:"input",
            message:"please Enter the ID of the Item"
        },{
            name:"amount",
            type:"input",
            message:"How many would you like to add?"
        }]).then(function add(answer){
            var itemId= answer.id;
            connection.query('SELECT * FROM products WHERE id='+ itemId,function(err, result) {
        
            result[0].stock_quantity = parseInt(answer.amount) + parseInt(result[0].stock_quantity)
           
            console.log(result[0]);
    
            connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [result[0].stock_quantity, result[0].id],
            
            function(err, result) {
                if (err) throw err;

            }); 
            console.log("------------------------------"); 
        });
           
           
        });
       

}
//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function newProduct(){
  
    inquirer
    .prompt([
        { name:"product_name",
        type:"input",
        message:"please Enter the Product_name of the Item"
},{
    name:"department_name",
    type:"input",
    message:"please Enter the department_name  of the Item"

},{
    name:"price",
    type:"input",
    message:"please Enter the price of the Item",
    validate: (value) => {
        let valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number'
    }
},{
    name:"stock_quantity",
    type:"input",
    message:"please Enter the stock_quantity of the Item",
    validate: (value) => {
        let valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number'
    }
}
]).then(function(newItem){
    console.log(newItem);
    connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",[newItem.product_name,newItem.department_name, newItem.price, newItem.stock_quantity],
 
    function(err, result) {
        if (err) throw err;
        console.log("Great, "+ newItem.product_name+ " have been added to the inventory.");
        search();
   });
});
}

