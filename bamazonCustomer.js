var mysql = require("mysql");
var inquirer = require("inquirer");
var totalCost = 0;

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
        promptCustomerOrder(res)
    })
}

//prompt the customer for a product id
function promptCustomerOrder() {
    return inquirer.prompt([{
        name: "itemId",
        message: "Please enter the id of the item you would like to purchase.",
        type: "input",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("Please enter valid itme id");
                return false;
            }
        }
    }, {
        name: "quantity",
        message: "How many would you like to buy?",
        type: "input",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("Please enter valid quantity amount.");
                return false;
            }
        }
    }]).then(function (answer) {
        connection.query("SELECT  * FROM products WHERE ?",
            { item_id: answer.itemId }, function (err, res) {

                if (err) throw err;

                if (answer.quantity > res[0].stock_quantity) {
                    inquirer
                        .prompt([
                            {
                                name: "orderAgain",
                                type: "input",
                                message: "Sorry, not enough quantity in stock to fulfill your order. Would you like to place another order?"
                            }
