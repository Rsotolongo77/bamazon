var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: "root",
    password: "rootroot",
    database: "bamazonDB"
});

//create connection with server and load product data
connection.connect(function (err) {

    if (err) {
        console.log("error connect".err.stack)
    }
})
loadProducts()

//function to load products from db
function loadProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err

        //display items in a table
        console.table(res);

        //then prompt the customer to choice of item
        promptCustomerForItem(res)
    })
}

//prompt the customer for a product id
function promptCustomerForItem()



//prompt customer for quantity
function promptCustomerForQuantity()



//purchase function to buy desired item
function makePurchase()



//check inventory to see if userchoice exist in db
function checkInventory()



//function adding exit if user wants to quit
function checkUserQuit()


